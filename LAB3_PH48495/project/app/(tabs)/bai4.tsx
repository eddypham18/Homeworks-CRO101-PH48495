import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Bai4Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bài 4: Hiển thị ảnh</Text>
      <Image
        style={styles.image}
        source={require("../../assets/images/den-vau.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: "cover",
  },
});
