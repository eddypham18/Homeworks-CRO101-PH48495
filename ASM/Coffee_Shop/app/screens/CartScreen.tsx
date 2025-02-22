import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import { api } from '../configs/api';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = ({ navigation }: any) => {
  const [cart, setCart] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartPrice, setCartPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();

  // Hàm tính tổng giá của giỏ hàng
  const calculateCartPrice = (items: any[]) => {
    const total = items.reduce((sum, item) => {
      const itemTotal = item.prices.reduce((subSum: number, p: any) => {
        return subSum + parseFloat(p.price) * (p.quantity || 0);
      }, 0);
      return sum + itemTotal;
    }, 0);
    setCartPrice(total);
  };

  const fetchCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const res = await api.get(`/cart?userId=${userId}`, {});
      if (res.data && res.data.length > 0) {
        const userCart = res.data[0];
        setCart(userCart);
        setCartItems(userCart.items);
        calculateCartPrice(userCart.items);
      } else {
        setCartItems([]);
        setCartPrice(0);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity(
        'Failed to load cart data',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng useFocusEffect để re-fetch cart mỗi khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  // Hàm tăng số lượng cho item với kích thước cụ thể
  const incrementCartItemQuantityHandler = async (
    productId: string,
    size: string
  ) => {
    try {
      if (!cart) return;
      const updatedItems = cartItems.map((item) => {
        if (item.productId === productId) {
          const updatedPrices = item.prices.map((p: any) => {
            if (p.size === size) {
              return { ...p, quantity: (p.quantity || 0) + 1 };
            }
            return p;
          });
          return { ...item, prices: updatedPrices };
        }
        return item;
      });
      await api.patch(`/cart/${cart.id}`, { items: updatedItems }, {});
      setCartItems(updatedItems);
      calculateCartPrice(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm giảm số lượng cho item với kích thước cụ thể (đảm bảo không giảm dưới 1)
  const decrementCartItemQuantityHandler = async (
    productId: string,
    size: string
  ) => {
    try {
      if (!cart) return;
      const updatedItems = cartItems.map((item) => {
        if (item.productId === productId) {
          const updatedPrices = item.prices.map((p: any) => {
            if (p.size === size && (p.quantity || 0) > 1) {
              return { ...p, quantity: p.quantity - 1 };
            }
            return p;
          });
          return { ...item, prices: updatedPrices };
        }
        return item;
      });
      await api.patch(`/cart/${cart.id}`, { items: updatedItems }, {});
      setCartItems(updatedItems);
      calculateCartPrice(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const buttonPressHandler = () => {
    navigation.push('Payment', { amount: cartPrice });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
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
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" navigation={navigation} />
            {cartItems.length === 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.ListItemContainer}>
                {cartItems.map((data: any) => (
                  <TouchableOpacity
                    key={data.productId}
                    onPress={() => {
                      navigation.push('Details', {
                        id: data.productId,
                        type: data.productType,
                      });
                    }}
                  >
                    <CartItem
                      id={data.productId}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.productType}
                      incrementCartItemQuantityHandler={(id, size) =>
                        incrementCartItemQuantityHandler(id, size)
                      }
                      decrementCartItemQuantityHandler={(id, size) =>
                        decrementCartItemQuantityHandler(id, size)
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {cartItems.length !== 0 && (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={{ price: cartPrice.toFixed(2), currency: '$' }}
            />
          )}
        </View>
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
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartScreen;
