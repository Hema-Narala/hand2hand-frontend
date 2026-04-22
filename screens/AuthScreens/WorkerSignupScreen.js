import React from "react";
import SignupForm from "../../components/AuthScreensComponents/SignupForm";

export default function WorkerSignupScreen({ navigation }) {
  return (
    <SignupForm
      role="worker"
      heading="Signup — Worker"
      imageSource={require("../../assets/workers.png")}
      navigation={navigation}
      nextScreen="WorkerDashboard"
      LoginRoute="WorkerLogin"
    />
  );
}
