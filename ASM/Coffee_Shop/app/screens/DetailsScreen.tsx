import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import { api } from '../configs/api';
import { assetsMapping } from '../configs/assetsMapping';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocalImage = (key: string) => {
  return assetsMapping[key] || null;
};

const DetailsScreen = ({ navigation, route }: any) => {
  const { id, type } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [fullDesc, setFullDesc] = useState(false);

  // Fetch chi tiết sản phẩm
  useEffect(() => {
    const endpoint = type === 'Coffee' ? `/coffee/${id}` : `/beans/${id}`;
    api
      .get(endpoint, {})
      .then((res: any) => {
        setProduct(res.data);
        setPrice(res.data.prices[0]);

        (async () => {
          const userId = await AsyncStorage.getItem('userId');
          api
            .get(`/favorites?userId=${userId}&productId=${id}`, {})
            .then((resFav: any) => {
              if (resFav.data && resFav.data.length > 0) {
                setProduct((prev: any) => ({ ...prev, favourite: true }));
              } else {
                setProduct((prev: any) => ({ ...prev, favourite: false }));
              }
            })
            .catch((err) => console.error(err));
        })();
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [id, type]);

  const BackHandler = () => {
    navigation.pop();
  };

  const ToggleFavourite = async (
    favourite: boolean,
    type: string,
    id: string
  ) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (favourite) {
        api
          .get(`/favorites?userId=${userId}&productId=${id}`, {})
          .then((resFav: any) => {
            if (resFav.data && resFav.data.length > 0) {
              const favId = resFav.data[0].id;
              api
                .delete(`/favorites/${favId}`, {})
                .then(() => {
                  setProduct({ ...product, favourite: false });
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      } else {
        // Nếu chưa yêu thích, thêm mục vào favorites
        const newFav = {
          userId,
          productId: id,
          productType: type,
        };
        api
          .post('/favorites', newFav, {})
          .then(() => {
            setProduct({ ...product, favourite: true });
          })
          .catch((err) => console.error(err));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Giỏ hang
  const addProductToCart = async (product: any, selectedSize: string) => {
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

      const res = await api.get(`/cart?userId=${userId}`, {});
      let cart = res.data[0];

      if (!cart) {
        const newCart = {
          userId: userId,
          items: [
            {
              productId: product.id,
              name: product.name,
              roasted: product.roasted,
              imagelink_square: getLocalImage(product.imagelink_square),
              special_ingredient: product.special_ingredient,
              prices: product.prices.map((price: any) => ({
                size: price.size,
                price: price.price,
                currency: price.currency,
                quantity: price.size === selectedSize ? 1 : 0,
              })),
              type: product.type,
              index: product.index,
            },
          ],
        };

        await api.post('/cart', newCart, {});
        ToastAndroid.showWithGravity(
          `${product.name} added to cart`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else {
        const productIndex = cart.items.findIndex(
          (item: any) => item.productId === product.id
        );

        if (productIndex >= 0) {
          cart.items[productIndex].prices = cart.items[productIndex].prices.map(
            (price: any) => ({
              ...price,
              quantity:
                price.size === selectedSize
                  ? (price.quantity || 0) + 1
                  : price.quantity,
            })
          );
        } else {
          cart.items.push({
            productId: product.id,
            name: product.name,
            roasted: product.roasted,
            imagelink_square: getLocalImage(product.imagelink_square),
            special_ingredient: product.special_ingredient,
            prices: product.prices.map((price: any) => ({
              size: price.size,
              price: price.price,
              currency: price.currency,
              quantity: price.size === selectedSize ? 1 : 0,
            })),
            type: product.type,
            index: product.index,
          });
        }

        // Cập nhật giỏ hàng
        await api.patch(`/cart/${cart.id}`, { items: cart.items }, {});
        ToastAndroid.showWithGravity(
          `${product.name} added to cart`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity(
        'Failed to update cart',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: COLORS.primaryWhiteHex }}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle="light-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={getLocalImage(product.imagelink_portrait)}
          type={product.type}
          id={product.id}
          favourite={product.favourite}
          name={product.name}
          special_ingredient={product.special_ingredient}
          ingredients={product.ingredients}
          average_rating={product.average_rating}
          ratings_count={product.ratings_count}
          roasted={product.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc((prev) => !prev)}
            >
              <Text style={styles.DescriptionText}>{product.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc((prev) => !prev)}
            >
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {product.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {product.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => setPrice(data)}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        product.type === 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => addProductToCart(product, price.size)}
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
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsScreen;
