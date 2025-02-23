import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';
import { api } from '../configs/api';
import { useFocusEffect } from '@react-navigation/native';
import assetsMapping from '../configs/assetsMapping';

const getLocalImage = (key: string) => {
  return assetsMapping[key] || null;
};

const FavoritesScreen = ({ navigation }: any) => {
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();

  // Hàm fetch favorites của user
  const fetchFavorites = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const favRes = await api.get(`/favorites?userId=${userId}`, {});
      const favs = favRes.data;
      const detailedFavs: any[] = [];

      for (const fav of favs) {
        let endpoint = '';
        if (fav.productType === 'Coffee') {
          endpoint = `/coffee/${fav.productId}`;
        } else {
          endpoint = `/beans/${fav.productId}`;
        }
        try {
          const productRes = await api.get(endpoint, {});
          detailedFavs.push({
            ...productRes.data,
            productId: fav.productId,
            productType: fav.productType,
          });
        } catch (error) {
          console.error(
            `Error fetching detail for productId ${fav.productId}`,
            error
          );
        }
      }
      setFavoritesList(detailedFavs);
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity(
        'Failed to load favourites',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchFavorites();
    }, [])
  );

  // ToggleFavourite
  const ToggleFavourite = async (
    favourite: boolean,
    productId: string,
    productType: string
  ) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (favourite) {
        const res = await api.get(
          `/favorites?userId=${userId}&productId=${productId}`,
          {}
        );
        if (res.data && res.data.length > 0) {
          const favId = res.data[0].id;
          await api.delete(`/favorites/${favId}`, {});
          fetchFavorites();
        }
      } else {
        const newFav = {
          userId,
          productId,
          productType,
        };
        await api.post('/favorites', newFav, {});
        fetchFavorites();
      }
    } catch (error) {
      console.error(error);
    }
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
            <HeaderBar title="Favourites" navigation={navigation} />
            {favoritesList.length === 0 ? (
              <EmptyListAnimation title="No Favourites" />
            ) : (
              <View style={styles.ListItemContainer}>
                {favoritesList.map((data: any) => (
                  <TouchableOpacity
                    key={data.productId}
                    onPress={() => {
                      navigation.push('Details', {
                        id: data.productId,
                        type: data.productType,
                      });
                    }}
                  >
                    <FavoritesItemCard
                      id={data.productId}
                      imagelink_portrait={getLocalImage(
                        data.imagelink_portrait
                      )}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.productType}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={true}
                      ToggleFavouriteItem={() =>
                        ToggleFavourite(true, data.productId, data.productType)
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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

export default FavoritesScreen;
