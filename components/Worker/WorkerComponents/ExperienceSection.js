import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import BASE_URL from "../../../utils/api";

// const BASE_URL = __DEV__
//   ? "http://10.0.2.2:5000"
//   : "https://hand2hand-backend.onrender.com";

const ExperienceSection = ({ images, setImages }) => {

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1
    });

    if (!result.canceled) {

      try {
        const token = await AsyncStorage.getItem("token");

        const formData = new FormData();

        result.assets.forEach((asset, i) => {
          formData.append("images", {
            uri: asset.uri,
            type: asset.mimeType || "image/jpeg",
            name: asset.fileName || `img_${i}.jpg`
          });
        });

        const res = await fetch(`${BASE_URL}/workerprofile/experience`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        const data = await res.json();

        if (res.ok) {
          setImages(data);
        } else {
          console.log("Upload error:", data);
        }

      } catch (err) {
        console.log("Upload failed:", err);
      }
    }
  };


  const deleteImage = async (url) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/workerprofile/experience`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (res.ok) {
        setImages(data);
      }

    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  console.log("EXPERIENCE IMAGES:", JSON.stringify(images, null, 2));
  return (
    <View style={{ marginTop: 20 }}>

      {/* HEADER */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" , marginBottom:10}}>
        <Text style={{ fontSize: 19, fontWeight: "600" }}>Experience</Text>

        <TouchableOpacity onPress={pickImages}>
          <Text style={{ color: "#6c63ff" }}>+ Add Photos</Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      {images.length === 0 ? (
        <Text style={{ marginVertical: 10, color: "#777" , textAlign:"center"}}>
          Add your experience and works here
        </Text>
      ) : (
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
          gap: 10
        }}>
          {images.map((img, i) => (
            <View key={i} style={{ position: "relative" }}>
              <Image
                source={{ uri: img.url }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10
                }}
              />

              {/* DELETE */}
              <TouchableOpacity
                onPress={() => deleteImage(img.url)}
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "black",
                  borderRadius: 10,
                  padding: 2
                }}
              >
                <Ionicons name="close" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

    </View>
  );
};

export default ExperienceSection;