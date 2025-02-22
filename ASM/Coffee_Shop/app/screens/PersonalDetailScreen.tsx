import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  FONTSIZE,
  SPACING,
  FONTFAMILY,
  BORDERRADIUS,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../configs/api';

export default function PersonalDetailScreen({ navigation }: any) {
  // States cho các trường nhập liệu
  const [name, setName] = useState('');
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [nameError, setNameError] = useState(false);

  //email
  const [email, setEmail] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);

  //pasword
  const [passwd, setPasswd] = useState('');
  const [passwdIsFocused, setPasswdIsFocused] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  //new password
  const [newPasswd, setNewPasswd] = useState('');
  const [newPasswdIsFocused, setNewPasswdIsFocused] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  //re-type
  const [reTypePasswd, setReTypePasswd] = useState('');
  const [rePasswdIsFocused, setRePasswdIsFocused] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  //Lấy dữ liệu dựa vào userId
  const getUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await api.get(`/users/${userId}`, {});
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const fillNameAndEmail = async () => {
    const data = await getUser();
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  };

  useEffect(() => {
    fillNameAndEmail();
  }, []);

  const handleSave = () => {
    // Reset lỗi
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setRePasswordError(false);
    setErrorMessage('');

    // Kiểm tra nếu trường nào rỗng
    if (!name.trim() || !email.trim() || !passwd || !reTypePasswd) {
      setErrorMessage('All fields are required.');
      if (!name.trim()) setNameError(true);
      if (!email.trim()) setEmailError(true);
      if (!passwd) setPasswordError(true);
      if (!reTypePasswd) setRePasswordError(true);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setEmailError(true);
      return;
    }

    // Validate độ dài mật khẩu (ví dụ: tối thiểu 6 ký tự)
    if (newPasswd.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      setNewPasswordError(true);
      return;
    }

    // Kiểm tra mật khẩu và re-type password khớp nhau
    if (newPasswd !== reTypePasswd) {
      setErrorMessage('Passwords do not match.');
      setNewPasswordError(true);
      setRePasswordError(true);
      return;
    }

    //Kiểm tra mật khẩu có đúng với tài khoản không
    const checkPassword = async () => {
      const data = await getUser();
      if (data) {
        if (data.password !== passwd) {
          setErrorMessage('Password is incorrect.');
          setPasswordError(true);
          return;
        }
      }
    };
    checkPassword();

    // Nếu mọi thứ hợp lệ, xóa thông báo lỗi
    setErrorMessage('');

    // Gửi dữ liệu lên server
    const saveData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      try {
        const res = await api.put(
          `/users/${userId}`,
          {
            name,
            email,
            password: newPasswd,
          },
          {}
        );
        if (res) {
          ToastAndroid.show('Saved successfully', ToastAndroid.SHORT);
          setPasswd('');
          setNewPasswd('');
          setReTypePasswd('');
          setNameError(false);
          setNewPasswordError(false);
          setPasswordError(false);
          setRePasswordError(false);

          fillNameAndEmail();
        }
      } catch (e) {
        console.log(e);
      }
    };
    saveData();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle="light-content"
      />
      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <GradientBGIcon
            name="left"
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Settings</Text>
        <View style={styles.EmptyView} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.avatar}
        />

        {/* Input Name */}
        <TextInput
          style={[
            styles.textInput,
            name !== ''
              ? { fontFamily: FONTFAMILY.poppins_bold }
              : { fontFamily: FONTFAMILY.poppins_regular },
            nameError
              ? { borderColor: COLORS.primaryRedHex }
              : { borderColor: COLORS.primaryGreyHex },
          ]}
          placeholder="Name"
          placeholderTextColor={COLORS.secondaryLightGreyHex}
          value={name}
          onChangeText={setName}
          onFocus={() => setNameIsFocused(true)}
          onBlur={() => setNameIsFocused(false)}
        />

        {/* Input Email */}
        <TextInput
          style={[
            styles.textInput,
            email !== ''
              ? { fontFamily: FONTFAMILY.poppins_bold }
              : { fontFamily: FONTFAMILY.poppins_regular },
            emailError
              ? { borderColor: COLORS.primaryRedHex }
              : { borderColor: COLORS.primaryGreyHex },
          ]}
          placeholder="Email"
          placeholderTextColor={COLORS.secondaryLightGreyHex}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailIsFocused(true)}
          onBlur={() => setEmailIsFocused(false)}
          keyboardType="email-address"
          editable={false}
        />

        {/* Input Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.textInput,
              passwd !== ''
                ? { fontFamily: FONTFAMILY.poppins_bold }
                : { fontFamily: FONTFAMILY.poppins_regular },
              passwordError
                ? { borderColor: COLORS.primaryRedHex }
                : { borderColor: COLORS.primaryGreyHex },
            ]}
            placeholder="Password"
            placeholderTextColor={COLORS.secondaryLightGreyHex}
            value={passwd}
            onChangeText={setPasswd}
            onFocus={() => setPasswdIsFocused(true)}
            onBlur={() => setPasswdIsFocused(false)}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.iconEye}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={COLORS.secondaryLightGreyHex}
            />
          </TouchableOpacity>
        </View>

        {/* Input New - Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.textInput,
              newPasswd !== ''
                ? { fontFamily: FONTFAMILY.poppins_bold }
                : { fontFamily: FONTFAMILY.poppins_regular },
              newPasswordError
                ? { borderColor: COLORS.primaryRedHex }
                : { borderColor: COLORS.primaryGreyHex },
            ]}
            placeholder="New password"
            placeholderTextColor={COLORS.secondaryLightGreyHex}
            value={newPasswd}
            onChangeText={setNewPasswd}
            onFocus={() => setNewPasswdIsFocused(true)}
            onBlur={() => setNewPasswdIsFocused(false)}
            secureTextEntry={!newPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setNewPasswordVisible(!newPasswordVisible)}
            style={styles.iconEye}
          >
            <Ionicons
              name={newPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={COLORS.secondaryLightGreyHex}
            />
          </TouchableOpacity>
        </View>

        {/* Input Re-type Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.textInput,
              reTypePasswd !== ''
                ? { fontFamily: FONTFAMILY.poppins_bold }
                : { fontFamily: FONTFAMILY.poppins_regular },
              rePasswordError
                ? { borderColor: COLORS.primaryRedHex }
                : { borderColor: COLORS.primaryGreyHex },
            ]}
            placeholder="Re-type password"
            placeholderTextColor={COLORS.secondaryLightGreyHex}
            value={reTypePasswd}
            onChangeText={setReTypePasswd}
            onFocus={() => setRePasswdIsFocused(true)}
            onBlur={() => setRePasswdIsFocused(false)}
            secureTextEntry={!rePasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setRePasswordVisible(!rePasswordVisible)}
            style={styles.iconEye}
          >
            <Ionicons
              name={rePasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={COLORS.secondaryLightGreyHex}
            />
          </TouchableOpacity>
        </View>

        {/* Hiển thị thông báo lỗi */}
        <View style={{ width: '100%', marginLeft: 15 }}>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>

        {/* Button Save */}
        <TouchableOpacity
          style={[styles.styleButton, { marginTop: 40 }]}
          onPress={handleSave}
        >
          <Text style={styles.textButton}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    alignItems: 'center',
    padding: SPACING.space_20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  textInput: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    paddingHorizontal: 10,
    color: COLORS.secondaryLightGreyHex,
    fontSize: 14,
    marginBottom: 10,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconEye: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: COLORS.primaryRedHex,
    marginTop: 10,
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  styleButton: {
    width: '100%',
    height: 57,
    borderRadius: 20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  textButton: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
  },
});
