import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 add this
import BASE_URL from "../../utils/api";
import styles from "./LoginFormStyles";

export default function LoginForm({
  role = "Customer",
  navigation,
  nextScreen,
  signupRoute,
  imageSource
}) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //Base URL for API calls
  // const BASE_URL = "https://hand2hand-backend.onrender.com";
    // const BASE_URL = __DEV__
    // ? "http://10.0.2.2:5000"
    // : "https://hand2hand-backend.onrender.com";

    

  const handleLogin = async () => {
    setMessage("");

    if (!userId.trim()) {
      setMessage("Please enter user id.");
      return;
    }
    if (!password) {
      setMessage("Please enter password.");
      return;
    }

    console.log("API BASE URL:", BASE_URL);

    setLoading(true);

    // try {
    //   const res = await fetch(BASE_URL + "/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       username: userId,
    //       password: password,
    //       role: role.toLowerCase(), // 👈 Send "customer" or "worker"
    //     }),
    //   });

    //   const data = await res.json();
    //   setLoading(false);

    //   if (!res.ok) {
    //     setMessage(data.message || "Login failed ❌");
    //     return;
    //   }

    //   // ✅ Save logged-in user into AsyncStorage
    //   await AsyncStorage.setItem("user", JSON.stringify(data.user));

    //   // ✅ Success
    //   setMessage(`${role} login successful ✅`);

    //   // Replace navigation so user can’t go back to login
    //   if (navigation && nextScreen) {
    //     navigation.replace(nextScreen); 
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   setMessage("Server error, please try again later.");
    // }
    try {
      const res = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userId,
          password: password,
          role: role.toLowerCase(),
        }),
      });

      const data = await res.json();
      setLoading(false);

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setMessage(data.message || "Login failed ❌");
        return;
      }

      // 🔥 SAVE TOKEN (NEW)
      await AsyncStorage.setItem("token", data.token);

      //to check whether token is generated in AsyncStorage or not...can be deleted later(for temporary use only)
      // const storedToken = await AsyncStorage.getItem("token");
      // console.log("Stored Token:", storedToken);

      // ✅ Save user
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      setMessage(`${role} login successful ✅`);

      if (navigation && nextScreen) {
        // navigation.replace(nextScreen); 
        navigation.reset({
          index: 0,
          routes: [{ name: nextScreen }],
        });
      }

    } 
    // catch (err) {
    //   setLoading(false);
    //   setMessage("Server error, please try again later.");
    // }
    catch (error) {
      console.error("LOGIN ERROR:", error); // 👈 ADD THIS
      res.status(500).json({ message: "Server error", error: error.message });
    }

  };

  return (
    <LinearGradient
      colors={["#8256dbff", "#51b2efff"]}
      style={styles.container}
    >
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

          <Text style={styles.welcome}>Welcome,</Text>
          <Text style={styles.subtitle}>Glad to see you!</Text>

          {/* User ID */}
          <TextInput
            value={userId}
            onChangeText={setUserId}
            placeholder="User ID"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.input}
            autoCapitalize="none"
          />

          {/* Password row */}
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              secureTextEntry={!showPassword}
              underlineColorAndroid="transparent"
              autoComplete="off"
              autoCorrect={false}
              textContentType="none"
              selectionColor="#fff"
              style={styles.inputField}
            />
            <Pressable
              onPress={() => setShowPassword((s) => !s)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#fff"
              />
            </Pressable>
          </View>

          {/* Forgot password */}
          <TouchableOpacity
            // onPress={() => {
            //   setMessage("");
            //   if (navigation) navigation.navigate("ForgotPassword");
            // }}
            // onPress={() => console.log("Pressed forget password")}
            
            onPress={() => navigation.navigate("SecurityQuestions", {
              mode: "forgot",
              username: userId,
              role: role.toLowerCase(),
              nextScreen: nextScreen
            })}
          >
            <Text style={styles.forgot}>Forget password?</Text>
          </TouchableOpacity>

          {/* Login button */}
          <TouchableOpacity style={styles.button} 
            onPress={handleLogin}
            // onPress={() => console.log("loggedin")}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>

        {/* Bottom Section → Signup link */}
        <View style={styles.signupRow}>
          <Text style={styles.noAccount}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              if (navigation && signupRoute) navigation.navigate(signupRoute);
            }}
          >
            <Text style={styles.signUpLink}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
