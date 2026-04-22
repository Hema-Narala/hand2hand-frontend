import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";

// const BASE_URL = "http://10.0.2.2:5000";

const RequestsForThisPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/requests/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      setRequests(data.requests || []);

    } catch (error) {
      console.log("Fetch requests error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 ACCEPT REQUEST
  const handleAccept = (requestId) => {
    Alert.alert(
      "Accept Worker",
      "Are you sure you want to accept this worker?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              const response = await fetch(
                `${BASE_URL}/api/requests/accept/${requestId}`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );

              const data = await response.json();

              if (!response.ok) {
                return Alert.alert("Error", data.message);
              }

              Alert.alert("Success", "Worker accepted successfully");

              fetchRequests();

            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    const worker = item.sender; // worker is sender for CustomerPost

    return (
      <View
        style={{
          padding: 15,
          margin: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          elevation: 3
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: worker.profileImage || "https://i.pravatar.cc/150" }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 15
            }}
          />

          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {worker.username}
            </Text>
            <Text>Rating: ⭐ {worker.rating || 0}</Text>
          </View>
        </View>

        {item.status === "Pending" && (
          <TouchableOpacity
            onPress={() => handleAccept(item._id)}
            style={{
              marginTop: 15,
              backgroundColor: "#4CAF50",
              padding: 10,
              borderRadius: 8
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Accept
            </Text>
          </TouchableOpacity>
        )}

        {item.status === "Selected" && (
          <Text style={{ color: "green", marginTop: 10 }}>
            ✅ Accepted
          </Text>
        )}

        {item.status === "Rejected" && (
          <Text style={{ color: "red", marginTop: 10 }}>
            ❌ Rejected
          </Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No requests yet.
        </Text>
      }
    />
  );
};

export default RequestsForThisPostScreen;