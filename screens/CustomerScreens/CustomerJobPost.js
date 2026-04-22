import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Switch,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/CustomerScreenStyles/CustomerJobPostStyles";

export default function CustomerJobPost() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // 🔑 custom delete modal
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [otherService, setOtherService] = useState("");
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("");
  const [duration, setDuration] = useState("");
  const [jobPosted, setJobPosted] = useState(null);

  const navigation = useNavigation();

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(floatAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [modalVisible, jobPosted]);

  const resetForm = () => {
    setName("");
    setContact("");
    setService("");
    setOtherService("");
    setPayment("");
    setAddress("");
    setDuration("");
  };

  const handlePostJob = () => {
    if (!name || !contact || (!service && !otherService) || !payment || !address || !duration) {
      // instead of Alert, just skip (or you can make another modal if needed)
      return;
    }

    if (isEditing && jobPosted) {
      // update job
      setJobPosted({
        ...jobPosted,
        name,
        contact,
        service: service === "Other" ? otherService : service,
        payment,
        address,
        duration,
      });
    } else {
      // create job
      setJobPosted({
        name,
        contact,
        service: service === "Other" ? otherService : service,
        payment,
        address,
        duration,
        available: true,
        rating: 4.5,
      });
    }

    setModalVisible(false);
    setIsEditing(false);
    resetForm();
  };

  const toggleAvailability = () => {
    setJobPosted({ ...jobPosted, available: !jobPosted.available });
  };

  const confirmDelete = () => {
    setDeleteModalVisible(true); // open our custom modal
  };

  const handleDelete = () => {
    setJobPosted(null);
    setIsEditing(false);
    resetForm();
    floatAnim.setValue(0);
    setDeleteModalVisible(false);
  };

  const startEditing = () => {
    if (jobPosted) {
      setIsEditing(true);
      setName(jobPosted.name);
      setContact(jobPosted.contact);
      setService(jobPosted.service);
      setOtherService(jobPosted.service);
      setPayment(jobPosted.payment);
      setAddress(jobPosted.address);
      setDuration(jobPosted.duration);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Placeholder when no job is posted */}
      {!jobPosted && (
        <View style={{ alignItems: "flex-start" }}>
          <Image
            source={require("../../assets/postimage.jpg")}
            style={{
              width: 180,
              height: 180,
              alignSelf: "center",
              resizeMode: "contain",
              marginVertical: 0,
              margin: 0,
              padding: 0,
            }}
          />
          <TouchableOpacity
            style={styles.postButton}
            // onPress={() => {
            //   resetForm();
            //   setIsEditing(false);
            //   setModalVisible(true);
            // }}
            onPress={() =>
              navigation.navigate('HiringStack', {
                screen: 'HireMain',
              })
            }
          >
            <Text style={styles.postButtonText} 
              // onPress={() =>
              //   navigation.navigate('HiringStack', {
              //     screen: 'CreateJobPostForm',
              //   })
              // }
            >Post Your Job</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Modal Form */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalCard,
              {
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
                opacity: floatAnim,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => {
                setModalVisible(false);
                setIsEditing(false);
                resetForm();
              }}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Update Job Post" : "Create Job Post"}
              </Text>

              {/* Form fields */}
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />

              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
                placeholder="Enter contact number"
              />

              <Text style={styles.label}>Service</Text>
              <Picker
                selectedValue={service}
                onValueChange={(itemValue) => setService(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Service" value="" />
                <Picker.Item label="Plumber" value="Plumber" />
                <Picker.Item label="Electrician" value="Electrician" />
                <Picker.Item label="Carpenter" value="Carpenter" />
                <Picker.Item label="Painter" value="Painter" />
                <Picker.Item label="Other" value="Other" />
              </Picker>

              {service === "Other" && (
                <>
                  <Text style={styles.label}>Other Service</Text>
                  <TextInput
                    style={styles.input}
                    value={otherService}
                    onChangeText={setOtherService}
                    placeholder="Enter other service"
                  />
                </>
              )}

              <Text style={styles.label}>Payment</Text>
              <Picker
                selectedValue={payment}
                onValueChange={(itemValue) => setPayment(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Payment" value="" />
                <Picker.Item label="₹500" value="500" />
                <Picker.Item label="₹1000" value="1000" />
                <Picker.Item label="As per Work" value="As per Work" />
              </Picker>

              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
              />

              <Text style={styles.label}>Duration</Text>
              <Picker
                selectedValue={duration}
                onValueChange={(itemValue) => setDuration(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Duration" value="" />
                <Picker.Item label="Per Day" value="Per Day" />
                <Picker.Item label="12 Hours" value="12 Hours" />
                <Picker.Item label="Per Hour" value="Per Hour" />
                <Picker.Item label="Long Term" value="Long Term" />
              </Picker>

              <TouchableOpacity style={styles.submitButton} onPress={handlePostJob}>
                <Text style={styles.submitText}>
                  {isEditing ? "Update Job" : "Post Job"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* Job Card */}
      {jobPosted && (
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: jobPosted.available ? "#E8F5E9" : "#FDECEA",
              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
              opacity: floatAnim,
            },
          ]}
        >
          {/* Rating Section */}
          <View style={{ 
            position: "absolute", 
            top: 8, 
            right: 8, 
            flexDirection: "row", 
            alignItems: "center",
            backgroundColor: "white",   // optional: make it stand out
            borderRadius: 12, 
            paddingHorizontal: 6, 
            paddingVertical: 2,
            elevation: 2                // small shadow (Android)
          }}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: "600", color: "#333" }}>
              {jobPosted.rating}
            </Text>
          </View>



          <View style={styles.cardContent}>
            <Image
              source={require("../../assets/man2.jpg")}
              style={styles.profileImage}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{jobPosted.name}</Text>
              <Text>
                <Ionicons name="call" size={14} color="#333" /> {jobPosted.contact}
              </Text>
              <Text>
                <MaterialIcons name="home-repair-service" size={14} color="#6A0DAD" />{" "}
                {jobPosted.service}
              </Text>
              <Text>
                <FontAwesome5 name="money-bill-wave" size={14} color="green" /> ₹
                {jobPosted.payment}
              </Text>
              <Text>
                <Ionicons name="location" size={14} color="#333" /> {jobPosted.address}
              </Text>
              <Text>
                <Ionicons name="time" size={14} color="#333" /> {jobPosted.duration}
              </Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <View style={styles.toggleContainer}>
              <Text style={{ color: jobPosted.available ? "green" : "red" }}>
                {jobPosted.available ? "Available" : "Unavailable"}
              </Text>
              <Switch
                value={jobPosted.available}
                onValueChange={toggleAvailability}
                trackColor={{ false: "#FF8A80", true: "#A5D6A7" }}
                thumbColor={jobPosted.available ? "green" : "red"}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity onPress={startEditing}>
                <MaterialIcons name="edit" size={26} color="#6A0DAD" />
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmDelete}>
                <MaterialIcons name="delete" size={26} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Custom Delete Confirmation Modal */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 12,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Delete Job
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Are you sure you want to delete this job?
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 16 }}>
              <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
                <Text style={{ color: "blue", fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete}>
                <Text style={{ color: "red", fontSize: 16 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
