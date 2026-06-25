import React, { useEffect, useState,useCallback } from "react";
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
import {
  Ionicons,
  Feather
} from "@expo/vector-icons";

import BASE_URL from "../../utils/api";
import styles from "../../styles/CustomerScreenStyles/ViewWorkerProfileStyles";

const ViewWorkerProfileScreen = ({ route, navigation }) => {

  const { workerId } = route.params;
  // console.log("WORKER ID:", workerId);

  //To open images in experience section
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);


  const fetchProfile = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/workerprofile/view/${workerId}`,
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
      // console.log("PROFILE DATA:", JSON.stringify(data, null, 2));

    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkerStats = async () => {
    try {

      const token =
        await AsyncStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/profile/worker-stats/${workerId}`,
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

    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // console.log("SCREEN FOCUSED");
      // console.log("WORKER ID:", workerId);

      fetchProfile();
      fetchWorkerStats();

    }, [workerId])
  );

  if (!profile) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
            Worker Profile
          </Text>

          <Text style={styles.headerSubtitle}>
            View worker details
          </Text>
        </View>

      </View>

      {/* PROFILE CARD */}

      <View style={styles.profileCard}>

        <TouchableOpacity
            onPress={() => {
                if (profile.profileImage) {
                setSelectedImage(profile.profileImage);
                setShowModal(true);
                }
            }}
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

        <View style={styles.badgeRow}>
          <Text style={styles.badge}>
            Worker
          </Text>

          <Text style={styles.rating}>
            ⭐ {stats?.rating || 0}
          </Text>
        </View>

        <Text style={styles.bio}>
          {profile.bio || "No bio added"}
        </Text>

        <View style={styles.services}>
          {profile.services?.map(service => (
            <Text
              key={service}
              style={styles.serviceTag}
            >
              {service}
            </Text>
          ))}
        </View>

        <View style={styles.infoBox}>

          <Text>
            <Feather name="phone" />
            {" "}
            {profile.phone || "Not available"}
          </Text>

          <Text>
            <Feather name="mail" />
            {" "}
            {profile.email || "Not available"}
          </Text>

          <Text>
            <Ionicons name="location-outline" />
            {" "}
            {profile.address || "Not available"}
          </Text>

        </View>

      </View>

      {/* STATS */}

      <View style={styles.statsBox}>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {stats?.jobsDone || 0}
          </Text>

          <Text style={styles.statLabel}>
            Jobs Done
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            ₹{stats?.moneyEarnedThisMonth || 0}
          </Text>

          <Text style={styles.statLabel}>
            This Month
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {stats?.rating || 0}
          </Text>

          <Text style={styles.statLabel}>
            Rating
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {stats?.successRate || 0}%
          </Text>

          <Text style={styles.statLabel}>
            Success Rate
          </Text>
        </View>

      </View>

      {/* EXPERIENCE */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Experience
        </Text>

        {profile.experienceMedia?.length > 0 ? (

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gallery}
          >

            {profile.experienceMedia.map((img, index) => (

            //   <Image
            //     key={index}
            //     source={{ uri: img.url }}
            //     style={styles.expImage}
            //   />
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setSelectedImage(img.url);
                    setShowModal(true);
                }}
            >
                <Image
                    source={{ uri: img.url }}
                    style={styles.expImage}
                />
            </TouchableOpacity>

            ))}

          </ScrollView>

        ) : (

          <Text style={styles.placeholder}>
            No experience images
          </Text>

        )}

      </View>

      {/* REVIEWS */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Customer Reviews
        </Text>

        {profile.reviews?.length > 0 ? (

          profile.reviews.map((item, index) => (

            <View
              key={index}
              style={styles.reviewCard}
            >

              {/* <Text style={styles.reviewName}>
                {item.customerName}
              </Text> */}
              <Text style={styles.reviewName}>@ 
                {item.customer?.firstname ||
                item.customer?.username ||
                "Customer"}
              </Text>

              <Text>
                {"⭐".repeat(item.rating)}
              </Text>

              <Text style={styles.reviewText}>
                {item.review}
              </Text>

            </View>

          ))

        ) : (

          <Text style={styles.placeholder}>
            No reviews yet
          </Text>

        )}

      </View>
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        >
        <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowModal(false)}
        >
            <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="contain"
            />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default ViewWorkerProfileScreen;