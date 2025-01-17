import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Static data for categories
const categories = [
  { id: '0', name: 'All' },
  { id: '1', name: 'Cappuccino' },
  { id: '2', name: 'Espresso' },
  { id: '3', name: 'Latte' },
  { id: '4', name: 'Mocha' },
  { id: '5', name: 'Americano' },
];

// Static data for products
const products = [
  {
    id: '1',
    category: '1',
    name: 'Cappuccino',
    description: 'Delicious Cappuccino with frothy milk and rich espresso.',
    image: require('../../assets/images/robustaBean.jpg'),
    price: 4.2,
    rating: 4.5,
    voting: 84,
    isRating: true,
  },
  {
    id: '2',
    category: '2',
    name: 'Espresso',
    description: 'Strong and bold Espresso to kickstart your day.',
    image: require('../../assets/images/robustaBean.jpg'),
    price: 3.0,
    rating: 5.0,
    voting: 112,
    isRating: true,
  },
  // Add more products as needed
];

const ItemProduct = ({ product }) => {
  return (
    <View style={[styles.itemContainer, { backgroundColor: '#000' }]}>
      <TouchableOpacity>
        <LinearGradient
          colors={['#252A32', 'rgba(38, 43, 51, 0)']}
          style={styles.linearGradient}
        >
          <View style={styles.top}>
            <Image style={styles.image} source={product.image} />
            {product.isRating && (
              <View style={styles.danhGia}>
                <Image source={require('../../assets/images/ic_star.png')} />
                <Text style={styles.diemDanhGia}>{product.rating}</Text>
              </View>
            )}
          </View>
          <View style={styles.bottom}>
            <Text style={styles.name} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.info}>{product.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                <Text style={{ color: '#D17842' }}>$ </Text>
                {product.price}
              </Text>
              <TouchableOpacity style={styles.btnAdd}>
                <Image source={require('../../assets/images/btn_add.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const [selected, setSelected] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={'#0C0F14'} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.btnMenu}>
          <Image
            style={styles.imgHeader}
            source={require('../../assets/images/ic_menu.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => {
            navigation.navigate('Detail');
          }}
        >
          <Image
            style={styles.imgHeader}
            source={require('../../assets/images/ic_user.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.textHeader}>
          <Text style={styles.txtHeader}>
            Find the best {`\n`}coffee for you
          </Text>
        </View>

        <View style={styles.search}>
          <Image
            style={styles.imgSearch}
            source={require('../../assets/images/ic_search.png')}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Find Your Coffee..."
            placeholderTextColor={'#52555A'}
          />
        </View>

        <View style={styles.listLoai}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity style={styles.itemLoai}>
                <Text
                  style={[
                    styles.txtLoai,
                    index === selected && styles.txtLoaiSeleted,
                  ]}
                >
                  {item?.name}
                </Text>

                {index === selected && (
                  <View style={styles.selectedLoai}></View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.listCoffee}>
          <FlatList
            data={products}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ItemProduct product={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <Text style={styles.textCoffeeBean}>Coffee beans</Text>

        <View style={styles.listCoffeeBean}>
          <FlatList
            data={products}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ItemProduct product={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  btnMenu: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listCoffeeBean: {
    marginTop: 19,
  },
  textCoffeeBean: {
    marginTop: 23.32,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  listCoffee: {
    marginTop: 22,
  },
  txtLoaiSeleted: {
    color: '#D17842',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  txtLoai: {
    color: '#52555A',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedLoai: {
    width: 8,
    height: 8,
    backgroundColor: '#D17842',
    borderRadius: 4,
  },
  itemLoai: {
    width: 'auto',
    marginHorizontal: 9,
    marginTop: 28,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listLoai: {},
  textInput: {
    marginStart: 19,
    color: '#52555A',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  imgSearch: {
    marginTop: 13,
    marginStart: 18,
    width: 18,
    height: 18,
  },
  search: {
    width: '100%',
    height: 45,
    backgroundColor: '#141921',
    borderRadius: 15,
    marginTop: 28,
    display: 'flex',
    flexDirection: 'row',
  },
  txtHeader: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  textHeader: {
    marginTop: 31,
  },
  imgHeader: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  header: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Container: {
    backgroundColor: '#0C0F14',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 20,
  },
  itemContainer: {
    width: 149,
    height: 245,
    marginEnd: 22,
    borderRadius: 23,
  },
  linearGradient: {
    width: 149,
    height: 245,
    borderRadius: 23,
    paddingTop: 0,
  },
  top: {
    alignItems: 'center',
    margin: 12,
  },
  image: {
    width: 126,
    height: 126,
    borderRadius: 16,
  },
  danhGia: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
    borderTopEndRadius: 19,
    borderBottomStartRadius: 26,
    paddingEnd: 11,
    paddingStart: 12,
    paddingVertical: 2,
  },
  diemDanhGia: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Poppins',
    alignItems: 'center',
    marginStart: 4,
  },
  bottom: {
    flexDirection: 'column',
    paddingStart: 12,
  },
  name: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
  },
  info: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6.3,
    justifyContent: 'space-between',
    paddingEnd: 12,
  },
  price: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  btnAdd: {},
});
