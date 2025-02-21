import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import choban from './tabtop/choban';
import trochoi from './tabtop/trochoi';
import tructiep from './tabtop/tructiep';

// Component cho màn hình TabView (Top Bar)
const TabViewScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'tab1', title: 'Cho bạn' },
    { key: 'tab2', title: 'Trực tiếp' },
    { key: 'tab3', title: 'Trò chơi' },
  ]);

  // Ánh xạ các tab với nội dung
  const renderScene = SceneMap({
    tab1: choban,
    tab2: tructiep,
    tab3: trochoi,
  });

  // Tùy chỉnh TabBar (Top Bar) với icon và text
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      activeColor="white"
      inactiveColor="rgba(255, 255, 255, 0.7)"
      pressColor="transparent"
      tabStyle={[styles.tab, { minWidth: layout.width / 3 }]}
      scrollEnabled={true}
      bounces={false}
      renderLabel={({ route, focused, color }) => {
        let iconName = '';
        if (route.key === 'tab1') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.key === 'tab2') {
          iconName = focused ? 'videocam' : 'videocam-outline';
        } else if (route.key === 'tab3') {
          iconName = focused ? 'game-controller' : 'game-controller-outline';
        }

        return (
          <View style={styles.tabLabelContainer}>
            <Ionicons
              name={iconName}
              size={20}
              color={color}
              style={styles.iconStyle}
            />
            <Text style={[styles.tabLabelText, { color }]}>{route.title}</Text>
          </View>
        );
      }}
    />
  );

  return (
    <View style={styles.tabViewContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
        swipeEnabled={true}
        overScrollMode="never"
      />
    </View>
  );
};

// Component mẫu cho màn hình Settings trong Bottom Bar
const SettingsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Cài đặt</Text>
  </View>
);

// Tạo Bottom Tab Navigator
const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    // Không cần NavigationContainer ở đây nếu nó đã được cung cấp ở root
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: styles.bottomTabBar,
      })}
    >
      <BottomTab.Screen name="Home" component={TabViewScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
};

export default App;

// Styles
const styles = StyleSheet.create({
  tabViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 22,
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'rgba(48, 8, 190, 0.92)',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 48,
  },
  tab: {
    width: 'auto',
    padding: 0,
    minWidth: 'auto',
    flex: 1,
  },
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginRight: 4,
  },
  tabLabelText: {
    fontWeight: '600',
    textTransform: 'none',
    fontSize: 14,
    textAlign: 'center',
  },
  indicator: {
    backgroundColor: 'white',
    height: 3,
    borderRadius: 3,
  },
  bottomTabBar: {
    backgroundColor: '#fff',
    height: 60,
    paddingBottom: 5,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
