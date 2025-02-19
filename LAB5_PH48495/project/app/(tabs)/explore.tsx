import {
  StyleSheet,
  Image,
  Platform,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        style="dark"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/images/background.png')}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Discover {'\n'}world with us</Text>
          <Text style={styles.textContent}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  textContent: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '40%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
