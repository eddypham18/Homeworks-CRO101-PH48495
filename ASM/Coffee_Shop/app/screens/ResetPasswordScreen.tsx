import React, { useState } from 'react';
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

const ResetPassword = ({ navigation }: any) => {
  // email
  const [email, setEmail] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);

  //  mật khẩu cũ
  const [oldPasswd, setOldPasswd] = useState('');
  const [oldPasswdIsFocused, setOldPasswdIsFocused] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);

  // mật khẩu mới
  const [passwd, setPasswd] = useState('');
  const [passwdIsFocused, setPasswdIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // xác nhận mật khẩu
  const [reTypePasswd, setReTypePasswd] = useState('');
  const [rePasswdIsFocused, setRePasswdIsFocused] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);

  // hiển thị thông báo lỗi
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    // Reset các trạng thái lỗi
    setEmailError(false);
    setOldPasswordError(false);
    setPasswordError(false);
    setRePasswordError(false);
    setErrorMessage('');

    // Kiểm tra nếu có trường nào bị trống
    if (
      email.trim() === '' ||
      oldPasswd.trim() === '' ||
      passwd.trim() === '' ||
      reTypePasswd.trim() === ''
    ) {
      setErrorMessage('All fields are required.');
      if (email.trim() === '') setEmailError(true);
      if (oldPasswd.trim() === '') setOldPasswordError(true);
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

    // Kiểm tra độ dài mật khẩu mới (ví dụ: ít nhất 6 ký tự)
    if (passwd.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      setPasswordError(true);
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp nhau không
    if (passwd !== reTypePasswd) {
      setErrorMessage('Passwords do not match.');
      setPasswordError(true);
      setRePasswordError(true);
      return;
    }

    // Nếu tất cả validations đều hợp lệ
    setErrorMessage('');
    setEmailError(false);
    setOldPasswordError(false);
    setPasswordError(false);
    setRePasswordError(false);

    navigation.pop(1);
  };

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
      <Text style={styles.textContinue}>Reset your account to Continue</Text>

      {/* Input email */}
      <TextInput
        style={[
          styles.textInputEmail,
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
      />

      {/* Input mật khẩu cũ */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.textInputPassword,
            oldPasswd !== ''
              ? { fontFamily: FONTFAMILY.poppins_bold }
              : { fontFamily: FONTFAMILY.poppins_regular },
            oldPasswordError
              ? { borderColor: COLORS.primaryRedHex }
              : { borderColor: COLORS.primaryGreyHex },
          ]}
          placeholder="Old Password"
          placeholderTextColor={COLORS.secondaryLightGreyHex}
          value={oldPasswd}
          onChangeText={setOldPasswd}
          onFocus={() => setOldPasswdIsFocused(true)}
          onBlur={() => setOldPasswdIsFocused(false)}
          secureTextEntry={!oldPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
          style={styles.iconEye}
        >
          <Icon
            name={oldPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={COLORS.secondaryLightGreyHex}
          />
        </TouchableOpacity>
      </View>

      {/* Input mật khẩu mới */}
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
          placeholder="New Password"
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

      {/* Input xác nhận mật khẩu */}
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
          placeholder="Re-type Password"
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

export default ResetPassword;

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
