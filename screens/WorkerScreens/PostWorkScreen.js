import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";

import styles from "../../styles/WorkerScreenStyles/PostWorkStyles";
import JobPostCard from "../../components/Customer/CustomerComponents/JobPostCard";
import CreateJobPostForm from "../../components/Customer/CustomerComponents/CreateJobPostForm";

import { Ionicons } from "@expo/vector-icons";

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

// SAMPLE DATA
const sampleJobPosts = [
  { id: 1, service: "Plumber", name: "Ravi Kumar", image: "https://i.pravatar.cc/150?img=1", price: "₹300/hr", phone: "9876543210", whatsapp: "9876543210" },
  { id: 2, service: "Plumber", name: "Ajay Singh", image: "https://i.pravatar.cc/150?img=2", price: "₹350/hr", phone: "9123456789", whatsapp: null },
  { id: 3, service: "Cook", name: "Priya Sharma", image: "https://i.pravatar.cc/150?img=3", price: "₹500/day", phone: "9988776655", whatsapp: "9988776655" },
  { id: 4, service: "Cook", name: "Anita Reddy", image: "https://i.pravatar.cc/150?img=4", price: "₹450/day", phone: "8899776655", whatsapp: "8899776655" },
  { id: 5, service: "Carpenter", name: "Vikram Singh", image: "https://i.pravatar.cc/150?img=5", price: "₹1000/day", phone: "7788990011", whatsapp: null },
  { id: 6, service: "Carpenter", name: "Mohan Lal", image: "https://i.pravatar.cc/150?img=6", price: "₹900/day", phone: "6677889900", whatsapp: "6677889900" },
  { id: 7, service: "House Cleaning", name: "Sita Devi", image: "https://i.pravatar.cc/150?img=7", price: "₹400/hr", phone: "5566778899", whatsapp: "5566778899" },
  { id: 8, service: "House Cleaning", name: "Laxmi Bai", image: "https://i.pravatar.cc/150?img=8", price: "₹380/hr", phone: "4455667788", whatsapp: null },
  { id: 9, service: "Painting", name: "Rahul Verma", image: "https://i.pravatar.cc/150?img=9", price: "₹800/day", phone: "3344556677", whatsapp: "3344556677" },
  { id: 10, service: "Painting", name: "Kiran Joshi", image: "https://i.pravatar.cc/150?img=10", price: "₹750/day", phone: "2233445566", whatsapp: null },
];

// GROUP BY SERVICE
const groupedPosts = sampleJobPosts.reduce((acc, post) => {
  if (!acc[post.service]) acc[post.service] = [];
  acc[post.service].push(post);
  return acc;
}, {});

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

const PostWorkScreen = ({ navigation }) => {
  const [toggleMode, setToggleMode] = useState("Search Customer");
  const [selectedService, setSelectedService] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    address: "",
    phone: "",
    date: "",
    description: "",
    budget: "",
    requirements: "",
    status: "Pending",
    id: null,
  });

  const scrollRef = useRef(null);

  const handleToggle = () => {
    const newMode =
      toggleMode === "Search Customer" ? "Create Work Post" : "Search Customer";
    setToggleMode(newMode);
    setShowCreateForm(newMode === "Create Work Post");
    if (newMode === "Create Work Post") resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      service: "",
      address: "",
      phone: "",
      date: "",
      description: "",
      budget: "",
      requirements: "",
      status: "Pending",
      id: null,
    });
  };

  const handleSubmit = () => {
    const newJob = {
      ...formData,
      id: formData.id || Date.now(),
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };

    if (formData.id) {
      setJobPosts(jobPosts.map(j => j.id === formData.id ? newJob : j));
    } else {
      setJobPosts([...jobPosts, newJob]);
    }

    resetForm();
    setShowCreateForm(false);
    setToggleMode("Search Customer");
  };

  const handleEdit = (job) => {
    setFormData(job);
    setShowCreateForm(true);
    setToggleMode("Create Work Post");
  };

  const handleCancel = (id) => {
    setJobPosts(jobPosts.filter(j => j.id !== id));
  };

  const toggleStatus = (id) => {
    setJobPosts(jobPosts.map(j =>
      j.id === id
        ? { ...j, status: j.status === "Pending" ? "Accepted" : "Pending" }
        : j
    ));
  };

  const filteredPosts =
    selectedService === "All"
      ? Object.values(groupedPosts).flat()
      : groupedPosts[selectedService] || [];

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="white" />
      </Pressable>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Customers</Text>

        <View style={styles.toggleContainer}>
          <Pressable
            style={[
              styles.toggleBtn,
              toggleMode === "Search Customer" && styles.activeToggle,
            ]}
            onPress={handleToggle}
          >
            <Text>Search Customer</Text>
          </Pressable>

          <Pressable
            style={[
              styles.toggleBtn,
              toggleMode === "Create Work Post" && styles.activeToggle,
            ]}
            onPress={handleToggle}
          >
            <Text>Create Work Post</Text>
          </Pressable>
        </View>
      </View>

      {/* SERVICES */}
      {!showCreateForm && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.servicesScroll}
        >
          {services.map(service => (
            <Pressable
              key={service.name}
              style={[
                styles.serviceBtn,
                selectedService === service.name && styles.activeService,
              ]}
              onPress={() => setSelectedService(service.name)}
            >
              <Image source={service.icon} style={styles.serviceIcon} />
              <Text>{service.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* CONTENT */}
      {/* <ScrollView>
        {showCreateForm ? (
          <CreateJobPostForm
            formData={formData}
            onChange={(field, value) =>
              setFormData(prev => ({ ...prev, [field]: value }))
            }
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEdit={!!formData.id}
          />
        ) : (
          <>
            <Text style={styles.sectionTitle}>{selectedService} Workers</Text>

            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <JobPostCard key={post.id} post={post} />
              ))
            ) : (
              <Text style={styles.noPosts}>No workers found.</Text>
            )}

            {jobPosts.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Your Job Posts</Text>

                {jobPosts.map(job => (
                  <View key={job.id} style={styles.userJobCard}>
                    <Image source={{ uri: job.image }} style={styles.userJobImage} />

                    <View style={styles.userJobDetails}>
                      <Text><Text style={{ fontWeight: "bold" }}>{job.service}</Text></Text>
                      <Text>
                        {new Date(job.date).toLocaleDateString("en-IN")}
                      </Text>
                      <Text>
                        {job.name} •{" "}
                        <Text
                          style={styles.link}
                          onPress={() => Linking.openURL(`tel:${job.phone}`)}
                        >
                          {job.phone}
                        </Text>
                      </Text>

                      <View style={styles.actionsRow}>
                        <Pressable
                          style={[styles.statusBtn, styles[job.status.toLowerCase()]]}
                          onPress={() => toggleStatus(job.id)}
                        >
                          <Text>{job.status}</Text>
                        </Pressable>

                        <Pressable style={styles.editBtn} onPress={() => handleEdit(job)}>
                          <Text>Edit</Text>
                        </Pressable>

                        <Pressable style={styles.cancelBtn} onPress={() => handleCancel(job.id)}>
                          <Text>Cancel</Text>
                        </Pressable>

                        <Pressable
                          style={styles.whatsappBtn}
                          onPress={() =>
                            Linking.openURL(`https://wa.me/${job.phone}`)
                          }
                        >
                          <Ionicons name="logo-whatsapp" size={18} color="#fff" />
                          <Text>Chat</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView> */}

      {/* CONTENT */}
      <ScrollView>
        {showCreateForm ? (
          <CreateJobPostForm />
        ) : (
          <>
            <Text style={styles.sectionTitle}>{selectedService} Workers</Text>

            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <JobPostCard key={post.id} post={post} />
              ))
            ) : (
              <Text style={styles.noPosts}>No workers found.</Text>
            )}
          </>
        )}
      </ScrollView>

          </View>
        );
      };

export default PostWorkScreen;
