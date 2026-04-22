import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  TextInput
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from "../../utils/api";

import styles from "../../styles/CustomerScreenStyles/WorkerSearchScreenStyles";
import JobPostCard from "../../components/Customer/CustomerComponents/JobPostCard";
import CreateJobPostForm from "../../components/Customer/CustomerComponents/CreateJobPostForm";

// ICONS
import plumberIcon from "../../assets/plumber.png";
import masonIcon from "../../assets/mason.png";
import cookIcon from "../../assets/cook.png";
import driverIcon from "../../assets/driver.png";
import houseCleaningIcon from "../../assets/housecleaning.png";
import carpenterIcon from "../../assets/carpenter.png";
import paintingIcon from "../../assets/painting.png";
import washermanIcon from "../../assets/washerman.png";
import allWorkersIcon from "../../assets/workers.png";

// 🔥 IMPORTANT: Change IP if needed
// const BASE_URL = "http://10.0.2.2:5000";

const services = [
  { name: "All", icon: allWorkersIcon },
  { name: "Plumber", icon: plumberIcon },
  { name: "Mason", icon: masonIcon },
  { name: "Cook", icon: cookIcon },
  { name: "Driver", icon: driverIcon },
  { name: "House Cleaning", icon: houseCleaningIcon },
  { name: "Carpenter", icon: carpenterIcon },
  { name: "Painting", icon: paintingIcon },
  { name: "Washerman", icon: washermanIcon },
];

const WorkerSearchScreen = ({ navigation }) => {
  const [workers, setWorkers] = useState([]);
  // const [userLocation, setUserLocation] = useState(null);

  const [selectedService, setSelectedService] = useState("All");
  const [toggleMode, setToggleMode] = useState("Search Worker");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [filters, setFilters] = useState({
    minBudget: "",
    minExperience: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    minBudget: "",
    minExperience: "",
    rating: "",
  });

  const scrollRef = useRef(null);

  // 🔹 Fetch Workers
  const fetchWorkers = async () => {
    try {

      const token = await AsyncStorage.getItem("token");

      let query = "";

      if (selectedService !== "All") {
        query += `service=${selectedService}&`;
      }

      if (filters.minBudget) {
        query += `minSalary=${filters.minBudget}&`;
      }

      if (filters.minExperience) {
        query += `minExperience=${filters.minExperience}&`;
      }

      if (filters.rating) {
        query += `rating=${filters.rating}&`;
      }

      const response = await fetch(
        `${BASE_URL}/api/worker-posts/nearby?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setWorkers(data.posts || []);

    } catch (error) {
      console.log("Fetch workers error:", error);
    }
  };

   // 🔹 Refetch when filters change
  useEffect(() => {
    fetchWorkers();
  }, [selectedService, filters]);

  // 🔹 Get Location
  // const getUserLocation = async () => {
  //   try {
  //     const { status } =
  //       await Location.requestForegroundPermissionsAsync();

  //     if (status !== "granted") {
  //       Alert.alert("Permission required", "Location permission needed");
  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync({});

  //     const coords = {
  //       lng: location.coords.longitude,
  //       lat: location.coords.latitude,
  //     };

  //     setUserLocation(coords);
  //     fetchWorkers(coords.lng, coords.lat);

  //   } catch (error) {
  //     console.log("Location error:", error);
  //   }
  // };

  // 🔹 Get location on mount
  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  // 🔹 Refetch when filters change
  // useEffect(() => {
  //   if (userLocation) {
  //     fetchWorkers(userLocation.lng, userLocation.lat);
  //   }
  // }, [selectedService, filters]);

  const handleToggle = () => {
    const newMode =
      toggleMode === "Search Worker"
        ? "Create Job Post"
        : "Search Worker";

    setToggleMode(newMode);
    setShowCreateForm(newMode === "Create Job Post");
  };

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="white" />
      </Pressable>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Workers</Text>

        <View style={styles.toggleContainer}>
          <Pressable
            style={[
              styles.toggleBtn,
              toggleMode === "Search Worker" && styles.activeToggle,
            ]}
            onPress={handleToggle}
          >
            <Text>Search Worker</Text>
          </Pressable>

          <Pressable
            style={[
              styles.toggleBtn,
              toggleMode === "Create Job Post" && styles.activeToggle,
            ]}
            onPress={handleToggle}
          >
            <Text>Create Job Post</Text>
          </Pressable>
        </View>
      </View>

      {/* SERVICES FILTER */}
      {!showCreateForm && (
        <View style={styles.servicesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {services.map((service) => (
              <Pressable
                key={service.name}
                style={[
                  styles.serviceBtn,
                  selectedService === service.name &&
                    styles.activeService,
                ]}
                onPress={() => setSelectedService(service.name)}
              >
                <Image
                  source={service.icon}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceText}>{service.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* MAIN CONTENT */}
      <View style={styles.postsWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {showCreateForm ? (
            <CreateJobPostForm />
          ) : (
            <>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>
                  {selectedService} Workers
                </Text>

                <Pressable
                  style={styles.filterBtn}
                  onPress={() => setShowFilter(true)}
                >
                  <Ionicons name="options-outline" size={20} color="#333" />
                </Pressable>
              </View>

              {workers.length > 0 ? (
                workers.map((post) => (
                  <JobPostCard
                    key={post._id}
                    post={post}
                    refreshPosts={fetchWorkers}
                  />
                ))
              ) : (
                <Text style={styles.noPosts}>
                  No workers found.
                </Text>
              )}
            </>
          )}
        </ScrollView>
      </View>
      <Modal visible={showFilter} transparent animationType="slide">
        <View style={styles.filterOverlay}>
          <View style={styles.filterModal}>

            <Text style={styles.filterTitle}>Filter Workers</Text>

            <TextInput
              placeholder="Minimum Salary"
              keyboardType="numeric"
              style={styles.filterInput}
              value={tempFilters.minBudget}
              onChangeText={(text) =>
                setTempFilters({ ...tempFilters, minBudget: text })
              }
            />

            <TextInput
              placeholder="Minimum Experience (years)"
              keyboardType="numeric"
              style={styles.filterInput}
              value={tempFilters.minExperience}
              onChangeText={(text) =>
                setTempFilters({ ...tempFilters, minExperience: text })
              }
            />

            <TextInput
              placeholder="Minimum Rating"
              keyboardType="numeric"
              style={styles.filterInput}
              value={tempFilters.rating}
              onChangeText={(text) =>
                setTempFilters({ ...tempFilters, rating: text })
              }
            />

            <View style={styles.filterActions}>
              <Pressable
                style={styles.applyBtn}
                onPress={() => {
                  setFilters(tempFilters);
                  setShowFilter(false);
                }}
              >
                <Text style={{ color: "white" }}>Apply</Text>
              </Pressable>

              <Pressable
                style={styles.resetBtn}
                onPress={() => {
                  setTempFilters({
                    minBudget: "",
                    minExperience: "",
                    rating: "",
                  });
                  setFilters({
                    minBudget: "",
                    minExperience: "",
                  });
                  setShowFilter(false);
                }}
              >
                <Text style={{ color: "white" }}>Reset</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WorkerSearchScreen;