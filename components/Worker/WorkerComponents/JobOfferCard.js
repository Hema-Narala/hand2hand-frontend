import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import styles from "../WorkerComponentStyles/JobOfferCardStyles";
import { startChat } from "../../Marketplace/MarketplaceComponents/startChat";

const BASE_URL = "http://10.0.2.2:5000";

const JobOfferCard = ({ offer, refreshRequests }) => {

  const navigation = useNavigation();

  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = offer.requestStatus;
  const requestId = offer.requestId;

  if (!offer) return null;

  // =========================
  // ACCEPT REQUEST
  // =========================
  const handleSendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            postId: offer._id,
            postType: "CustomerPost"
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (refreshRequests) refreshRequests();
        Alert.alert("Success", "Request sent to customer");
      } else {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      Alert.alert("Error", "Server error");
    }
  };

  // =========================
  // CANCEL ACCEPTANCE
  // =========================
  const handleCancelRequest = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!requestId) {
        Alert.alert("Error", "Request ID missing");
        return;
      }

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

      if (response.ok) {
        if (refreshRequests) refreshRequests();
        Alert.alert("Request Cancelled");
      } else {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      Alert.alert("Error", "Server error");
    }
  };

  const closeOverlay = () => setShowOverlay(false);

  /* ---------------- CHAT BUTTON HANDLE ---------------- */
  const handleChat = () => {
    if (!offer.customer?._id) {
      console.log("Customer ID missing");
      return;
    }

    const user = {
      _id: offer.customer._id,
      username: offer.customer.username,
      profileImage: offer.profileImage
    };

    startChat(user, navigation);
  };

  return (
    <>
      {/* CARD */}
      <View style={styles.card}>
        <View>
          <Image
            
            source={
              offer?.profileImage 
                ? { uri: offer?.profileImage }
                : require("../../../assets/default-profile.jpg")
            }
            style={styles.customerImg}
          />
          <Text style={styles.nameService}>
            <Text style={{ fontWeight: "bold" }}>
              {offer.customerName}
            </Text>{" "}
          </Text>
        </View>


        <View style={styles.details}>

          <Text style={styles.nameService}>
            <Text style={{ fontWeight: "bold" }}>
              {offer.customer?.username}
            </Text>{" "}
            • {offer?.serviceNeeded}
          </Text>

          <Text style={styles.date}>
            {new Date(offer.dateOfService).toLocaleDateString("en-IN")}
          </Text>

          <Text style={styles.address}>
            {offer.address}
          </Text>

          <Text style={styles.description}>
            {offer.additionalRequirements}
          </Text>

          <Text style={styles.budget}>
            Budget:{" "}
            <Text style={{ fontWeight: "600" }}>
              ₹{offer.budgetPerDay}/day
            </Text>
          </Text>

          {offer.additionalRequirements && (
            <Text style={styles.requirements}>
              Extra: {offer.additionalRequirements}
            </Text>
          )}

          <Text
            style={styles.phone}
            onPress={() =>
              Linking.openURL(`tel:${offer.phone}`)
            }
          >
            {offer.phone}
          </Text>

          {status && (
            <View style={styles.statusWrapper}>
              <Text
                style={[
                  styles.statusBadge,
                  status === "Selected"
                    ? styles.accepted
                    : status === "Rejected"
                    ? styles.rejected
                    : styles.pending
                ]}
              >
                {status === "Selected"
                  ? "Accepted"
                  : status === "Rejected"
                  ? "Rejected"
                  : "Pending"}
              </Text>
            </View>
          )}

          <View style={styles.actions}>

            {/* Chat Button */}
            {/* <TouchableOpacity
              style={styles.whatsappBtn}
              onPress={() => Linking.openURL(`https://wa.me/${offer.phone}`)}
            >
              <Ionicons name="logo-whatsapp" size={16} color="#fff" />
              <Text style={styles.whatsappText}>Chat</Text>
            </TouchableOpacity> */}

            {/* Chat Button */}
            <TouchableOpacity
              onPress={handleChat}
              style={{
                backgroundColor: "#4f6ccd",
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


            {/* BUTTON STATE CONTROL */}
            {status === "Pending" ? (

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={handleCancelRequest}
              >
                <Text style={styles.actionText}>Cancel Request</Text>
              </TouchableOpacity>

            ) : status === "Selected" ? (

              <View style={styles.statusWrapper}>
                <Text style={[styles.statusBadge, styles.accepted]}>
                  Accepted
                </Text>
              </View>

            ) : status === "Rejected" ? (

              <View style={styles.statusWrapper}>
                <Text style={[styles.statusBadge, styles.rejected]}>
                  Rejected
                </Text>
              </View>

            ) : (

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSendRequest}
              >
                <Text style={styles.actionText}>Send Request</Text>
              </TouchableOpacity>

            )}

          </View>
        </View>
      </View>

      {/* CONFIRMATION MODAL */}
      <Modal
        visible={showOverlay}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>
              Booking Confirmed!
            </Text>

            <Text style={styles.overlayText}>
              Open <Text style={{ fontWeight: "bold" }}>
                Your Bookings
              </Text> page to see details.
            </Text>

            <TouchableOpacity
              style={styles.overlayBtn}
              onPress={closeOverlay}
            >
              <Text style={styles.overlayBtnText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default JobOfferCard;