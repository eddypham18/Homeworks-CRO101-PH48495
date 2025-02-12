import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View>
        <Text style={styles.title}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
      <View>
        <Text style={styles.title2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'justify',
    fontFamily: 'Atkinson',
  },
  title2: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'justify',
    fontFamily: 'AtkinsonBold',
  },
});
