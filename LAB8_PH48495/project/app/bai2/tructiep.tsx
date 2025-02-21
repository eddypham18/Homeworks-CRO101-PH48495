import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const tructiep = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 42 }}>Trực tiếp</Text>
      <TouchableOpacity
        onPress={() => router.push('/bai3')}
        style={{
          marginBottom: 20,
          backgroundColor: 'lightblue',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'blue', fontSize: 16 }}>Sang bài 3</Text>
      </TouchableOpacity>
    </View>
  );
};

export default tructiep;

const styles = StyleSheet.create({});
