import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Card from "../../components/Customer/CustomerComponents/Card";
import AppButton from "../../components/Customer/CustomerComponents/AppButton";
import AppInput from "../../components/Customer/CustomerComponents/AppInput";
import Header from "../../components/Customer/CustomerComponents/Header";

import styles from "../../styles/CustomerScreenStyles/SellScreenStyles";

const initialListings = [
  {
    id: 1,
    title: "Construction Sand (10 bags)",
    price: "$50",
    quantity: 10,
    location: "Downtown",
    image: require("../../assets/carousel4.png"),
  },
  {
    id: 2,
    title: "Power Tools Set",
    price: "$150",
    quantity: 1,
    location: "Suburb",
    image: require("../../assets/carousel4.png"),
  },
];

export default function SellScreen({ navigation }) {
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState(initialListings);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    location: "",
  });

  /* ================= IMAGE PICKER ================= */
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to upload images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* ================= ADD / UPDATE ================= */
  const handleAddOrUpdateListing = () => {
    if (!formData.title || !formData.price) return;

    if (editingId) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...formData, image: image || item.image }
            : item
        )
      );
    } else {
      const newListing = {
        id: Date.now(),
        ...formData,
        image: image || require("../../assets/carousel4.png"),
      };
      setListings([newListing, ...listings]);
    }

    resetForm();
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description || "",
      price: item.price,
      quantity: item.quantity,
      location: item.location,
    });
    setImage(typeof item.image === "string" ? item.image : null);
    setEditingId(item.id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      quantity: "",
      location: "",
    });
    setImage(null);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Sell Items"
        subtitle="Sell tools, materials and equipment"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.section}>
        {/* ================= STATS ================= */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={styles.iconBox}>
              <Ionicons name="cube-outline" size={22} color="#6C63FF" />
            </View>
            <View>
              <Text style={styles.statLabel}>Active Listings</Text>
              <Text style={styles.statValue}>{listings.length}</Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <View style={styles.iconBox}>
              <MaterialIcons name="currency-rupee" size={22} color="#6C63FF" />
            </View>
            <View>
              <Text style={styles.statLabel}>Total Value</Text>
              <Text style={styles.statValue}>₹200</Text>
            </View>
          </View>
        </View>

        {/* ================= ADD BUTTON ================= */}
        {!showForm && (
          <AppButton
            title="+ Add New Listing"
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => setShowForm(true)}
          />
        )}

        {/* ================= FORM ================= */}
        {showForm && (
          <View style={styles.formCard}>
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={32}
                    color="#6B7280"
                  />
                  <Text style={styles.uploadText}>
                    Click to upload product images
                  </Text>
                  <Text style={styles.uploadHint}>PNG, JPG up to 10MB</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Product Name</Text>
            <AppInput
              placeholder={"Enter product name"}
              style={styles.input}
              value={formData.title}
              onChangeText={(v) => setFormData({ ...formData, title: v })}
            />

            <Text style={styles.label}>Seller</Text>
            <AppInput
              placeholder={"Enter seller name"}
              style={styles.input}
              value={formData.title}
              onChangeText={(v) => setFormData({ ...formData, title: v })}
            />

            <Text style={styles.label}>Description</Text>
            <AppInput
              multiline
              placeholder={"Enter 2 words only"}
              style={styles.textArea}
              value={formData.description}
              onChangeText={(v) =>
                setFormData({ ...formData, description: v })
              }
            />

            <Text style={styles.label}>Price</Text>
            <AppInput
              placeholder={"eg:500"}
              style={styles.input}
              value={formData.price}
              onChangeText={(v) => setFormData({ ...formData, price: v })}
            />

            <Text style={styles.label}>Quantity</Text>
            <AppInput
              placeholder={"eg:10"}
              style={styles.input}
              value={formData.quantity}
              onChangeText={(v) => setFormData({ ...formData, quantity: v })}
            />

            <Text style={styles.label}>Location :</Text>
            <AppInput
              placeholder={"eg:Downtown"}
              style={styles.input}
              value={formData.location}
              onChangeText={(v) => setFormData({ ...formData, location: v })}
            />

            <AppButton
              title={editingId ? "Update Listing" : "Publish Listing"}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={handleAddOrUpdateListing}
            />

            <AppButton
              title="Cancel"
              style={[styles.button, { backgroundColor: "#ddd" }]}
              textStyle={{ color: "#000"  }}
              onPress={resetForm}
            />
          </View>
        )}

        {/* ================= LISTINGS ================= */}
        <Text style={styles.myListings}>My Listings</Text>

        {listings.map((item) => (
          <View key={item.id} style={styles.listingCard}>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.listingImage}
            />

            <View style={styles.listingBody}>
              <View style={styles.listingTop}>
                <View>
                  <Text style={styles.listingTitle}>{item.title}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color="#6B7280"
                    />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.qty}>Qty: {item.quantity}</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => handleEdit(item)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={{ color: "#fff" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
