import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { api } from '../../scripts/api';

type User = {
  id: string;
  name: string;
  dob: string;
  avatar: string;
};

type ItemProps = {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onDelete: (deletedUserId: string) => void;
};

const Item = ({ user, onUpdate, onDelete }: ItemProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [name, setName] = useState(user.name);
  const [dob, setDob] = useState(user.dob);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = async () => {
    try {
      const updatedData = { name, dob, avatar };

      if (name === '' || dob === '' || avatar === '') {
        Alert.alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }

      if (!avatar.startsWith('http')) {
        Alert.alert('Ảnh không hợp lệ. Ảnh phải là một URL');
        return;
      }

      // Validate ngày sinh theo định dạng YYYY-MM-DD
      if (!dob.match(/^\d{4}-\d{2}-\d{2}$/)) {
        Alert.alert('Ngày sinh không hợp lệ. Định dạng đúng: YYYY-MM-DD');
        return;
      }

      const response = await api.put(`/users/${user.id}`, updatedData);
      onUpdate(response);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${user.id}`);
      onDelete(user.id);
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => setDetailModalVisible(true)}>
        <View style={styles.contentContainer}>
          <Text style={styles.itemText}>Họ tên: {user.name}</Text>
          <Text style={styles.itemText}>Ngày sinh: {user.dob}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDel}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Chi tiết */}
      <Modal visible={detailModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.detailText}>Họ tên: {user.name}</Text>
            <Text style={styles.detailText}>Ngày sinh: {user.dob}</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setDetailModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Sửa */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sửa Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Họ tên"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Sinh nhật (YYYY-MM-DD)"
              value={dob}
              onChangeText={setDob}
            />
            <TextInput
              style={styles.input}
              placeholder="Ảnh (URL)"
              value={avatar}
              onChangeText={setAvatar}
              multiline
              numberOfLines={3}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Xóa */}
      <Modal visible={deleteModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xóa Contact</Text>
            <Text style={styles.confirmationText}>
              Bạn có chắc chắn muốn xóa contact này?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const HomeScreen = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newAvatar, setNewAvatar] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      // Giả sử response trả về mảng người dùng
      setUserList(response);
    } catch (error) {
      console.error('Fetch users error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const handleDeleteUser = (deletedUserId: string) => {
    setUserList((prev) => prev.filter((u) => u.id !== deletedUserId));
  };

  const addUser = async () => {
    if (newName === '' || newDob === '' || newAvatar === '') {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!newAvatar.startsWith('http')) {
      Alert.alert('Ảnh không hợp lệ. Ảnh phải là một URL');
      return;
    }

    if (!newDob.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Ngày sinh không hợp lệ. Định dạng đúng: YYYY-MM-DD');
      return;
    }

    try {
      const newUser = { name: newName, dob: newDob, avatar: newAvatar };
      const response = await api.post('/users', newUser);
      setUserList((prev) => [...prev, response]);
      setAddModalVisible(false);
      setNewName('');
      setNewDob('');
      setNewAvatar('');
    } catch (error) {
      console.error('Thêm thất bại:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        marginTop: Platform.OS === 'android' ? 25 : 0,
      }}
    >
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            user={item}
            onUpdate={handleUpdateUser}
            onDelete={handleDeleteUser}
          />
        )}
      />

      <TouchableOpacity
        style={styles.buttonThem}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.buttonThemText}>+</Text>
      </TouchableOpacity>

      {/* Modal Thêm */}
      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Người Dùng</Text>
            <TextInput
              style={styles.input}
              placeholder="Họ tên"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Sinh nhật (YYYY-MM-DD)"
              value={newDob}
              onChangeText={setNewDob}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Ảnh (URL)"
              value={newAvatar}
              onChangeText={setNewAvatar}
              multiline
              numberOfLines={3}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addUser}>
                <Text style={styles.modalButtonText}>Thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setAddModalVisible(false);
                  setNewName('');
                  setNewDob('');
                  setNewAvatar('');
                }}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    margin: 5,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    width: 100,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,255,0.5)',
    alignItems: 'center',
  },
  buttonDel: {
    width: 100,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(196,17,32,0.69)',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonThem: {
    width: 50,
    height: 50,
    padding: 8,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  buttonThemText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
