import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../constants/Colors';

const Categories = ({ onChange }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const allData = [
    {
      id: 0,
      name: 'All',
    },
    {
      id: 1,
      name: 'Cappuccino',
    },
    {
      id: 2,
      name: 'Espresso',
    },
    { id: 3, name: 'Latte' },
    {
      id: 4,
      name: 'Flat White',
    },
  ];

  const handlePress = (id) => {
    setActiveCategoryId(id);
    onChange(id);
  };

  return (
    <FlatList
      horizontal={true}
      data={allData}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ marginVertical: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          style={{ marginRight: 10 * 2, alignItems: 'center' }}
        >
          <Text
            style={[
              { color: Colors.placeHolderTextColor, fontSize: 10 * 2 },
              activeCategoryId === item.id && {
                color: Colors.placeHolderTextColor,
              },
            ]}
          >
            {item.name}
          </Text>
          {activeCategoryId === item.id && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.placeHolderTextColor,
                borderRadius: 10 / 2,
                marginTop: 10 / 4,
              }}
            />
          )}
        </TouchableOpacity>
      )}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({});
