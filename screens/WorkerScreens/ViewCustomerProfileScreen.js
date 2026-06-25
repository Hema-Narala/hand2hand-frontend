import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, Feather } from "@expo/vector-icons";

import styles from "../../styles/CustomerScreenStyles/CustomerProfileStyles";
import BASE_URL from "../../utils/api";

const ViewCustomerProfileScreen = ({
  route,
  navigation
}) => {

  const { customerId } = route.params;
  // console.log("CUSTOMER ID:", customerId);

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  const [showImageModal, setShowImageModal] =
    useState(false);


  const fetchCustomerProfile = async () => {
    try {

      const token =
        await AsyncStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/customerprofile/view/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        setProfile(data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const fetchCustomerStats = async () => {
    try {

      const token =
        await AsyncStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/profile/customer-stats/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStats(data);
      }

      // console.log("CUSTOMER STATS:", data);

    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {

      fetchCustomerProfile();
      fetchCustomerStats();

    }, [customerId])
  );

  if (!profile) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  const statsData = [
    {
      label: "Jobs Booked",
      value: stats?.jobsBooked || 0
    },
    {
      label: "Active Jobs",
      value: stats?.activeJobs || 0
    },
    {
      label: "Saved Workers",
      value: stats?.savedWorkers || 0
    },
    {
      label: "Total Spent",
      value: `₹${stats?.totalSpent || 0}`
    }
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>
            Customer Profile
          </Text>

          <Text style={styles.headerSubtitle}>
            View customer details
          </Text>
        </View>

      </View>


      {/* PROFILE CARD */}

      <View style={styles.profileCard}>

        <TouchableOpacity
          onPress={() => setShowImageModal(true)}
        >
          <Image
            source={
              profile.profileImage
                ? { uri: profile.profileImage }
                : require("../../assets/default-profile.jpg")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.name}>
          {profile.name}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Customer
          </Text>
        </View>


        <View style={styles.infoBox}>

          <View style={styles.infoRow}>
            <Feather name="phone" size={16} />
            <Text style={styles.infoText}>
              {profile.phone || "Not provided"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="mail" size={16} />
            <Text style={styles.infoText}>
              {profile.email || "Not provided"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={16}
            />
            <Text style={styles.infoText}>
              {profile.address || "No address"}
            </Text>
          </View>

        </View>

      </View>


      {/* STATS */}

      <View style={styles.statsBox}>
        {statsData.map((item, i) => (
          <View
            key={i}
            style={styles.statItem}
          >
            <Text style={styles.statValue}>
              {item.value}
            </Text>

            <Text style={styles.statLabel}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>


      {/* IMAGE MODAL */}

      <Modal
        visible={showImageModal}
        transparent
        animationType="fade"
      >

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => setShowImageModal(false)}
        >

          <Image
            source={
              profile.profileImage
                ? { uri: profile.profileImage }
                : require("../../assets/default-profile.jpg")
            }
            style={{
              width: "95%",
              height: "70%",
              resizeMode: "contain"
            }}
          />

        </TouchableOpacity>

      </Modal>

    </ScrollView>
  );
};

export default ViewCustomerProfileScreen;