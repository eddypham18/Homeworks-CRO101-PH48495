import { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      Alert.alert("Thông báo", "Đăng nhập thành công!");
    } else {
      Alert.alert("Thông báo", "Tài khoản hoặc mật khẩu không đúng.");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Xin chào bạn!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Vui lòng đăng nhập để tiếp tục!</ThemedText>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Nhập tài khoản"
          style={styles.tipStyle}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          style={styles.tipStyle}
        />
        <Button title="Đăng nhập" onPress={handleLogin} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  tipStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
});
