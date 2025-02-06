import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

type ContactType = {
  name: string;
  email: string;
  position: string;
  photo: string;
};

const ContactItem = ({ contact }: { contact: ContactType }) => {
  return (
    <View style={styles.listItem}>
      <Image source={{ uri: contact.photo }} style={styles.avatar} />
      <View style={styles.bodyItem}>
        <Text style={styles.nameText}>{contact.name}</Text>
        <Text>{contact.position}</Text>
      </View>
      <TouchableOpacity style={styles.btnCall}>
        <Text style={styles.callText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen() {
  const data: ContactType[] = [
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
  ];

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 22 }}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <ContactItem contact={item} />}
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
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnCall: {
    padding: 10,
    borderRadius: 5,
  },
  callText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(60, 235, 16)',
  },
});
