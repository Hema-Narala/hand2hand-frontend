import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/CustomerScreenStyles/CustomerProfileStyles";
import BASE_URL from "../../utils/api";

// const BASE_URL = "https://hand2hand-backend.onrender.com";
// const BASE_URL = "http://10.0.2.2:5000";

// const BASE_URL = __DEV__
//     ? "http://10.0.2.2:5000"
//     : "https://hand2hand-backend.onrender.com";
    
 console.log("API BASE URL:", BASE_URL);

const STORAGE_KEY = "SAVED_WORKERS";

const CustomerProfileScreen = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [statsData, setStatsData] = useState(null);

  const [savedWorkers, setSavedWorkers] = useState([]);
  const [showAddressFields, setShowAddressFields] = useState(false);

  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    
    // require("../../assets/default-profile.jpg")
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    addressDetails: {
      country: "",
      pincode: "",
      state: "",
      district: "",
      mandal: "",
      village: "",
      street: "",
      landmark: "",
      house: ""
    }
  });

  const stats = [
    { label: "Jobs Booked", value: statsData?.jobsBooked || 0 },
    { label: "Active Jobs", value: statsData?.activeJobs || 0 },
    { label: "Saved Workers", value: statsData?.savedWorkers || 0 },
    { label: "Total Spent", value: `₹${statsData?.totalSpent || 0}` }
  ];

  const savedWorker = [
    {
      id: "1",
      name: "Ramesh Kumar",
      profession: "Electrician",
      rating: "4.6",
      charge: "₹800 / day",
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: "2",
      name: "Suresh Naik",
      profession: "Plumber",
      rating: "4.4",
      charge: "₹600 / day",
      image: "https://i.pravatar.cc/150?img=22"
    }
  ];


  /* ---------------- SAVE PROFILE TO BACKEND ---------------- */
const handleSaveProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const updatedForm = {
      ...form,
      address: buildAddressString()
    };

    const res = await fetch(`${BASE_URL}/customerprofile/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedForm)
    });

    const data = await res.json();

    if (res.ok) {
      setForm(data);   // update UI with backend response
      setIsEditing(false);

      // ✅ ADD THIS (VERY IMPORTANT)
      const existing = JSON.parse(await AsyncStorage.getItem("user"));

      const updatedUser = {
        ...existing,
        firstname: data.name || existing.firstname
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    }
    else {
      console.log("Save failed:", data.message);
    }

  } catch (err) {
    console.error("Save error:", err);
  }
};


  /* ---------------- UTIL ---------------- */
  const buildAddressString = () => {
    const a = form.addressDetails;
    return [
      a.house,
      a.street,
      a.village,
      a.mandal,
      a.district,
      a.state,
      a.pincode,
      a.country
    ]
      .filter(Boolean)
      .join(", ");
  };

  /* ---------------- LOAD SAVED WORKERS ---------------- */
  useEffect(() => {
    const loadSavedWorkers = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setSavedWorkers(JSON.parse(stored));
    };
    loadSavedWorkers();
  }, []);

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/customerprofile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok && data) {
          if (data.profileImage) {
            setProfileImage(data.profileImage || null);
          }

          setForm((prev) => ({
            ...prev,
            ...data,
            addressDetails: data.addressDetails || prev.addressDetails
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  /* ---------------- IMAGE PICKER ---------------- */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const formData = new FormData();
      formData.append("image", {
        uri,
        type: result.assets[0].mimeType || "image/jpeg",
        name: `profile.${uri.split(".").pop() || "jpg"}`
      });

      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/customerprofile/image`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });

        // const data = await res.json();

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.log("Non-JSON response:", text);
          return;
        }

        if (res.ok && data.profileImage) {
          setProfileImage(data.profileImage || null);
        } else {
          console.log("Upload failed:", data);
        }

      } catch (err) {
        console.error("Image upload error:", err);
      }
    }
  };

  /* ---------------- STATS UPDATE ---------------- */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/profile/customer-stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setStatsData(data);
        } else {
          console.log("Stats error:", data.message);
        }
      } catch (err) {
        console.log("Stats fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  /* ---------------- SAVE / UNSAVE ---------------- */
  const toggleSaveWorker = async (worker) => {
    const exists = savedWorkers.some((w) => w.id === worker.id);
    const updated = exists
      ? savedWorkers.filter((w) => w.id !== worker.id)
      : [...savedWorkers, worker];

    setSavedWorkers(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
        <View>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your account details</Text>
        </View>
        <TouchableOpacity 
          style={styles.rightSection} 
          // onPress={() => navigation.navigate('HireMain')}
          onPress={() =>
            navigation.navigate('Landing')
          }
          // onPress={() => console.log("LevelStack Pressed")}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={26} color="#fff" marginLeft="55" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage && typeof profileImage === "string"
                ? { uri: profileImage }
                : require("../../assets/default-profile.jpg")
            }
            style={styles.profileImage}
          />
          <Ionicons name="camera" size={18} style={styles.cameraIcon} />
        </TouchableOpacity>

        {!isEditing ? (
          <>
            <Text style={styles.name}>{form.name || "USER NAME"}</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Customer</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Feather name="phone" size={16} />
                <Text style={styles.infoText}>{form.phone|| "Edit and add mobile number"}</Text>
              </View>

              <View style={styles.infoRow}>
                <Feather name="mail" size={16} />
                <Text style={styles.infoText}>{form.email || "Edit and add your mail id"}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={16} />
                <Text style={styles.infoText}>
                  {form.address || "Add address"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => {
                setIsEditing(true);
                setShowAddressFields(false);
              }}
            >
              <Feather name="edit-2" size={16} />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={form.name}
              placeholder="Enter Name"
              onChangeText={(t) => setForm({ ...form, name: t })}
            />
            <TextInput
              style={styles.input}
              value={form.phone}
              placeholder="Enter Mobile number"
              onChangeText={(t) => setForm({ ...form, phone: t })}
            />
            <TextInput
              style={styles.input}
              value={form.email}
              placeholder="Enter Mail id"
              onChangeText={(t) => setForm({ ...form, email: t })}
            />

            <TouchableOpacity
              onPress={() => setShowAddressFields((p) => !p)}
              style={{ marginBottom: 10 }}
            >
              <Text style={{ color: "#007bff" }}>
                {showAddressFields
                  ? "Hide detailed address ▲"
                  : "Add detailed address ▼"}
              </Text>
            </TouchableOpacity>

            {showAddressFields &&
              Object.entries(form.addressDetails).map(([key, value]) => (
                <TextInput
                  key={key}
                  style={styles.input}
                  placeholder={key}
                  value={value}
                  onChangeText={(t) =>
                    setForm({
                      ...form,
                      addressDetails: { ...form.addressDetails, [key]: t }
                    })
                  }
                />
              ))}

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Stats */}
      {!isEditing && (
        <View style={styles.statsBox}>
          {stats.map((item, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Wallet */}
      {/* {!isEditing && (
        <View style={styles.walletCard}>
          <Text style={styles.walletTitle}>Wallet & Rewards</Text>
          <Text style={styles.walletAmount}>₹120</Text>
          <Text style={styles.walletPoints}>⭐ 240 Reward Points</Text>
        </View>
      )} */}

      {/* Saved Workers */}
      {/* {!isEditing && (
        <View style={styles.section}>
          <FlatList
            data={savedWorker}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.workerCard}>
                <TouchableOpacity
                  style={styles.saveIcon}
                  onPress={() => toggleSaveWorker(item)}
                >
                  <Ionicons name="bookmark" size={20} color="#ff9800" />
                </TouchableOpacity>
                <Image source={{ uri: item.image }} style={styles.workerImage} />
                <Text style={styles.workerName}>{item.name}</Text>
                <Text style={styles.workerJob}>{item.profession}</Text>
                <Text style={styles.workerRating}>⭐ {item.rating}</Text>
                <Text style={styles.workerCharge}>{item.charge}</Text>
              </View>
            )}
          />
        </View>
      )} */}

      {/* Preferences */}
      {/* {!isEditing && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.prefRow}>
            <FontAwesome name="star" size={16} color="#f4a261" />
            <Text style={styles.prefText}>Electrician, Plumber</Text>
          </View>
        </View>
      )} */}
    </ScrollView>
  );
};

export default CustomerProfileScreen;
