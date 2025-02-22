import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../configs/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Danh sách user
interface User {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

const RegisterScreen = ({ navigation }: any) => {
  //List user
  const [users, setUsers] = useState<User[]>([]);

  // State cho Name
  const [name, setName] = useState('');
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [nameError, setNameError] = useState(false);

  // State cho Email
  const [email, setEmail] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // State cho Password
  const [passwd, setPasswd] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwdIsFocus, setPasswdIsFocused] = useState(false);

  // State cho Re-type Password
  const [reTypePasswd, setReTypePasswd] = useState('');
  const [rePasswordVisible, setRePasswordVisible] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [rePasswdIsFocus, setRePasswdIsFocused] = useState(false);

  // State hiển thị thông báo lỗi
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    // Reset lại các trạng thái lỗi
    setErrorMessage('');
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setRePasswordError(false);

    // Kiểm tra nếu có trường nào bị trống
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      passwd.trim() === '' ||
      reTypePasswd.trim() === ''
    ) {
      setErrorMessage('All fields are required.');
      if (name.trim() === '') setNameError(true);
      if (email.trim() === '') setEmailError(true);
      if (passwd.trim() === '') setPasswordError(true);
      if (reTypePasswd.trim() === '') setRePasswordError(true);
      return;
    }

    // Validate định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setEmailError(true);
      return;
    }

    // Kiểm tra độ dài mật khẩu (ít nhất 6 ký tự)
    if (passwd.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      setPasswordError(true);
      return;
    }

    // Kiểm tra mật khẩu và re-type password có khớp nhau không
    if (passwd !== reTypePasswd) {
      setErrorMessage('Passwords do not match.');
      setPasswordError(true);
      setRePasswordError(true);
      return;
    }

    //Kiểm tra trùng dữ liệu
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        setErrorMessage('Email already exists.');
        setEmailError(true);
        return;
      }
    }

    setErrorMessage('');

    //Tạo mới user
    const newUser: User = {
      name: name,
      email: email,
      password: passwd,
    };

    //Gửi request tạo mới user
    api
      .post('/users', newUser, {})
      .then((response) => {
        console.log(response.data);
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api
      .get('/users', {})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle={'light-content'}
      />
      <Image
        source={require('../assets/app_images/logo_coffee.png')}
        style={{ height: 142, width: 142, marginTop: 40 }}
      />
      <Text style={styles.textWelcome}>Welcome to Lungo !!</Text>
      <Text style={styles.textContinue}>Register to Continue</Text>

      {/* Input Name */}
      <TextInput
        style={[
          styles.textInputEmail,
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
          styles.textInputEmail,
          email !== ''
            ? [
                { fontFamily: FONTFAMILY.poppins_bold },
                { textDecorationLine: 'underline' },
              ]
            : [
                { fontFamily: FONTFAMILY.poppins_regular },
                { textDecorationLine: 'none' },
              ],
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
      />

      {/* Input Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.textInputPassword,
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
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={COLORS.secondaryLightGreyHex}
          />
        </TouchableOpacity>
      </View>

      {/* Input Re-type Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.textInputPassword,
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
          <Icon
            name={rePasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={COLORS.secondaryLightGreyHex}
          />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông báo lỗi */}
      <View style={{ width: '100%', marginStart: 15 }}>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      {/* Button Register */}
      <TouchableOpacity
        style={[styles.styleButton, { marginTop: 40 }]}
        onPress={handleRegister}
      >
        <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={styles.textFootnote}>You have an account? Click </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.textLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    padding: 14,
  },
  textWelcome: {
    fontSize: 16,
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  textContinue: {
    fontSize: 12,
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_bold,
    marginTop: 15,
    marginBottom: 30,
  },
  textInputEmail: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    paddingStart: 10,
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
  textInputPassword: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
    paddingStart: 10,
    color: COLORS.secondaryLightGreyHex,
    fontSize: 14,
    marginBottom: 10,
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
  textFootnote: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  textLink: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 12,
    marginStart: 5,
  },
});
