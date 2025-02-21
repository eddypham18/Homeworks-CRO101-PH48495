import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 42 }}>Notifications</Text>
      <TouchableOpacity
        onPress={() => router.push('/bai2')}
        style={{
          marginBottom: 20,
          backgroundColor: 'lightblue',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'blue', fontSize: 16 }}>Sang bài 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
