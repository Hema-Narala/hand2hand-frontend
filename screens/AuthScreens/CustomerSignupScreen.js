import React from "react";
import SignupForm from "../../components/AuthScreensComponents/SignupForm";

export default function CustomerSignupScreen({ navigation }) {
  return (
    <SignupForm
      role="customer"
      heading="Signup — Customer"
      imageSource={require("../../assets/customer.jpg")}
      navigation={navigation}
      nextScreen="CustomerDashboard"
      LoginRoute="CustomerLogin"
    />
  );
}
