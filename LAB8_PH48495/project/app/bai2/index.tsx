import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import phobien from './phobien';
import yeuthich from './yeuthich';
import tructiep from './tructiep';

const index = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'tab1', title: 'Yêu thích' },
    { key: 'tab2', title: 'Phổ biến' },
    { key: 'tab3', title: 'Trực tiếp' },
  ]);

  const renderScene = SceneMap({
    tab1: yeuthich,
    tab2: phobien,
    tab3: tructiep,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="white"
      inactiveColor="rgba(255, 255, 255, 0.7)"
      pressColor="transparent"
      tabStyle={[styles.tab, { minWidth: layout.width / 3 }]} // Thêm style cho từng tab
      scrollEnabled={true} // Cho phép scroll nếu nhiều tab
      bounces={false} // Tắt bounces effect
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
        swipeEnabled={true} // Cho phép vuốt để chuyển tab
        overScrollMode="never" // Tắt overscroll effect trên Android
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 22,
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'rgba(255, 166, 0, 0.92)',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 48, // Chiều cao cố định cho tabBar
  },
  tab: {
    width: 'auto', // Cho phép tab tự điều chỉnh độ rộng
    padding: 0, // Giảm padding
    minWidth: 'auto', // Cho phép tab tự điều chỉnh độ rộng
    flex: 1, // Tab sẽ chia đều không gian
  },
  tabLabel: {
    fontWeight: '600',
    textTransform: 'none',
    fontSize: 14,
    textAlign: 'center', // Căn giữa text
    marginHorizontal: 8, // Thêm margin cho text
  },
  indicator: {
    backgroundColor: 'white', // Đổi màu indicator cho phù hợp với theme
    height: 3,
    borderRadius: 3, // Bo tròn indicator
  },
});
