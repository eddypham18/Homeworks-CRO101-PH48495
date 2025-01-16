import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

export default function MyModalExample() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.openButton}>
        <Text style={styles.openButtonText}>Mở Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose sẽ được gọi khi người dùng nhấn nút back (Android)
        onRequestClose={() => {
          Alert.alert(
            "Thông báo",
            "Bạn đã tắt modal bằng nút back của thiết bị",
            [
              {
                text: "OK",
                onPress: () => setModalVisible(false),
              },
            ]
          );
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello world</Text>
            <Image
              style={styles.imageStyle}
              source={require("../../assets/images/react-native.png")}
            />
            <TouchableOpacity onPress={closeModal} style={styles.hideButton}>
              <Text style={styles.hideButtonText}>Ẩn Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",

    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  hideButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  hideButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageStyle: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});
