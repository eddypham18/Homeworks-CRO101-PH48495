import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { Colors } from '../constants/Colors';

const SearchView = ({ onSearch }) => {
  return (
    <View
      style={{
        borderRadius: 10,
        opacity: 0.7,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.errorMsg,
      }}
    >
      <BlurView
        blurAmount={30}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{
            width: '100%',
            color: Colors.white,
            fontSize: 10 * 1.7,
            padding: 10,
            paddingLeft: 10 * 3.5,
          }}
          placeholder="Find your coffee..."
          placeholderTextColor={Colors.white}
          onChangeText={(text) => onSearch(text)}
        />
      </BlurView>
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({});
