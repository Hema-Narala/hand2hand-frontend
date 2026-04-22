import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SignupFormStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";

/**
 * Reusable signup form.
 * Props:
 * - role: "Customer" | "Worker"
 * - navigation: react-navigation navigation prop
 * - nextScreen: route name to go after signup
 * - loginRoute: route name for login
 */
export default function SignupForm({
  role,
  navigation,
  nextScreen,
  LoginRoute,
  imageSource
}) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");   // ✅ now defined
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);

  //Base URL for API calls
  // const BASE_URL = "https://hand2hand-backend.onrender.com";
  // const BASE_URL = __DEV__
  //   ? "http://10.0.2.2:5000"
  //   : "https://hand2hand-backend.onrender.com";

    console.log("API BASE URL:", BASE_URL);

  // const handleSignup = async () => {
  //   setMessage("");

  //   // Validate username
  //   const usernameRegex = /^[a-z0-9_]{6,}$/;
  //   if (!userId.trim()) {
  //     setMessage("Please enter a username.");
  //     return;
  //   }
  //   if (!usernameRegex.test(userId)) {
  //     setMessage("❌ Username must be at least 6 characters and contain only small letters, numbers, or underscore.");
  //     return;
  //   }

  //   // Validate password
  //   if (!password) {
  //     setMessage("Please enter password.");
  //     return;
  //   }
  //   if (password !== confirm) {
  //     setMessage("Passwords do not match.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch(BASE_URL + "/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         username: userId,
  //         password: password,
  //         role: role.toLowerCase(),
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setMessage("✅ Signup successful!");

  //       // 🔐 Save token (VERY IMPORTANT)
  //       await AsyncStorage.setItem("token", data.token);

  //       //to check whether token is generated in AsyncStorage or not...can be deleted later(for temporary use only)
  //       // const storedToken = await AsyncStorage.getItem("token");
  //       // console.log("Stored Token:", storedToken);

  //       // 👤 Save user
  //       await AsyncStorage.setItem("user", JSON.stringify(data.user));

  //       if (navigation && nextScreen) {
  //         // navigation.replace(nextScreen);
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: nextScreen }],
  //         });
  //       }

  //     } else {
  //       setMessage(data.message || "❌ Signup failed.");
  //     }

  //   } catch (error) {
  //     console.error(error);
  //     setMessage("⚠️ Server error, please try again.");
  //   } finally {
  //     setLoading(false);
  //   }

  // };
  const handleSignup = async () => {
      setMessage("");

      const usernameRegex = /^[a-z0-9_]{6,}$/;

      if (!userId.trim()) {
        setMessage("Please enter a username.");
        return;
      }

      if (!usernameRegex.test(userId)) {
        setMessage("❌ Username must be valid.");
        return;
      }

      if (!password) {
        setMessage("Please enter password.");
        return;
      }

      if (password !== confirm) {
        setMessage("Passwords do not match.");
        return;
      }

      // 👉 Go to Security Questions screen
      navigation.navigate("SecurityQuestions", {
        mode: "signup",
        username: userId,
        password: password,
        role: role.toLowerCase(),
        nextScreen: nextScreen   // 🔥 IMPORTANT
      });
    };

  return (
    <LinearGradient colors={["#9370db", "#51b2efff"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.inner}>
        {/* Top Section */}
        <View>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
            {imageSource && (
                <Image
                source={imageSource}
                style={{ width: 120, height: 120, resizeMode: "contain" }}
                />
            )}
            </View>
          <Text style={styles.welcome}>Create Account</Text>
          <Text style={styles.subtitle}>to get started now!</Text>

          {/* User ID */}
          <TextInput
            value={userId}
            onChangeText={setUserId}
            placeholder="User ID"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.input}
            autoCapitalize="none"
          />

          {/*Password */}
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry={!showNew}
                underlineColorAndroid="transparent"
                autoComplete="off"
                autoCorrect={false}
                textContentType="none"
                selectionColor="#fff"
                style={styles.inputField}  
              />
              <Pressable
                onPress={() => setShowNew((s) => !s)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showNew ? "eye" : "eye-off"}
                  size={20}
                  color="#fff"
                />
              </Pressable>
            </View>

          {/* Confirm Password */}
          <View style={styles.passwordRow}>
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              secureTextEntry={!showNew}
              underlineColorAndroid="transparent"
              autoComplete="off"
              autoCorrect={false}
              textContentType="none"
              selectionColor="#fff"
              style={styles.inputField}
            />
            <Pressable
              onPress={() => setShowNew((s) => !s)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showNew ? "eye" : "eye-off"}
                size={20}
                color="#fff"
              />
            </Pressable>
          </View>
          {/* <TextInput
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            style={styles.input}
          /> */}

          {/* Signup Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup} >
            <Text style={styles.buttonText}>
              {loading ? "Creating..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Message */}
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>

        {/* 🔹 Bottom Section → Signup link */}
                <View style={styles.signupRow}>
                    <Text style={styles.noAccount}>Already have an account?</Text>
                    <TouchableOpacity
                    onPress={() => {
                        if (navigation && LoginRoute) navigation.navigate(LoginRoute);
                    }}
                    >
                    <Text style={styles.signUpLink}>Login now</Text>
                    </TouchableOpacity>
                </View>

      </View>
    </LinearGradient>
  );
}
