import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../MarketplaceComponentStyles/RequestCardStyles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { startChat } from "./startChat";

const RequestCard = ({ request, onAccept }) => {
  const navigation = useNavigation();
  const status = request.status;

  /* ---------------- CHAT BUTTON HANDLE ---------------- */
  const handleChat = () => {
    if (!request.sender?._id) {
      console.log("Sender ID missing");
      return;
    }

    const user = {
      _id: request.sender._id,
      username: request.sender.username,
      profileImage: request.profileImage
    };

    startChat(user, navigation);
  };

  return (
    <View style={styles.card}>

      {/* LEFT PROFILE */}
      <View style={styles.leftSection}>
        <Image
          source={
            request.profileImage
              ? { uri: request.profileImage }
              : require("../../../assets/default-profile.jpg")
          }
          style={styles.profileImage}
        />

        <Text style={styles.name}>
          {request.name || "No Name"}
        </Text>
      </View>


      {/* RIGHT DETAILS */}
      <View style={styles.rightSection}>

        <Text style={styles.username}>
          @{request.sender.username}
        </Text>

        <Text style={styles.role}>
          Role: {request.sender.role}
        </Text>

        <Text style={styles.phone}>
          {request.phone}
        </Text>

        {request.email ? (
          <Text style={styles.email}>
            {request.email}
          </Text>
        ) : null}

        <Text style={styles.address}>
          {request.address}
        </Text>

        {/* ACTION BUTTONS */}
        {/* <View style={styles.actions}>

          <TouchableOpacity style={styles.chatBtn}>
            <Text style={styles.btnText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => onAccept(request._id)}
          >
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>

        </View> */}
        {/* ACTION / STATUS */}
        <View style={styles.actions}>

          {status === "Pending" && (
            <>
              {/* <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
                <Ionicons name="chatbubble-outline" size={16} color="#fff" />
                <Text style={styles.btnText}>Chat</Text>
              </TouchableOpacity> */}
              
              {/* CHAT */}
              <TouchableOpacity
                onPress={handleChat}
                style={{
                  backgroundColor: "#6a4cc2e1",
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

              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => onAccept(request._id)}
              >
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
            </>
          )}

          {status === "Selected" && (
            <View style={styles.acceptedBadge}>
              <Text style={styles.badgeText}>Accepted</Text>
            </View>
          )}

          {status === "Rejected" && (
            <View style={styles.rejectedBadge}>
              <Text style={styles.badgeText}>Rejected</Text>
            </View>
          )}

        </View>

      </View>

    </View>
  );
};

export default RequestCard;