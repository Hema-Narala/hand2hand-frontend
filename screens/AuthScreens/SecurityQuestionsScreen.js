import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../utils/api";

// const BASE_URL = "http://10.0.2.2:5000";

export default function SecurityQuestionsScreen({ route, navigation }) {

  const { mode, username, password, role,nextScreen } = route.params || {};

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([
    "Your village name?",
    "Your favorite work?",
    "Your mother name?"
  ]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE NEXT BUTTON
  const handleNext = async () => {
    if (loading) return;
    setLoading(true);

    try {
        // 👉 SIGNUP FLOW
        if (mode === "signup") {
        if (step < 3) {
            setStep(step + 1);
            return;
        }

        const res = await fetch(BASE_URL + "/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            username,
            password,
            role,
            securityQuestions: answers.map((a) => ({
              question: a.question,
              answer: a.answer
            }))
            })
        });

        const data = await res.json();

        if (!res.ok) {
            Alert.alert("Error", data.message);
            return;
        }

        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        console.log("Navigating to:", nextScreen);

        navigation.reset({
            index: 0,
            routes: [
            {
                name: nextScreen || "CustomerDashboard",
                params: { message: "signup_success" }
            }
            ]
        });
        }

        // 👉 FORGOT PASSWORD FLOW
        else if (mode === "forgot") {

        if (step === 0) {

            if (!username) {
              Alert.alert("Error", "Please enter username first");
              return;
            }

            const res = await fetch(BASE_URL + "/auth/get-security-questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
            });

            const data = await res.json();


            if (!res.ok) {
              Alert.alert("Error", data.message || "Failed to fetch questions");
              return;
            }

            if (!data.questions) {
              Alert.alert("Error", "No security questions found");
              return;
            }

            setQuestions(data.questions);

            setStep(1);
            return;
        }

        if (step < 3) {
            setStep(step + 1);
            return;
        }
        if (answers.length < 3 || answers.some(a => !a?.answer?.trim())) {
          Alert.alert("Error", "Please answer all questions");
          return;
        }
        if (step === 3) {
            const res = await fetch(BASE_URL + "/auth/verify-security-answers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              answers: answers.map(a => ({
                question: a.question.trim(),
                answer: a.answer.trim().toLowerCase()
              }))
            })
            });

            const data = await res.json();

            if (!res.ok) {
            Alert.alert("Error", "Answers are incorrect");
            return;
            }

            setStep(4);
            return;
        }

        if (step === 4) {
            if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
            }

            const res = await fetch(BASE_URL + "/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, newPassword })
            });

            const data = await res.json();

            if (!res.ok) {
            Alert.alert("Error", data.message);
            return;
            }

            navigation.reset({
            index: 0,
            routes: [
              {
                name: nextScreen || "CustomerDashboard",
                params: { message: "password_reset_success" }
              }
            ]
            });
        }
        }

    } catch (err) {
        console.log("ERROR:", err);
        Alert.alert("Error", "Server error");
    } finally {
        setLoading(false); // 🔥 ALWAYS RESET
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <LinearGradient
      colors={["#6EC6FF", "#7E57C2"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >

      <View style={{
        backgroundColor: "#fff",
        width: "85%",
        padding: 20,
        borderRadius: 20
      }}>

        {/* TITLE */}
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {mode === "signup"
            ? "Answer these for security"
            : "Verify your identity"}
        </Text>

        {/* QUESTIONS */}
        {(mode === "signup" || (step >= 1 && step <= 3)) && step > 0 && (
          <>
            <Text style={{ marginBottom: 10 }}>
              {questions[step-1] || ""}
            </Text>

            <TextInput
              value={answers[step - 1]?.answer || ""}
              onChangeText={(text) => {
                let updated = [...answers];

                updated[step - 1] = {
                  question: questions[step - 1],
                  answer: text
                };

                setAnswers(updated);
              }}
              placeholder="Enter answer"
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 20
              }}
            />
          </>
        )}

        {/* PASSWORD RESET */}
        {step === 4 && (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="New Password"
                secureTextEntry={!showPass}
                value={newPassword}
                onChangeText={setNewPassword}
                style={{ flex: 1, borderWidth: 1, borderRadius: 10, padding: 10 }}
              />
              <Ionicons
                name={showPass ? "eye" : "eye-off"}
                size={20}
                onPress={() => setShowPass(!showPass)}
                style={{ marginLeft: 10 }}
              />
            </View>

            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showPass}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginTop: 10
              }}
            />
          </>
        )}

        {/* BUTTONS */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>

          <TouchableOpacity onPress={handleBack}>
            <Text style={{ color: "blue" }}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <Text style={{ color: "green" }}>Next</Text>
          </TouchableOpacity>

        </View>

      </View>
    </LinearGradient>
  );
}