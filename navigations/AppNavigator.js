import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LandingScreen from "../screens/AuthScreens/LandingScreen";
import LoginChooseOptScreen from "../screens/AuthScreens/LoginChooseOptScreen";
import SignupChooseOptScreen from "../screens/AuthScreens/SignupChooseOptScreen";
import CustomerLoginScreen from "../screens/AuthScreens/CustomerLoginScreen";
import WorkerLoginScreen from "../screens/AuthScreens/WorkerLoginScreen";
import CustomerSignupScreen from "../screens/AuthScreens/CustomerSignupScreen";
import WorkerSignupScreen from "../screens/AuthScreens/WorkerSignupScreen";
import SecurityQuestionsScreen from "../screens/AuthScreens/SecurityQuestionsScreen";

// Navigators
import CustomerTabs from "./CustomerTabs/CustomerTabs";
import WorkerTabs from "./WorkerTabs/WorkerTabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      {/* Landing & Choose Options */}
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="LoginChoose" component={LoginChooseOptScreen} />
      <Stack.Screen name="SignupChoose" component={SignupChooseOptScreen} />

      {/* Login & Signup */}
      <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
      <Stack.Screen name="WorkerLogin" component={WorkerLoginScreen} />
      <Stack.Screen name="CustomerSignup" component={CustomerSignupScreen} />
      <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />

      <Stack.Screen name="SecurityQuestions" component={SecurityQuestionsScreen} />

      {/* Dashboards */}
      <Stack.Screen name="CustomerDashboard" component={CustomerTabs} />
      <Stack.Screen name="WorkerDashboard" component={WorkerTabs} />
    </Stack.Navigator>
  );
}
