import React from "react";
import LoginForm from "../../components/AuthScreensComponents/LoginForm";

export default function WorkerLoginScreen({ navigation }) {
  return (
    <LoginForm
      role="Worker"
      imageSource={require("../../assets/workers.png")}
      navigation={navigation}
      nextScreen="WorkerDashboard"
      signupRoute="WorkerSignup"
    />
  );
}
