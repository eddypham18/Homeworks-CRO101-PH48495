import React, { useState } from "react";
import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ tên"
            style={styles.tipStyle}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Nhập SĐT"
            keyboardType="phone-pad"
            style={styles.tipStyle}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            secureTextEntry={true}
            style={styles.tipStyle}
          />

          <View style={styles.container}>
            {/* Line 1 */}
            <Text style={styles.baseText}>
              Em vào đời bằng{" "}
              <Text style={[styles.boldText, colorText("red")]}> Vang đỏ </Text>{" "}
              anh vào đời bằng{" "}
              <Text style={[styles.boldText, colorText("yellow")]}>
                nước trà
              </Text>
            </Text>

            {/* Line 2 */}
            <Text style={styles.baseText}>
              Bằng cơn mưa thơm {""}
              <Text style={[styles.boldText, sizeText(20), styles.italicText]}>
                mùi đất{" "}
              </Text>{" "}
              và{" "}
              <Text style={[sizeText(10), styles.italicText]}>
                bằng hoa dại mọc trước nhà
              </Text>
            </Text>

            {/* Line 3 */}
            <Text
              style={[
                styles.baseText,
                styles.italicText,
                styles.boldText,
                colorText("gray"),
              ]}
            >
              Em vào đời bằng kế hoạch anh vào đời bằng mộng mơ
            </Text>

            {/* Line 4 */}
            <Text style={[styles.baseText]}>
              Lý trí em là{" "}
              <Text
                style={styleText({
                  textDecorationLine: "underline",
                  letterSpacing: 20,
                  fontWeight: "bold",
                })}
              >
                công cụ{" "}
              </Text>
              còn trái tim anh là
              <Text
                style={styleText({
                  textDecorationLine: "underline",
                  letterSpacing: 20,
                  fontWeight: "bold",
                })}
              >
                {" "}
                động cơ{" "}
              </Text>
            </Text>

            {/* Line 5 */}
            <Text style={[styles.baseText, styleText({ textAlign: "right" })]}>
              {" "}
              Em vào đời nhiều đồng nghiệp anh vào đời nhiều thân tình
            </Text>

            {/* Line 6 */}
            <Text
              style={[
                styles.baseText,
                styleText({
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "orange",
                }),
              ]}
            >
              Anh chỉ muốn chân mình đạp đất không muốn đạp ai dưới chân mình
            </Text>

            {/* Line 7 */}
            <Text
              style={[
                styles.baseText,
                styleText({ fontWeight: "bold", color: "black" }),
              ]}
            >
              Em vào đời bằng <Text style={colorText("white")}>mây trắng</Text>
              em vào đời bằng{" "}
              <Text style={colorText("yellow")}> nắng xanh</Text>
            </Text>

            {/* Line 8 */}
            <Text
              style={[
                styles.baseText,
                styleText({
                  fontWeight: "bold",
                  color: "black",
                }),
              ]}
            >
              Em vào đời bằng <Text style={colorText("yellow")}>đai lộ</Text> và
              con đường đó giờ <Text style={colorText("white")}>vắng anh</Text>
            </Text>
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    padding: 15,
  },

  baseText: {
    fontFamily: "Cochin",
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  tipStyle: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});

function colorText(color: string) {
  return { color };
}

function styleText(styles: object) {
  return { ...styles };
}

function sizeText(size: number) {
  return { fontSize: size };
}
