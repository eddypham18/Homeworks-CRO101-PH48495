import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type ContactType = {
  name: string;
  email: string;
  position: string;
  photo: string;
};

type ContactItemProps = {
  contact: ContactType;
  onEdit: (email: string, updatedContact: ContactType) => void;
  onDelete: (email: string) => void;
};

const ContactItem = ({ contact, onEdit, onDelete }: ContactItemProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedContact, setEditedContact] = useState<ContactType>(contact);

  const handleSave = () => {
    onEdit(contact.email, editedContact);
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.listItem}>
        <Image source={{ uri: contact.photo }} style={styles.avatar} />
        <View style={styles.bodyItem}>
          <Text style={styles.nameText}>{contact.name}</Text>
          <Text>{contact.position}</Text>
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.btnCall}>
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnEdit}
            onPress={() => {
              setEditedContact(contact);
            }}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => onDelete(contact.email)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedContact.name}
              onChangeText={(text) =>
                setEditedContact({ ...editedContact, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Position"
              value={editedContact.position}
              onChangeText={(text) =>
                setEditedContact({ ...editedContact, position: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Photo URL"
              value={editedContact.photo}
              onChangeText={(text) =>
                setEditedContact({ ...editedContact, photo: text })
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>

              {/* hủy bỏ */}
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function HomeScreen() {
  const [contacts, setContacts] = useState<ContactType[]>([
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      position: 'Software Engineer',
      photo:
        'https://images2.thanhnien.vn/528068263637045248/2023/3/2/2-16777205977501414296673.jpg',
    },
    {
      name: 'Alex',
      email: 'alex@gmail.com',
      position: 'Consultant',
      photo:
        'https://img.a.transfermarkt.technology/portrait/big/27394-1700052258.jpg?lm=1',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@gmail.com',
      position: 'Product Manager',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@gmail.com',
      position: 'Designer',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Emily Davis',
      email: 'emilydavis@gmail.com',
      position: 'Data Scientist',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Michael Brown',
      email: 'michaelbrown@gmail.com',
      position: 'DevOps Engineer',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      name: 'Sarah Wilson',
      email: 'sarahwilson@gmail.com',
      position: 'QA Engineer',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ]);

  const handleEdit = (email: string, updatedContact: ContactType) => {
    //Validate
    if (updatedContact.name === '' || updatedContact.position === '' || updatedContact.photo === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const index = contacts.findIndex((contact) => contact.email === email);
    const newContacts = [...contacts];
    newContacts[index] = updatedContact;

    setContacts(newContacts);
  };

  const handleDelete = (email: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.email !== email)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 22 }}>
      <StatusBar style="auto" />
      <View>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <ContactItem
              contact={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          keyExtractor={(item) => item.email}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bodyItem: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnsContainer: {
    flexDirection: 'row',
  },
  btnCall: {
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#f0f0f0',
  },
  callText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(60, 235, 16)',
  },
  btnEdit: {
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#e0e0ff',
  },
  editText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0000ff',
  },
  btnDelete: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffe0e0',
  },
  deleteText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff0000',
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
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});