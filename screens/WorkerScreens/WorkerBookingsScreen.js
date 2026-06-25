import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";

import BookingCardW from "../../components/Worker/WorkerComponents/BookingCardW";

import styles from "../../styles/CustomerScreenStyles/BookingsScreenStyles";

import { Ionicons } from "@expo/vector-icons";

// const BASE_URL = "http://10.0.2.2:5000";

export default function BookingsScreen({ navigation }) {

  const [activeTab, setActiveTab] = useState("Active");
  const [bookings, setBookings] = useState([]);

  // ✅ FETCH BOOKINGS
  const fetchBookings = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/bookings/mine`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      // ✅ backend returns array directly
      setBookings(data);

    } catch (error) {
      console.log("Fetch bookings error:", error);
    }
  };


  useEffect(() => {
    fetchBookings();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchBookings();
    });

    return unsubscribe;
  }, [navigation]);

  // ✅ FILTER
  const filteredBookings = bookings.filter(
    b => b.status === activeTab
  );

  return (

    <LinearGradient
      colors={["#a07be3ff", "#69b7d5ff"]}
      style={styles.container}
    >

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#100f0f" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>Manage your bookings here</Text>
        </View>
        
      </View>



      {/* TABS */}
      <View style={styles.tabContainer}>

        {["Active", "Completed", "Cancelled"].map(tab => (

          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab &&
              styles.activeTabButton
            ]}
            onPress={() => setActiveTab(tab)}
          >

            <Text style={styles.tabText}>
              {tab}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* <ScrollView>

        {filteredBookings.map(booking => (

          <BookingCardW
            key={booking._id}
            booking={booking}
            type="customer"
            refreshBookings={fetchBookings}
          />

        ))}

      </ScrollView> */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {filteredBookings.length > 0 ? (

          filteredBookings.map(booking => (
            <BookingCardW
              key={booking._id}
              booking={booking}
              type="customer"
              refreshBookings={fetchBookings}
            />
          ))

        ) : (

          <View style={styles.emptyContainer}>
            <View style={styles.emptyCard}>

              <Text style={styles.emptyText}>
                {activeTab === "Active" && "No active bookings yet..."}
                {activeTab === "Completed" && "No bookings completed yet..."}
                {activeTab === "Cancelled" && "No cancelled bookings yet..."}
              </Text>

            </View>
          </View>

        )}

      </ScrollView>

    </LinearGradient>

  );
}