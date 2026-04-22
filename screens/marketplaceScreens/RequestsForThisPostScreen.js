import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";

import RequestCard from "../../components/Marketplace/MarketplaceComponents/RequestCard";
import styles from "../../styles/MarketplaceScreenStyles/RequestsForThisPostStyles";

// const BASE_URL = "http://10.0.2.2:5000";

const RequestsForThisPostScreen = ({ navigation, route }) => {

  const { postId, postType } = route.params;

  const [requests, setRequests] = useState([]);

  // FETCH REQUESTS
  const fetchRequests = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/requests/${postType}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log("REQUEST RESPONSE:", data);
      setRequests(data.requests || []);

    } catch (error) {
      console.log("Fetch requests error:", error);
    }
  };

  // ACCEPT REQUEST
  const acceptRequest = async (requestId) => {

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

      Alert.alert("Success", "Request accepted");

      fetchRequests();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (

    <LinearGradient
      colors={["#8159cf", "#65bcf3"]}
      style={styles.container}
    >

      {/* BACK BUTTON */}
      <Pressable
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={26} color="white" />
      </Pressable>


      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Requests to your post
        </Text>

        <Text style={styles.subtitle}>
          Users interested in your service
        </Text>

      </View>


      {/* REQUEST LIST */}
      <View style={styles.contentCard}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {requests.length > 0 ? (

            requests.map((req) => (
              <RequestCard
                key={req._id}
                request={req}
                onAccept={acceptRequest}
              />
            ))

          ) : (

            <Text style={styles.noRequests}>
              No requests yet.
            </Text>

          )}

        </ScrollView>

      </View>

    </LinearGradient>
  );
};

export default RequestsForThisPostScreen;