import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
// import * as Location from "expo-location";
import styles from "../WorkerComponentStyles/CreateWorkPostFormStyles"

const BASE_URL = "http://10.0.2.2:5000";

const services = [
  "Plumber", "Electrician", "Cook", "House Cleaning",
  "Driver", "Washerman", "Mason", "Painter", "Carpenter"
];

const CreateWorkPostForm = ({ initialData, onPostSuccess, onCancel }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name:"",
    service: "",
    address: "",
    phone: "",
    date: "",
    budget: "",
    experience: "",
    requirements: ""
  });

  const [loading, setLoading] = useState(false);

  //For dynamic date picking
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.service || !formData.budget || !formData.experience || !selectedDate) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }

      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Please login again");
        setLoading(false);
        return;
      }

      const url = isEdit
        ? `${BASE_URL}/api/worker-posts/${editingId}`
        : `${BASE_URL}/api/worker-posts`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          service: formData.service,
          expectedSalaryPerDay: Number(formData.budget),
          experienceYears: Number(formData.experience),
          availableFrom: selectedDate.toISOString(),
          phone: formData.phone,
          address: formData.address,
          additionalInfo: formData.requirements
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        return Alert.alert("Error", data.message);
      }

      Alert.alert(
        "Success",
        isEdit ? "Availability updated successfully" : "Availability posted successfully"
      );

      if (onPostSuccess) {
        onPostSuccess(data.post);
      }

      resetForm();

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Server error");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token");

    await fetch(`${BASE_URL}/api/worker-posts/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      service: "",
      address: "",
      phone: "",
      date: "",
      budget: "",
      experience: "",
      requirements: ""
    });

    setIsEdit(false);
    setEditingId(null);

    if (onCancel) onCancel();
  };

  useEffect(() => {
    if (initialData) {

      setFormData({
        name: initialData.name || "",
        service: initialData.service || "",
        address: initialData.address || "",
        phone: initialData.phone || "",
        date: initialData.availableFrom || "",
        budget: initialData.expectedSalaryPerDay
          ? String(initialData.expectedSalaryPerDay)
          : "",
        experience: initialData.experienceYears
          ? String(initialData.experienceYears)
          : "",
        requirements: initialData.additionalInfo || ""
      });

      if (initialData.availableFrom) {
        setSelectedDate(new Date(initialData.availableFrom));
      }

      setEditingId(initialData._id);
      setIsEdit(true);
    }
  }, [initialData]);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Create Availability</Text>

      {/* {services.map((s) => (
        <TouchableOpacity
          key={s}
          style={[
            styles.serviceBtn,
            formData.service === s && styles.activeService
          ]}
          onPress={() => handleChange("service", s)}
        >
          <Text>{s}</Text>
        </TouchableOpacity>
      ))} */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <Picker
        selectedValue={formData.service}
        onValueChange={(value) => handleChange("service", value)}
        style={styles.input}
      >
        <Picker.Item label="Select Service" value="" />
        {services.map(s => (
          <Picker.Item key={s} label={s} value={s} />
        ))}
      </Picker>

      <TextInput
        placeholder="Full Address"
        style={styles.input}
        value={formData.address}
        onChangeText={(text) => handleChange("address", text)}
      />

      <TextInput
        placeholder="Phone"
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleChange("phone", text)}
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
        placeholder="Expected Salary Per Day"
        style={styles.input}
        keyboardType="numeric"
        value={formData.budget}
        onChangeText={(text) => handleChange("budget", text)}
      />

      <TextInput
        placeholder="Experience (years)"
        style={styles.input}
        keyboardType="numeric"
        value={formData.experience}
        onChangeText={(text) => handleChange("experience", text)}
      />

      <TextInput
        placeholder="Additional Info"
        style={styles.input}
        value={formData.requirements}
        onChangeText={(text) => handleChange("requirements", text)}
      />
      <View style={styles.formActions}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            {isEdit ? "Update" : "Post"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetForm} style={styles.cancelBtn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {loading ? "Posting..." : "Post Availability"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={onCancel}
      >
        <Text style={{ color: "white" }}>
          Cancel
        </Text>
      </TouchableOpacity> */}

    </View>
  );
};

export default CreateWorkPostForm;