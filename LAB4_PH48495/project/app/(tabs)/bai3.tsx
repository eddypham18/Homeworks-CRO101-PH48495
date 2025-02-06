import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Bai3Screen = () => {
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex1}
    >
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.txtTitle}>Hi Welcome Back!</Text>
          <Text>Hello again you have been missed!</Text>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{
                uri: 'https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-people-using-mobile-phone-and-chatting-boxes-vector-png-image_5814237.png',
              }}
              style={styles.img}
            />
          </View>

          <Text style={styles.txtInput}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            keyboardType="email-address"
          />

          <Text style={styles.txtInput}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your password"
              secureTextEntry={secureText}
            />
            <TouchableOpacity
              onPress={toggleSecureText}
              style={styles.iconButton}
            >
              <Ionicons
                name={secureText ? 'eye-off' : 'eye'}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.txtOrLogin}>Or login with</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.btnLogin}>
              <Ionicons name="logo-google" size={24} color="red" />
              <Text>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin}>
              <Ionicons name="logo-facebook" size={24} color="blue" />
              <Text>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Bai3Screen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
  },
  img: {
    width: 250,
    height: 250,
    marginVertical: 20,
  },
  txtInput: {
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    bottom: 22,
  },
  txtOrLogin: {
    textAlign: 'center',
    marginVertical: 25,
    marginTop: 15,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  btnLogin: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: 'gray',
    width: '45%',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
