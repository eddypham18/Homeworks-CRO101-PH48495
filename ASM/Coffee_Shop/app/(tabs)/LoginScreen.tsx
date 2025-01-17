import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [passwdIsFocus, setPasswdIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSignIn = () => {
    if (passwd !== '123') {
      setPasswordError(true);
      setErrorMessage('Password is not true. Try Again!');
    } else {
      setPasswordError(false);
      setErrorMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-coffee-shop.png')}
        style={{ height: 142, width: 142, marginTop: 40 }}
      />
      <Text style={styles.textWelcome}>Welcome to Lungo !!</Text>
      <Text style={styles.textContinue}>Login to Continue</Text>

      {/* Input Email */}
      <TextInput
        style={[
          styles.textInputEmail,
          email !== ''
            ? { fontFamily: 'Poppins-Bold' }
            : { fontFamily: 'Poppins' },
        ]}
        placeholder="Email"
        placeholderTextColor={Colors.placeHolderTextColor}
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
              ? { fontFamily: 'Poppins-Bold' }
              : { fontFamily: 'Poppins' },
            passwordError
              ? { borderColor: Colors.errorMsg }
              : { borderColor: Colors.placeHolderTextColor },
          ]}
          placeholder="Password"
          placeholderTextColor={Colors.placeHolderTextColor}
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
            color={Colors.placeHolderTextColor}
          />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông báo lỗi*/}
      <View style={[{ width: '100%' }, { marginStart: 15 }]}>
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
          navigation.navigate('Register');
        }}
      >
        <Image
          source={require('../../assets/images/ic_google.png')}
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
        <Text style={styles.textLink}>Register</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Text style={styles.textFootnote}>Forget Password? Click</Text>
        <Text style={styles.textLink}>Reset</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    padding: 14,
    marginTop: 25,
  },
  textWelcome: {
    fontSize: 16,
    color: Colors.placeHolderTextColor,
    fontFamily: 'Poppins-Bold',
  },
  textContinue: {
    fontSize: 12,
    color: Colors.placeHolderTextColor,
    fontFamily: 'Poppins-Bold',
    marginTop: 15,
    marginBottom: 30,
  },
  textInputEmail: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.placeHolderTextColor,
    paddingStart: 10,
    color: Colors.placeHolderTextColor,
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
    borderColor: Colors.placeHolderTextColor,
    paddingStart: 10,
    color: Colors.placeHolderTextColor,
    fontSize: 14,
    marginTop: 5,
  },
  iconEye: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: Colors.errorMsg,
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  styleButton: {
    width: '100%',
    height: 57,
    borderRadius: 20,
    backgroundColor: Colors.buttonColor,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  styleGG: {
    flexDirection: 'row',
    width: '100%',
    height: 57,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: Colors.white,
  },
  textGG: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: Colors.black,
    textAlign: 'center',
  },
  textFootnote: {
    color: Colors.placeHolderTextColor,
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  textLink: {
    color: Colors.buttonColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    marginStart: 5,
  },
});

export default Login;
