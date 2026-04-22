import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../../utils/api";
import styles from "../../styles/WorkerScreenStyles/RequestsForThisPostStyles";

// const BASE_URL = "http://10.0.2.2:5000";


const RequestsForThisPostScreen = ({ route }) => {

  const navigation = useNavigation();

  const { postId } = route.params;

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/requests/WorkerPost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      setRequests(data.requests || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
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

    if (response.ok) {
      Alert.alert("Success", "Request accepted");
      fetchRequests();
    }
  };

  const handleReject = async (requestId) => {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/api/requests/reject/${requestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      fetchRequests();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestCard}>
      <Text style={styles.name}>
        {item.sender?.username}
      </Text>

      <Text style={styles.detail}>
        Phone: {item.phone}
      </Text>

      <View
        style={[
          styles.statusBadge,
          item.status === "Pending"
            ? styles.pending
            : item.status === "Selected"
            ? styles.selected
            : styles.rejected
        ]}
      >
        <Text style={styles.statusText}>
          {item.status}
        </Text>
      </View>

      {item.status === "Pending" && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => handleAccept(item._id)}
          >
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => handleReject(item._id)}
          >
            <Text style={styles.btnText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Requests For This Post
      </Text>

      {requests.length === 0 ? (
        <Text style={styles.emptyText}>
          No requests yet.
        </Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default RequestsForThisPostScreen;