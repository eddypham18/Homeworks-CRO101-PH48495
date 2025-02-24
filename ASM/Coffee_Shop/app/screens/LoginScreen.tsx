import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTFAMILY } from '../theme/theme';
import api from '../configs/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

function Login({ navigation }: any) {
  // Danh sách user
  interface User {
    id: string;
    name?: string;
    email: string;
    password: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [passwdIsFocus, setPasswdIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSignIn = () => {
    // Reset lại các trạng thái lỗi
    setErrorMessage('');
    setEmailError(false);
    setPasswordError(false);

    // Kiểm tra nếu Email để trống
    if (email.trim() === '') {
      setErrorMessage('Email is required.');
      setEmailError(true);
      return;
    }

    // Kiểm tra nếu Password để trống
    if (passwd.trim() === '') {
      setErrorMessage('Password is required.');
      setPasswordError(true);
      return;
    }

    // Validate định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setEmailError(true);
      return;
    }

    // Kiểm tra thông tin đăng nhập
    const matchedUser = users.find(
      (user) => user.email === email && user.password === passwd
    );
    if (matchedUser) {
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        await AsyncStorage.setItem('userId', matchedUser.id);
        navigation.navigate('Tab', { screen: 'Home' });
      }, 2000);
    } else {
      setErrorMessage('Email or password is incorrect.');
      setPasswordError(true);
    }
  };

  // Gọi API lấy danh sách users
  useFocusEffect(
    useCallback(() => {
      api
        .get('/users', {})
        .then((response: any) => {
          setUsers(response.data);
        })
        .catch((error: any) => {
          console.log(error);
          Alert.alert('Error', 'Failed to load users data');
        });
    }, [])
  );

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
      <Text style={styles.textContinue}>Login to Continue</Text>

      {/* Input Email */}
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
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông báo lỗi */}
      <View style={{ width: '100%', marginStart: 15 }}>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.styleButton, { marginTop: 20 }]}
        onPress={handleSignIn}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.styleGG}
        onPress={() => {
          Alert.alert('This feature is under development!');
        }}
      >
        <Image
          source={require('../assets/app_images/google.png')}
          style={{
            height: 15,
            width: 15,
            marginStart: 15,
          }}
        />
        <Text style={styles.textGG}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 40 }}>
        <Text style={styles.textFootnote}>Don’t have account? Click</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textLink}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Text style={styles.textFootnote}>Forget Password? Click</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.textLink}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay ActivityIndicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
        </View>
      )}
    </View>
  );
}

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
    paddingStart: 10,
    color: COLORS.secondaryLightGreyHex,
    fontSize: 14,
    marginTop: 5,
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
  styleGG: {
    flexDirection: 'row',
    width: '100%',
    height: 57,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
  },
  textGG: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});

export default Login;
