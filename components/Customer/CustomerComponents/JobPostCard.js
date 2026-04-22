import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { startChat } from "../../Marketplace/MarketplaceComponents/startChat";

const BASE_URL = "http://10.0.2.2:5000";

const JobPostCard = ({ post, refreshPosts }) => {

  const navigation = useNavigation();

  const [status, setStatus] = useState(post.requestStatus || null);
  const [requestId, setRequestId] = useState(post.requestId || null);

  if (!post) return null;

  /* ---------------- SEND REQUEST ---------------- */

  const handleSendRequest = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          postId: post._id,
          postType: "WorkerPost"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert("Error", data.message);
      }

      Alert.alert("Success", "Request sent");

      setStatus("Pending");
      setRequestId(data.request._id);

      refreshPosts?.();

    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };


  /* ---------------- CANCEL REQUEST ---------------- */

  const handleCancelRequest = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/requests/cancel/${requestId}`,
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

      Alert.alert("Request cancelled");

      setStatus(null);
      setRequestId(null);

      refreshPosts?.();

    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  /* ---------------- CHAT BUTTON HANDLE ---------------- */
  const handleChat = () => {
    if (!post.worker?._id) {
      console.log("Worker ID missing");
      return;
    }

    const user = {
      _id: post.worker._id,
      username: post.worker.username,
      profileImage: post.profileImage
    };

    startChat(user, navigation);
  };

  return (

    <View style={{
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 14,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 4
    }}>

      {/* LEFT PROFILE */}

      <View style={{ alignItems: "center", marginRight: 12 }}>

        <Image
          source={{
            uri: post.profileImage ||
            `https://i.pravatar.cc/150?u=${post._id}`
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30
          }}
        />

        <Text style={{ marginTop: 5, fontWeight: "600" }}>
          {post.worker?.username}
        </Text>

      </View>


      {/* RIGHT CONTENT */}

      <View style={{ flex: 1 }}>

        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {post.service}
        </Text>

        <Text>
          Salary expectation : ₹{post.expectedSalaryPerDay}/day
        </Text>

        <Text>
          Address: {post.address || "Not provided"}
        </Text>

        <Text>
          Available From/On : {new Date(post.availableFrom).toLocaleDateString()}
        </Text>


        {/* Rating + Experience */}

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>

          <FontAwesome name="star" size={14} color="#f1c40f" />

          <Text style={{ marginLeft: 5 }}>
            {post.rating || "4.5"}
          </Text>

          <Text style={{ marginLeft: 8 }}>
            • {post.experienceYears || "3+ yrs"}
          </Text>

        </View>


        {post.additionalInfo && (
          <Text>
            Info: {post.additionalInfo}
          </Text>
        )}

        {status === "Pending" && (
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#1295f3",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              marginTop: 6,
              marginBottom: 6
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
              Pending
            </Text>
          </View>
        )}


        {/* BUTTONS */}

        <View style={{
          flexDirection: "row",
          marginTop: 10
        }}>

          {/* CHAT */}
          <TouchableOpacity
            onPress={handleChat}
            style={{
              backgroundColor: "#744ba9e1",
              padding: 8,
              borderRadius: 6,
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Ionicons name="chatbubble-outline" size={16} color="#fff" />
            <Text style={{ color: "#fff", marginLeft: 4 }}>Chat</Text>
          </TouchableOpacity>


          {/* BUTTON STATE */}

          {status === "Pending" ? (

            <TouchableOpacity
              onPress={handleCancelRequest}
              style={{
                backgroundColor: "#e74c3c",
                padding: 8,
                borderRadius: 6
              }}
            >
              <Text style={{ color: "#fff" }}>
                Cancel Request
              </Text>
            </TouchableOpacity>

          ) : status === "Selected" ? (

            <View style={{
              backgroundColor: "#27ae60",
              padding: 8,
              borderRadius: 6
            }}>
              <Text style={{ color: "#fff" }}>
                Accepted
              </Text>
            </View>

          ) : status === "Rejected" ? (

            <View style={{
              backgroundColor: "#e74c3c",
              padding: 8,
              borderRadius: 6
            }}>
              <Text style={{ color: "#fff" }}>
                Rejected
              </Text>
            </View>

          ) : (

            <TouchableOpacity
              onPress={handleSendRequest}
              style={{
                backgroundColor: "#f39c12",
                padding: 8,
                borderRadius: 6
              }}
            >
              <Text style={{ color: "#fff" }}>
                Send Request
              </Text>
            </TouchableOpacity>

          )}

        </View>

      </View>

    </View>

  );
};

export default JobPostCard;