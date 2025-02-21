import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import { api } from '../configs/api';
import { assetsMapping } from '../configs/assetsMapping';

const getLocalImage = (key: string) => {
  return assetsMapping[key] || null;
};

// Hàm lấy danh mục từ dữ liệu (dựa vào trường name của Coffee)
const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

// Hàm lọc danh sách coffee theo danh mục
const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    return data.filter((item: any) => item.name === category);
  }
};

const HomeScreen = ({ navigation }: any) => {
  // State lấy dữ liệu từ API
  const [coffeeList, setCoffeeList] = useState<any[]>([]);
  const [beanList, setBeanList] = useState<any[]>([]);

  // Các state để quản lý danh mục, tìm kiếm, lọc
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: '',
  });
  const [sortedCoffee, setSortedCoffee] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  const ListRef = useRef<FlatList>(null);
  const tabBarHeight = useBottomTabBarHeight();

  // Kiểm tra nếu người dùng chưa đăng nhập -> chuyển hướng về Login
  useEffect(() => {
    const checkLogin = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        navigation.navigate('Login');
      }
    };
    checkLogin();
  }, [navigation]);

  // Fetch Coffee từ API
  useEffect(() => {
    api
      .get('/coffee', {})
      .then((res) => {
        setCoffeeList(res.data);
        const cats = getCategoriesFromData(res.data);
        setCategories(cats);
        setCategoryIndex({ index: 0, category: cats[0] });
        setSortedCoffee(getCoffeeList(cats[0], res.data));
      })
      .catch((err) => {
        console.error(err);
        ToastAndroid.showWithGravity(
          'Failed to load coffee data',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  }, []);

  // Fetch Beans từ API
  useEffect(() => {
    api
      .get('/beans', {})
      .then((res) => {
        setBeanList(res.data);
      })
      .catch((err) => {
        console.error(err);
        ToastAndroid.showWithGravity(
          'Failed to load beans data',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  }, []);

  const searchCoffee = (search: string) => {
    if (search !== '') {
      ListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee(
        coffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const resetSearchCoffee = () => {
    ListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...coffeeList]);
    setSearchText('');
  };

  // Hàm xử lý logic thêm sản phẩm vào giỏ hàng sử dụng API và db.json
  const addProductToCart = async (product: any) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        ToastAndroid.showWithGravity(
          'Please log in first',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return;
      }
      // Gọi API lấy giỏ hàng của người dùng
      api
        .get(`/cart?userId=${userId}`, {})
        .then((res: any) => {
          let cart = res.data[0];
          if (!cart) {
            // Nếu chưa có giỏ hàng, tạo giỏ hàng mới
            const newCart = {
              userId: userId,
              items: [
                {
                  productId: product.id,
                  quantity: 1,
                  name: product.name,
                  price: product.prices[2].price,
                  currency: product.prices[2].currency,
                },
              ],
            };
            api
              .post('/cart', newCart, {})
              .then(() => {
                ToastAndroid.showWithGravity(
                  `${product.name} added to cart`,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
              })
              .catch((err: any) => {
                console.error(err);
                ToastAndroid.showWithGravity(
                  'Failed to add product to cart',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
              });
          } else {
            // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm có trong giỏ chưa
            const index = cart.items.findIndex(
              (item: any) => item.productId === product.id
            );
            let updatedItems;
            if (index >= 0) {
              // Nếu sản phẩm đã có, tăng quantity
              updatedItems = cart.items.map((item: any, i: number) =>
                i === index ? { ...item, quantity: item.quantity + 1 } : item
              );
            } else {
              // Nếu chưa có, thêm sản phẩm mới vào giỏ
              updatedItems = [
                ...cart.items,
                {
                  productId: product.id,
                  quantity: 1,
                  name: product.name,
                  price: product.prices[2].price,
                  currency: product.prices[2].currency,
                },
              ];
            }
            api
              .patch(`/cart/${cart.id}`, { items: updatedItems }, {})
              .then(() => {
                ToastAndroid.showWithGravity(
                  `${product.name} added to cart`,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
              })
              .catch((err: any) => {
                console.error(err);
                ToastAndroid.showWithGravity(
                  'Failed to update cart',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
              });
          }
        })
        .catch((err: any) => {
          console.error(err);
          ToastAndroid.showWithGravity(
            'Failed to fetch cart data',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm được gọi khi nhấn nút "Add to Cart" trong CoffeeCard
  const CoffeCardAddToCart = (product: any) => {
    addProductToCart(product);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle={'light-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar navigation={navigation} />

        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>

        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={resetSearchCoffee}>
              <CustomIcon
                style={styles.InputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}
            >
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({
                    index: index,
                    category: categories[index],
                  });
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], coffeeList),
                  ]);
                }}
              >
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index === index && {
                      color: COLORS.primaryOrangeHex,
                    },
                  ]}
                >
                  {data}
                </Text>
                {categoryIndex.index === index && (
                  <View style={styles.ActiveCategory} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee FlatList */}
        <FlatList
          ref={ListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }
            >
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={getLocalImage(item.imagelink_square)}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                prices={item.prices}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          )}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Beans FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanList}
          contentContainerStyle={[
            styles.FlatListContainer,
            { marginBottom: tabBarHeight },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }
            >
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={getLocalImage(item.imagelink_square)}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                prices={item.prices}
                buttonPressHandler={CoffeCardAddToCart}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
