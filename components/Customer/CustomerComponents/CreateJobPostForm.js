// components/ComponentScreens/CreateJobPostForm.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Image
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../CustomerComponentStyles/CreateJobPostFormStyles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { startChat } from "../../Marketplace/MarketplaceComponents/startChat";
import BASE_URL from "../../../utils/api";

// const BASE_URL = "http://10.0.2.2:5000";

const services = [
  "Plumber", "Electrician", "Cook", "House Cleaning",
  "Driver", "Washerman", "Mason", "Painting", "Carpenter"
];

const STORAGE_KEY = "user-job-posts";

const CreateJobPostForm = () => {
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    address: "",
    phone: "",
    date: "",
    description: "",
    budget: "",
    additionalRequirements: ""
  });

  const [jobPosts, setJobPosts] = useState([]);

  //For dynamic date picking
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());



  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const url = isEdit
        ? `${BASE_URL}/api/customer-posts/${editingId}`
        : `${BASE_URL}/api/customer-posts`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceNeeded: formData.service,
          phone: formData.phone,
          dateOfService: selectedDate,
          durationDays: 1,
          description: formData.description,
          budgetPerDay: Number(formData.budget),
          additionalRequirements: formData.additionalRequirements,
          coordinates: [78.4867, 17.385],
          address: formData.address
        })
      });

      const data = await response.json();
      

      if (!response.ok) {
        return Alert.alert("Error", data.message);
      }

      Alert.alert(
        "Success",
        isEdit ? "Job updated successfully" : "Job posted successfully"
      );

      fetchMyPosts();
      resetForm();

    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/customer-posts/mine`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      setJobPosts(data.posts || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      service: "",
      address: "",
      phone: "",
      date: "",
      description: "",
      budget: "",
      additionalRequirements: ""
    });
    setIsEdit(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (job) => {
    setFormData({
      name: job.customerName,
      service: job.serviceNeeded,
      address: job.address,
      phone: job.phone,
      date: job.dateOfService,
      description: job.description,
      budget: job.budgetPerDay,
      additionalRequirements: job.additionalRequirements
    });
    setEditingId(job._id);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleCancel = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              await fetch(
                `${BASE_URL}/api/customer-posts/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );

              fetchMyPosts();

            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
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
    <ScrollView style={styles.createJobSection}>
      {showForm && (
        <View style={styles.createJobFormContainer}>
          <Text style={styles.formTitle}>
            {isEdit ? "Edit Job Post" : "Create Job Post"}
          </Text>

          <TextInput
            placeholder="Customer Name"
            placeholderTextColor="#353333"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            style={styles.input}
          />

          <Picker
            selectedValue={formData.service}
            onValueChange={(value) => handleChange("service", value)}
            style={styles.input}
          >
            <Picker.Item label="Select Service" value="" color="#353333"/>
            {services.map(s => (
              <Picker.Item key={s} label={s} value={s} color="#353333"/>
            ))}
          </Picker>

          <TextInput
            placeholder="Full Address"
            placeholderTextColor="#353333"
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#353333"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
            placeholder="Date, you need service from"
          >
            <Text>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-IN")
                : "Select Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setSelectedDate(date);
                  handleChange("date", date);
                }
              }}
            />
          )}

          <TextInput
            placeholder="Job Description"
            placeholderTextColor="#353333"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            style={[styles.input, { height: 80 }]}
            multiline
          />

          <TextInput
            placeholder="Budget per day (numbers only)"
            placeholderTextColor="#353333"
            value={formData.budget}
            onChangeText={(text) => handleChange("budget", text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Additional Requirements (optional)"
            placeholderTextColor="#353333"
            value={formData.additionalRequirements}
            onChangeText={(text) => handleChange("additionalRequirements", text)}
            style={[styles.input, { height: 60 }]}
            multiline
          />

          <View style={styles.formActions}>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {isEdit ? "Update" : "Post Job"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resetForm} style={styles.cancelBtn}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!showForm && jobPosts.length > 0 && (
        <View style={styles.postAnotherContainer}>
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            style={styles.postAnotherBtn}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Post Another Job
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {jobPosts.length > 0 &&
        jobPosts.map(job => (
          <View key={job._id} style={styles.jobPostCard}>
            <TouchableOpacity
              onPress={() => Alert.alert("Customer Profile")}
              style={styles.userProfile}
            >
              <Image
                source={
                  job?.profileImage
                    ? { uri: job.profileImage }
                    : require("../../../assets/default-profile.jpg")
                }
                style={styles.userProfileImage}
              />
              <Text style={styles.userProfileName}>{job.customerName}</Text>
            </TouchableOpacity>

            <View style={styles.jobDetails}>
              <View style={styles.jobInfoText}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>{job.serviceNeeded}</Text> •{" "}
                  {new Date(job.dateOfService).toLocaleDateString("en-IN")}
                </Text>
                <Text style={styles.addressText}>{job.address}</Text>
                <Text style={styles.descriptionText}>{job.description}</Text>
                <Text style={styles.budgetText}>
                  Budget: ₹<Text style={{ fontWeight: "bold" }}>{job.budgetPerDay}</Text>
                </Text>
                {job.additionalRequirements && (
                  <Text style={styles.requirementsText}>
                    Extra: {job.additionalRequirements}
                  </Text>
                )}
                <Text
                  style={styles.phoneText}
                  onPress={() =>
                    job.phone && Linking.openURL(`tel:${job.phone}`)
                  }
                >
                  {job.phone}
                </Text>
              </View>

              <View style={styles.jobActions}>
                {/* <TouchableOpacity
                  onPress={() => toggleStatus(job._id)}
                  style={[
                    styles.statusBtn,
                    job.status.toLowerCase() === "pending"
                      ? styles.statusPending
                      : styles.statusAccepted
                  ]}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    {job.status}
                  </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => handleEdit(job)}
                  style={styles.editBtn}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewRequestsBtn}
                  onPress={() =>
                    navigation.navigate("RequestsForMyPost", {
                      postId: job._id,
                      postType: "CustomerPost"
                    })
                  }
                >
                  <Text style={{ color: "#fff" }}>View Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCancel(job._id)}
                  style={styles.cancelBtnSmall}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                {/* CHAT */}
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        ))}

      {jobPosts.length === 0 && !showForm && (
        <View style={styles.noPosts}>
          <Text>
            No job posts yet.{" "}
            <Text
              style={styles.linkBtn}
              onPress={() => setShowForm(true)}
            >
              Create one?
            </Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CreateJobPostForm;
