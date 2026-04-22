import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";
import styles from "../../styles/MarketplaceScreenStyles/ChatsListStyles";

// const BASE_URL = "http://10.0.2.2:5000";

const UserProfileViewScreen = ({ route }) => {

  const { userId } = route.params;

  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(
      `${BASE_URL}/api/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();
    setProfile(data.user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: profile.profileImage }} style={styles.image} />

      <Text style={styles.name}>{profile.username}</Text>
      <Text>{profile.email}</Text>
      <Text>{profile.phone}</Text>
    </ScrollView>
  );
};

export default UserProfileViewScreen;