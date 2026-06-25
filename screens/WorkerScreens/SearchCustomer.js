import React, { useState, useRef,useEffect  } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Modal,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";

import CreateWorkPostForm from "../../components/Worker/WorkerComponents/CreateWorkPostForm";
import WorkerAvailabilityCard from "../../components/Worker/WorkerComponents/WorkerAvailabilityCard";
import JobOfferCard from "../../components/Worker/WorkerComponents/JobOfferCard";

import styles from "../../styles/WorkerScreenStyles/SearchCustomerStyles";

// const BASE_URL = "http://10.0.2.2:5000"; 

const services = [
  { name: "All Jobs", icon: require("../../assets/workers.png") },
  { name: "Plumber", icon: require("../../assets/plumber.png") },
  { name: "Electrician", icon: require("../../assets/electrician.png") },
  { name: "Cook", icon: require("../../assets/cook.png") },
  { name: "House Cleaning", icon: require("../../assets/housecleaning.png") },
  { name: "Driver", icon: require("../../assets/driver.png") },
  { name: "Washerman", icon: require("../../assets/washerman.png") },
  { name: "Mason", icon: require("../../assets/mason.png") },
  { name: "Painter", icon: require("../../assets/painting.png") },
  { name: "Carpenter", icon: require("../../assets/carpenter.png") }
];

const SearchCustomer = () => {

  const [toggleMode, setToggleMode] = useState("Search Customer");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [workerPosts, setWorkerPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const [selectedService, setSelectedService] = useState("All Jobs");

  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    minSalary: "",
    minExperience: ""
  });

  const [customerJobs, setCustomerJobs] = useState([]);

  const filteredJobs = customerJobs;

  // const filteredJobs =
  //   selectedService === "All Jobs"
  //     ? customerJobs
  //     : customerJobs.filter(j => j.serviceNeeded  === selectedService);

  const handleToggle = () => {
    const newMode =
      toggleMode === "Search Customer"
        ? "Create Work Post"
        : "Search Customer";

    setToggleMode(newMode);

    if (newMode === "Create Work Post" && workerPosts.length === 0) {
      setShowCreateForm(true);
    } else if (newMode === "Search Customer") {
      setShowCreateForm(false);
    }
  };

  //TO FETCH WORKER POSTS DATA FROM BACKEND
  const fetchWorkerPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/worker-posts/mine`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const text = await response.text();
      // console.log("Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.log("Invalid JSON from server");
        return;
      }
      setWorkerPosts(data.posts || []);

    } catch (error) {
      console.log(error);
    }
  };
//   const fetchWorkerPosts = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token");

//     const response = await fetch(
//       `${BASE_URL}/api/worker-posts/mine`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     const text = await response.text();
//     console.log("RAW SERVER RESPONSE:", text);

//   } catch (error) {
//     console.log("ERROR:", error);
//   }
// };

  //TO FETCH CUSTOMER JOB POSTS DATA FROM BACKEND
  const fetchCustomerJobs = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      let query = "";

      if (selectedService !== "All Jobs") {
        query += `service=${selectedService}&`;
      }

      if (filters.minSalary) {
        query += `minSalary=${filters.minSalary}&`;
      }

      if (filters.minExperience) {
        query += `minExperience=${filters.minExperience}&`;
      }

      const response = await fetch(
        `${BASE_URL}/api/customer-posts?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const text = await response.text();
      // console.log("Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.log("Invalid JSON from server");
        return;
      }
      setCustomerJobs(data.posts || []);

    } catch (error) {
      console.log(error);
    }
  };

  const refreshRequests = async () => {
    await fetchCustomerJobs();
  };

  useEffect(() => {
    if (toggleMode === "Create Work Post") {
      fetchWorkerPosts();
    } else {
      fetchCustomerJobs();
    }
  }, [toggleMode, selectedService, filters]);

  //TO HANDLE EDIT IN WORKER AVAILABILITY CARD
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowCreateForm(true);
  };

  return (
    <LinearGradient
      colors={["#8159cf", "#65bcf3"]}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf:"flex-start" }}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Customers</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              toggleMode === "Search Customer" && styles.activeToggle
            ]}
            onPress={handleToggle}
          >
            <Text
              style={[
                styles.toggleText,
                toggleMode === "Search Customer" && styles.activeText
              ]}
            >
              Search Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              toggleMode === "Create Work Post" && styles.activeToggle
            ]}
            onPress={handleToggle}
          >
            <Text
              style={[
                styles.toggleText,
                toggleMode === "Create Work Post" && styles.activeText
              ]}
            >
              Create Work Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SERVICE BUTTONS */}
      {toggleMode === "Search Customer" && !showCreateForm && (
        <View style={styles.serviceSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((s) => (
              <TouchableOpacity
                key={s.name}
                style={[
                  styles.serviceBtn,
                  selectedService === s.name && styles.serviceActive
                ]}
                onPress={() => setSelectedService(s.name)}
              >
                <Image source={s.icon} style={styles.serviceIcon} />
                <Text style={styles.serviceText}>{s.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* FILTER BUTTON */}
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="options-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* POSTS SECTION */}
      <View style={styles.postsSection}>

        {/* ================= CREATE WORK POST MODE ================= */}
        {toggleMode === "Create Work Post" && (
          <ScrollView>
            <View style={styles.availabilitySection}>

              {/* SHOW FORM */}
              {showCreateForm ? (
                <CreateWorkPostForm
                  initialData={editingPost}
                  onPostSuccess={() => {
                    setShowCreateForm(false);
                    fetchWorkerPosts();
                  }}
                  onCancel={() => setShowCreateForm(false)}
                />
              ) : (

                <>
                  {/* IF POSTS EXIST */}
                  {workerPosts.length > 0 ? (
                    <>
                      {/* Post Another Button */}
                      <TouchableOpacity
                        style={styles.postAnotherBtn}
                        onPress={() => {
                          setEditingPost(null);
                          setShowCreateForm(true);
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: "600" }}>
                          Post Another Availability
                        </Text>
                      </TouchableOpacity>

                      {/* POSTS LIST */}
                      {workerPosts.map(post => (
                        <WorkerAvailabilityCard
                          key={post._id}
                          post={post}
                          onDeleted={(id) =>
                            setWorkerPosts(prev => prev.filter(p => p._id !== id))
                          }
                          onEdit={handleEdit}
                        />
                      ))}
                    </>
                  ) : (

                    /* IF NO POSTS */
                    <TouchableOpacity
                      onPress={() => {
                        setEditingPost(null);
                        setShowCreateForm(true);
                      }}
                      style={{ alignItems: "center", marginTop: 30 }}
                    >
                      <Text>
                          No job posts yet.{" "}
                          <Text
                            style={styles.linkBtn}
                            onPress={() => {
                              setEditingPost(null);
                              setShowCreateForm(true);
                            }}
                          >
                            Create one?
                          </Text>
                        </Text>
                    </TouchableOpacity>

                   
                  )}
                </>
              )}

            </View>
          </ScrollView>
        )}

        {/* ================= SEARCH CUSTOMER MODE ================= */}
        {toggleMode === "Search Customer" && !showCreateForm && (
          <ScrollView>

            <Text style={styles.sectionTitle}>
              {selectedService}
            </Text>

            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobOfferCard
                  key={job._id}
                  offer={job}
                  refreshRequests={refreshRequests}
                />
              ))
            ) : (
              <Text style={styles.noPosts}>
                No job offers found.
              </Text>
            )}

          </ScrollView>
        )}

      </View>

      {/* FILTER MODAL */}
      <Modal visible={filterVisible} transparent animationType="slide">
        <View style={styles.filterOverlay}>
          <View style={styles.filterBox}>
            <Text style={styles.filterTitle}>Filter</Text>

            <TextInput
              placeholder="Minimum Salary"
              style={styles.input}
              keyboardType="numeric"
              value={filters.minSalary}
              onChangeText={(text) =>
                setFilters({ ...filters, minSalary: text })
              }
            />

            <TextInput
              placeholder="Minimum Experience"
              style={styles.input}
              keyboardType="numeric"
              value={filters.minExperience}
              onChangeText={(text) =>
                setFilters({ ...filters, minExperience: text })
              }
            />

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
};

export default SearchCustomer;