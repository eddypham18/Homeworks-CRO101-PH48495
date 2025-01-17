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

const RegisterScreen = () => {
  //Navigation
  const navigation = useNavigation();

  // Name
  const [name, setName] = useState('');
  const [nameIsFocused, setNameIsFocused] = useState(false);

  // Password
  const [passwd, setPasswd] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwdIsFocus, setPasswdIsFocused] = useState(false);

  //Re-type Password
  const [reTypePasswd, setReTypePasswd] = useState('');
  const [rePasswordVisible, setRePasswordVisible] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [rePasswdIsFocus, setRePasswdIsFocused] = useState(false);

  //Email
  const [email, setEmail] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);

  //Error Message
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-coffee-shop.png')}
        style={{ height: 142, width: 142, marginTop: 40 }}
      />
      <Text style={styles.textWelcome}>Welcome to Lungo !!</Text>
      <Text style={styles.textContinue}>Register to Continue</Text>

      {/* Input Name */}
      <TextInput
        style={[
          styles.textInputEmail,
          name !== ''
            ? { fontFamily: 'Poppins-Bold' }
            : { fontFamily: 'Poppins' },
        ]}
        placeholder="Name"
        placeholderTextColor={Colors.placeHolderTextColor}
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
                { fontFamily: 'Poppins-Bold' },
                { textDecorationLine: 'underline' },
              ]
            : [{ fontFamily: 'Poppins' }, { textDecorationLine: 'none' }],
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

      {/* Re-type password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.textInputPassword,
            reTypePasswd !== ''
              ? { fontFamily: 'Poppins-Bold' }
              : { fontFamily: 'Poppins' },
            rePasswordError
              ? { borderColor: Colors.errorMsg }
              : { borderColor: Colors.placeHolderTextColor },
          ]}
          placeholder="Re-type password"
          placeholderTextColor={Colors.placeHolderTextColor}
          value={reTypePasswd}
          onChangeText={setReTypePasswd}
          onFocus={() => setRePasswdIsFocused(true)}
          onBlur={() => setRePasswdIsFocused(false)}
          secureTextEntry={!rePasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setRePasswordVisible(!passwordVisible)}
          style={styles.iconEye}
        >
          <Icon
            name={rePasswordVisible ? 'eye-off' : 'eye'}
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

      {/* Button Register */}
      <TouchableOpacity
        style={[styles.styleButton, { marginTop: 40 }]}
        onPress={handleRegister}
      >
        <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={styles.textFootnote}>You have an account? Click </Text>
        <Text style={styles.textLink}>Sign in</Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
