import React, { useState, useEffect  } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import { Video } from "expo-av";
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import BASE_URL from "../../utils/api";

import ExperienceSection from "../../components/Worker/WorkerComponents/ExperienceSection";
import styles from "../../styles/WorkerScreenStyles/WorkerProfileScreenStyles";

// const BASE_URL = __DEV__
//   ? "http://10.0.2.2:5000"
//   : "https://hand2hand-backend.onrender.com";


const WorkerProfileScreen = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState("worker");
  const [statsData, setStatsData] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    bio: "",
    instagram: "",
    facebook: "",
    rating: ""
  });

  const [selectedServices, setSelectedServices] = useState({
    Construction: true,
    Plumbing: true,
    Electrical: true,
    Painting: false,
    Carpentry: false,
    Cooking: false,
    House_Keeping:false,
    Driving: false,
    Laundry: false,
  });

  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const [experienceImages, setExperienceImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const servicesList = Object.keys(selectedServices);

  //to save profile Image
  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const selected = Object.keys(selectedServices).filter(
        key => selectedServices[key]
      );

      const res = await fetch(`${BASE_URL}/workerprofile/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          bio: form.bio,
          services: selected,
          socialLinks: {
            instagram: form.instagram,
            facebook: form.facebook
          }
        })
      });

      const data = await res.json();

      if (res.ok) {
        setIsEditing(false);
        // console.log("Profile saved successfully");
      } else {
        console.log("Save failed:", data);
      }

    } catch (err) {
      console.log("Save error:", err);
    }
  };


  //To load Profile image
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/workerprofile/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok && data  !== null) {
          setForm({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            bio: data.bio || "",
            instagram: data.socialLinks?.instagram || "",
            facebook: data.socialLinks?.facebook || "",
            rating: data.stats?.rating || 0
          });

          if (data.profileImage) {
            setProfileImage(data.profileImage);
          }

          if (data.services) {
            const updatedServices = {};
            data.services.forEach(s => {
              updatedServices[s] = true;
            });
            setSelectedServices(prev => ({ ...prev, ...updatedServices }));
          }

          if (data.experienceMedia) {
            setExperienceImages(data.experienceMedia);
          }
        }

      } catch (err) {
        console.log("Load profile error:", err);
      }
    };

    loadProfile();
  }, []);

  //DYNAMIC STATS UPDATE
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/profile/worker-stats`, {
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


  // 📸 Pick Profile Image
  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const formData = new FormData();
      formData.append("image", {
        uri,
        type: "image/jpeg",
        name: "profile.jpg"
      });

      try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/workerprofile/profile-image`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        const data = await res.json();

        if (res.ok && data.profileImage) {
          setProfileImage(data.profileImage);
        }

      } catch (err) {
        console.log("Image upload error:", err);
      }
    }
  };


  const toggleService = (service) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* 🔹 HEADER (INLINE) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>
            Manage your personal information
          </Text>
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
          <Ionicons name="log-out-outline" size={26} color="#fff" marginLeft="30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 PROFILE CARD */}
      <View style={styles.profileCard}>

        {/* Profile Image */}
        <View>

          {/* Open image in full screen */}
          <TouchableOpacity
            onPress={() => setShowImageModal(true)}
          >
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/default-profile.jpg")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Camera icon -> change image */}
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={pickProfileImage}
          >
            <Ionicons
              name="camera"
              size={16}
              color="#fff"
            />
          </TouchableOpacity>

        </View>

        {!isEditing ? (
          <>
            <Text style={styles.name}>{form.name || "User Name"}</Text>

            <View style={styles.badgeRow}>
              <Text style={styles.badge}>
                {userType === "both" ? "Worker & Customer" : userType}
              </Text>
              <Text style={styles.rating}>
                {/* <FontAwesome name="star" /> {statsData?.rating || 0} */}
                ⭐ {statsData?.rating }
              </Text>
            </View>

            <Text style={styles.bio}>
              {form.bio || "Tell people about your skills and experience here..."}
            </Text>

            <View style={styles.services}>
              {servicesList
                .filter(s => selectedServices[s])
                .map(s => (
                  <Text key={s} style={styles.serviceTag}>{s}</Text>
              ))}
              {/* {servicesList.filter(s => selectedServices[s]).length > 0 ? (
                servicesList
                  .filter(s => selectedServices[s])
                  .map(s => (
                    <Text key={s} style={styles.serviceTag}>{s}</Text>
                  ))
              ) : (
                <Text style={{ color: "#777" }}>
                  No services selected yet
                </Text>
              )} */}
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setIsEditing(true)}
            >
              <Feather name="edit-2" size={16} />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text><Feather name="phone" /> {form.phone || "Edit and add phone number"}</Text>
              <Text><Feather name="mail" />  {form.email || "Edit and add email"}</Text>
              <Text><Ionicons name="location-outline" /> {form.address || "Add address"}</Text>
            </View>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={form.name}
              placeholder="Enter Name"
              placeholderTextColor="#353333"
              onChangeText={t => setForm({ ...form, name: t })}
            />
            <TextInput
              style={styles.input}
              value={form.bio}
              placeholder="Enter your Bio"
              placeholderTextColor="#353333"
              multiline
              onChangeText={t => setForm({ ...form, bio: t })}
            />
            <TextInput
              style={styles.input}
              value={form.phone}
              placeholder="Enter Phone number"
              placeholderTextColor="#353333"
              keyboardType="phone-pad"
              onChangeText={t => setForm({ ...form, phone: t })}
            />

            <TextInput
              style={styles.input}
              value={form.email}
              placeholder="Enter Email"
              placeholderTextColor="#353333"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={t => setForm({ ...form, email: t })}
            />

            <TextInput
              style={styles.input}
              value={form.address}
              placeholder="Address"
              placeholderTextColor="#353333"
              onChangeText={t => setForm({ ...form, address: t })}
            />

            <View style={styles.socialInput}>
              <Ionicons name="logo-instagram" size={20} />
              <TextInput
                style={styles.socialTextInput}
                value={form.instagram}
                placeholder="Instagram username"
                placeholderTextColor="#353333"
                onChangeText={t => setForm({ ...form, instagram: t })}
              />
            </View>

            <View style={styles.socialInput}>
              <Ionicons name="logo-facebook" size={20} />
              <TextInput
                style={styles.socialTextInput}
                value={form.facebook}
                placeholder="Facebook profile"
                placeholderTextColor="#353333"
                onChangeText={t => setForm({ ...form, facebook: t })}
              />
            </View>


            <View style={styles.servicesGrid}>
              {servicesList.map(service => (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.serviceBtn,
                    selectedServices[service] && styles.serviceSelected
                  ]}
                  onPress={() => toggleService(service)}
                >
                  <Text>{service}</Text>
                </TouchableOpacity>
              ))}
            </View>

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

      {/* 🔹 4 Status Box */}
      {!isEditing && (
        <View style={styles.statsBox}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{statsData?.jobsDone || 0}</Text>
                <Text>Jobs Done</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>₹{statsData?.moneyEarnedThisMonth || 0}</Text>
                <Text>This Month</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{statsData?.rating || 0}</Text>
                <Text>Rating</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{statsData?.successRate || 0}%</Text>
                <Text>Success</Text>
            </View>
        </View>
        )}


        {/* 🔹 Social Links */}
        {!isEditing && (form.instagram || form.facebook) && (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Links</Text>

            {form.instagram && (
            <Text style={styles.socialView}>
                <Ionicons name="logo-instagram" size={20} color="#5a2ab9" /> @{form.instagram}
            </Text>
            )}
            {form.facebook && (
            <Text style={styles.socialView}>
                <Ionicons name="logo-facebook" size={20} color="#541ec0"/> {form.facebook}
            </Text>
            )}
        </View>
        )}


 
    {/* 🔹 EXPERIENCE */}

    <View style={styles.section}>
      <ExperienceSection
        images={experienceImages}
        setImages={setExperienceImages}
      />
    </View>
   

      {/* 🔹 Customer Revies */}

      {!isEditing && (
        <View style={styles.section}>
            <Text style={styles.ReviewSectionTitle}>Customer Reviews</Text>

            {/* <View style={styles.reviewCard}>
                <Text style={styles.reviewName}>Michael Chen</Text>
                <Text>⭐⭐⭐⭐⭐</Text>
                <Text style={styles.reviewText}>
                    Excellent work, very professional and on time.
                </Text>
            </View> */}
            {statsData?.reviews?.length > 0 ? (
              statsData.reviews.map((item, index) => (
                <View key={index} style={styles.reviewCard}>
                  
                  {/* Customer Name */}
                  <Text style={styles.reviewName}>
                    {item.customerName} (@{item.customerUsername})
                  </Text>
                  {/* Customer UserName */}
                  {/* <Text style={styles.reviewuserName}>
                    {item.customerUsername}
                  </Text> */}

                  {/* ⭐ Stars */}
                  <Text>
                    {"⭐".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </Text>

                  {/* Review Text */}
                  <Text style={styles.reviewText}>
                    {item.review}
                  </Text>

                </View>
              ))
            ) : (
              <Text style={{ color: "#777" }}>
                No reviews yet
              </Text>
            )}
        </View>
      )}


      {/* 🔹 PROFILE IMAGE MODAL */}
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
              profileImage
                ? { uri: profileImage }
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

export default WorkerProfileScreen;
