import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../WorkerComponentStyles/WorkerAvailabilityCardStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from "../../../utils/api";

// const BASE_URL = "http://10.0.2.2:5000";

const WorkerAvailabilityCard = ({ post, onDeleted, onEdit}) => {

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const confirmCancel = () => {
    Alert.alert(
      "Delete Availability",
      "Are you sure you want to delete this post?",
      [
        { text: "No" },
        { text: "Yes", onPress: handleDelete }
      ]
    );
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/worker-posts/${post._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Post deleted");
        if (onDeleted) onDeleted(post._id);
      } else {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      Alert.alert("Error", "Server error");
    }
  };

  /* ---------------- CHAT BUTTON HANDLE ---------------- */
  const handleChat = () => {
    const user = {
      _id: post.worker,
      username: post.workerName,
      profileImage: post.profileImage
    };

    startChat(user, navigation);
  };

  const toggleStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/worker-posts/${post._id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <View style={styles.card}>

      {/* ===== TOP SECTION ===== */}
      <View style={styles.topContainer}>

        {/* LEFT SIDE */}
        <View style={styles.leftColumn}>
          <Image
            source={{
              uri:
                post?.profileImage ||
                `https://i.pravatar.cc/150?u=${post?._id}`
            }}
            style={styles.avatar}
          />
          <Text style={styles.workerName}>
            {post?.workerName || "USER"}
          </Text>
        </View>

        {/* RIGHT SIDE */}
        <View style={styles.rightColumn}>

          <Text style={styles.textRow}>
            <Text style={styles.label}>Service: </Text>
            {post?.service}
          </Text>

          <Text style={styles.textRow}>
            <Text style={styles.label}>Available from: </Text>
            {new Date(post?.availableFrom).toLocaleDateString("en-IN")}
          </Text>

          <Text style={styles.textRow}>
            <Text style={styles.label}>Address: </Text>
            {post?.address}
          </Text>

          <Text style={styles.textRow}>
            ₹{post?.expectedSalaryPerDay}
            <Text style={styles.highlight}> /per day</Text>
          </Text>

          <Text style={styles.textRow}>
            {post?.experienceYears}
            <Text style={styles.highlight}> years experience</Text>
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#f9a825" />
            <Text style={styles.ratingText}>
              {post?.rating || 0}
              <Text style={styles.highlight}> Rating</Text>
            </Text>
          </View>
          {post?.additionalInfo && (
            <Text style={styles.extra} numberOfLines={3}>
              {post?.additionalInfo}
            </Text>
          )}

        </View>
      </View>

      {/* ===== BUTTON GRID ===== */}
      <View style={styles.buttonGrid}>

        <TouchableOpacity
          style={[styles.button, styles.editBtn]}
          onPress={() => onEdit(post)}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteBtn]}
          onPress={confirmCancel}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.button, styles.chatBtn]}
        >
          <Text style={styles.btnText}>Chat</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.button, styles.viewBtn]}
          onPress={() =>
            navigation.navigate("RequestsForMyPost", {
              postId: post._id,
              postType: "WorkerPost"
            })
          }
        >
          <Text style={styles.btnText}>View Requests</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default WorkerAvailabilityCard;