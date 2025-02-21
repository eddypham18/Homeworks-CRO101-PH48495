import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ navigation, route }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Settings</Text>
          <View style={styles.EmptyView} />
        </View>
        <View style={{ padding: 10 }}>
          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Icon name="history" color={'#D17842'} size={20} />
            </View>
            <Text style={styles.styleText}>History</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Tab', { screen: 'History' })}
            >
              <Icon name="chevron-right" color={'#AEAEAE'} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Icon name="user" color={'#D17842'} size={20} />
            </View>
            <Text style={styles.styleText}>Personal Details</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PersonalDetail')}
            >
              <Icon name="chevron-right" color={'#AEAEAE'} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Image source={require('../assets/app_images/location.png')} />
            </View>
            <Text style={styles.styleText}>Address</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('This function under development!')}
            >
              <Icon name="chevron-right" color={'#AEAEAE'} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Icon name="credit-card" color={'#D17842'} size={20} />
            </View>
            <Text style={styles.styleText}>Payment Method</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
              <Icon name="chevron-right" color={'#AEAEAE'} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Icon name="exclamation" color={'#D17842'} size={20} />
            </View>
            <Text style={styles.styleText}>About</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('This function under development!')}
            >
              <Icon name="chevron-right" color={'#AEAEAE'} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Icon name="question" color={'#D17842'} size={20} />
            </View>
            <Text style={styles.styleText}>Help</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('This function under development!')}
            >
              <Icon name="chevron-right" color={'#AEAEAE'} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerRow}>
            <View style={styles.containerIcon}>
              <Image
                source={require('../assets/app_images/ic_twotone-log-out.png')}
              />
            </View>
            <Text style={styles.styleText}>Log out</Text>
            <Icon
              name="chevron-right"
              color={'#AEAEAE'}
              size={25}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>
                  Are you sure want to logout!
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.noButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.noText}>No</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.yesButton]}
                    onPress={async () => {
                      await AsyncStorage.removeItem('userId');
                      navigation.navigate('Login');
                    }}
                  >
                    <Text style={styles.yesText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  containerRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  containerIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(209, 120, 66, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  styleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    marginStart: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: 'transparent',
  },
  yesButton: {
    backgroundColor: '#D47F4E',
    marginLeft: 10,
  },
  noText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yesText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
