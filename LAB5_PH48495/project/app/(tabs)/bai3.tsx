import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const bai3 = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={styles.imgContainer}
        source={{
          uri: 'https://explore.danangairportterminal.vn/wp-content/uploads/2023/07/Untitled-12.jpg',
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton}>
            <Image
              style={styles.backButtonImg}
              source={require('../../assets/images/arrow_back.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton}>
            <Image
              style={styles.backButtonImg}
              source={require('../../assets/images/more.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>PHỐ CỔ HỘI AN</Text>

        <View style={styles.starContainer}>
          <Image
            style={styles.star}
            source={require('../../assets/images/star.png')}
          />
          <Text style={{ color: 'white' }}>5.0</Text>
        </View>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <TouchableOpacity style={styles.heartButton}>
          <Image
            style={styles.heartButtonImg}
            source={require('../../assets/images/heart.png')}
          />
        </TouchableOpacity>
        <Text style={styles.locationDetail}>Quảng nam</Text>
        <Text style={styles.titleDetail}>Thông tin chuyến đi</Text>
        <Text style={styles.contentDetail} numberOfLines={9}>
          Thành phố Hội An nằm bên bờ bắc hạ lưu sông Thu Bồn. Hội An là một đô
          thị cổ của Việt Nam, cách trung tâm thủ đô Hà Nội khoảng 795 km về
          phía Nam, cách trung tâm Thành phố Hồ Chí Minh khoảng 940 km, cách
          thành phố Huế khoảng 122 km, cách trung tâm thành phố Đà Nẵng khoảng
          30 km về phía đông nam, có vị trí địa lý, cách trung tâm thủ đô Hà Nội
          khoảng 795 km về phía Nam, cách trung tâm Thành phố Hồ Chí Minh khoảng
          940 km, cách thành phố Huế khoảng 122 km, cách trung tâm thành phố Đà
          Nẵng khoảng 30 km về phía đông nam, có vị trí địa lý{' '}
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.price}>$100/Ngày</Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default bai3;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imgContainer: { flex: 7, padding: 20 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonImg: {
    width: 40,
    height: 40,
  },
  title: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  starContainer: {
    position: 'absolute',
    bottom: 100,
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  heartButton: {
    width: 60,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    top: -30,
    right: 40,
    shadowColor: 'black',
    elevation: 19,
  },
  heartButtonImg: {
    width: 40,
    height: 40,
  },
  detailsContainer: {
    flex: 3,
    padding: 20,
    backgroundColor: 'white',
    top: -50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  locationDetail: {
    color: 'rgb(7, 87, 141)',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  titleDetail: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  contentDetail: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'justify',
  },
  footerContainer: {
    height: 60,
    backgroundColor: 'rgba(8, 56, 161, 1)',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 20,
    paddingEnd: 20,
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  orderButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 140,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'rgba(8, 56, 161, 1)',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});
