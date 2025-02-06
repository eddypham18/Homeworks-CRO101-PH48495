import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  RefreshControl,
  StatusBarStyle,
  Text,
} from 'react-native';

export default function TabTwoScreen() {
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setBarStyle((prevStyle) =>
      prevStyle === 'light-content' ? 'dark-content' : 'light-content'
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar
        barStyle={barStyle}
        translucent
        backgroundColor="transparent"
      />
      <Text style={styles.text}>Kéo xuống để đổi màu StatusBar</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ?? 0,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
