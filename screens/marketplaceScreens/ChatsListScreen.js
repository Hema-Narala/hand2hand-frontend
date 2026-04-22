import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from "../../utils/api";
import styles from "../../styles/MarketplaceScreenStyles/ChatsListStyles";

// const BASE_URL = "http://10.0.2.2:5000";

const ChatsListScreen = ({ navigation }) => {

  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ================= FETCH CHATS =================
  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/chat/my-chats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setChats(data.chats || []);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEARCH USERS =================
  const searchUsers = async (text) => {
    setSearch(text);

    if (!text) {
      setSuggestions([]);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/api/chat/search-users?query=${text}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();
      setSuggestions(data.users || []);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= START CHAT =================
  const startChat = async (user) => {
    try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/chat/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            receiverId: user._id
        })
        });

        const data = await res.json();

        console.log("START CHAT RESPONSE:", data); // 🔥 DEBUG

        if (!data.chatRoom) {
        console.log("ChatRoom missing");
        return;
        }

        setSearch("");
        setSuggestions([]);

        navigation.navigate("ChatScreen", {
        roomId: data.chatRoom._id,
        user
        });

    } catch (err) {
        console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // ================= FILTER EXISTING CHATS =================
  const filteredChats = chats.filter(chat =>
    chat.otherUser?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
        <View>
          <Text style={styles.headerTitle}>My Chats</Text>
          <Text style={styles.headerSubtitle}>Start your conversation</Text>
        </View>
      </View>

      {/* ================= SEARCH ================= */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} />
        <TextInput
          placeholder="Search users..."
          value={search}
          onChangeText={searchUsers}
          style={styles.searchInput}
        />
      </View>

      {/* ================= SEARCH SUGGESTIONS ================= */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {suggestions.map((user) => (
            <TouchableOpacity
              key={user._id}
              style={styles.suggestionItem}
              onPress={() => startChat(user)}
            >
              <Image
                source={{ uri: user.profileImage }}
                style={styles.suggestionAvatar}
              />

              <View>
                <Text style={styles.suggestionName}>
                  {user.name || user.username}
                </Text>
                <Text style={styles.suggestionRole}>
                  {user.role}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ================= CHAT LIST ================= */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate("ChatScreen", {
                roomId: item._id,
                user: item.otherUser
              })
            }
          >
            {/* <Image
              source={{ uri: item.otherUser?.profileImage }}
              style={styles.avatar}
            /> */}
            <Image
              source={
                item.otherUser?.profileImage
                  ? { uri: item.otherUser?.profileImage }
                  : require("../../assets/default-profile.jpg")
              }
              style={styles.avatar}
            />

            <View style={styles.chatInfo}>
              <Text style={styles.name}>
                {item.otherUser?.username}
              </Text>

              <Text style={styles.lastMsg} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            <Text style={styles.time}>
              {new Date(item.updatedAt).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default ChatsListScreen;