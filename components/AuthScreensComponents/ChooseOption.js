import React from "react";
import { View, Text, Image, Pressable,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ChooseOptionStyles";

export default function ChooseOption({ 
  title, 
  navigation, 
  workerRoute, 
  customerRoute 
}) {
  return (
    <LinearGradient colors={["#724ebaff", "#6ec5fbff"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.heading}>{title}</Text>

      <View style={styles.row}>
        {/* Worker Card */}
        <View style={styles.card}>
          <Image source={require("../../assets/find work.jpg")} style={styles.image} />
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => navigation.navigate(workerRoute)}  // 👈 dynamic
            // onPress={() => console.log("LoginChoose button pressed")}

          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
                Find Work
              </Text>
            )}
          </Pressable>
        </View>

        {/* Customer Card */}
        <View style={styles.card}>
          <Image source={require("../../assets/find worker.jpg")} style={styles.image} />
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => navigation.navigate(customerRoute)}  // 👈 dynamic
            // onPress={() => console.log("LoginChoose button pressed")}

          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
                Find Worker
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Back Button */}
      {/* <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          { marginTop: 100, alignSelf: "center", width: 70 },
        ]}
        onPress={() => navigation.goBack()}  // 👈 go back safely
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
            Back
          </Text>
        )}
      </Pressable> */}
    </LinearGradient>
  );
}