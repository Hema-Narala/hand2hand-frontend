import React from "react";
import LoginForm from "../../components/AuthScreensComponents/LoginForm";

export default function CustomerLoginScreen({ navigation }) {
  return (
    <LoginForm
      role="Customer"
      imageSource={require("../../assets/customer.jpg")}
      navigation={navigation}
      nextScreen="CustomerDashboard"
      signupRoute="CustomerSignup"
    />
  );
}

