import { Colors } from '@/constants/Colors';
import { Text, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.viewImg}>
        <ImageBackground
          source={require('../../assets/images/robustaBean.jpg')}
          style={styles.imgStyle}
        />
        <View style={{ position: 'absolute', top: 10, width: '100%' }}></View>
        <View style={styles.imgText}>
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Poppins-Bold',
                }}
              >
                Robusta Beans
              </Text>
              <Text
                style={{
                  color: '#AEAEAE',
                  fontSize: 12,
                  fontWeight: '400',
                  fontFamily: 'poppins',
                }}
              >
                From Africa
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('../../assets/images/ic_star.png')}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text
                    style={{
                      marginStart: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      fontFamily: 'Poppins-Bold',
                    }}
                  >
                    4.5
                  </Text>
                  <Text
                    style={{
                      marginStart: 15,
                      fontSize: 10,
                      color: '#AEAEAE',
                      fontFamily: 'poppins',
                    }}
                  >
                    (6,879)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: '#141921',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginRight: 25,
                }}
              >
                <Image
                  source={require('../../assets/images/ic_bean.png')}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={[
                    { color: '#AEAEAE' },
                    { fontFamily: 'Poppins' },
                    { fontSize: 10 },
                  ]}
                >
                  Bean
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: '#141921',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <Image
                  source={require('../../assets/images/ic_location.png')}
                  style={{ width: 28, height: 28 }}
                />
                <Text
                  style={[
                    { color: '#AEAEAE' },
                    { fontFamily: 'Poppins' },
                    { fontSize: 10 },
                  ]}
                >
                  Africa
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#141921',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 44,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: '#AEAEAE',
                  fontSize: 10,
                  fontFamily: 'Poppins',
                }}
              >
                Medium Roasted
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.viewContent}>
        <Text
          style={{
            color: '#AEAEAE',
            fontSize: 14,
            marginTop: 5,
            fontFamily: 'Poppins-Bold',
          }}
        >
          Description
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            marginVertical: 5,
            fontSize: 12,
            fontFamily: 'Poppins',
          }}
        >
          Arabica beans are by far the most popular type of coffee beans, making
          up about 60% of the world’s coffee. These tasty beans originated many
          centuries ago in the highlands of Ethiopia, and may even be the first
          coffee beans ever consumed!{' '}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            marginBottom: 5,
            fontSize: 14,
            fontFamily: 'Poppins',
          }}
        >
          Size
        </Text>
        <View style={styles.sizeStyle}>
          <TouchableOpacity style={styles.buttonSize}>
            <Text
              style={[
                { color: '#AEAEAE', fontSize: 12, fontFamily: 'Poppins' },
              ]}
            >
              250ml
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSize}>
            <Text
              style={[
                { color: '#AEAEAE', fontSize: 12, fontFamily: 'Poppins' },
              ]}
            >
              500ml
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSize}>
            <Text
              style={[
                { color: '#AEAEAE', fontSize: 12, fontFamily: 'Poppins' },
              ]}
            >
              1000ml
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={[
                { color: '#AEAEAE', fontSize: 12, fontFamily: 'Poppins' },
              ]}
            >
              Price
            </Text>
            <Text
              style={{
                color: Colors.buttonColor,
                fontSize: 20,
                fontWeight: '700',
              }}
            >
              {' '}
              ${' '}
              <Text
                style={[
                  { color: Colors.white, fontSize: 20, fontFamily: 'Poppins' },
                ]}
              >
                {' '}
                10.0
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text
              style={[
                {
                  color: Colors.white,
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                },
              ]}
            >
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  viewContent: {
    padding: 20,
  },
  imgStyle: {
    width: '100%',
    position: 'relative',
    aspectRatio: 20 / 24,
  },
  imgText: {
    width: '100%',
    height: '28%',

    backgroundColor: 'rgba(20, 25, 33, 0.5)',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    paddingHorizontal: 15,
  },
  sizeStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonSize: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#141921',
  },
  buttonAdd: {
    backgroundColor: Colors.buttonColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
  },
});
