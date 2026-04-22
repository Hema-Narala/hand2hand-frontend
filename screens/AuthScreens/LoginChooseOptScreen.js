import React from "react";
import ChooseOption from "../../components/AuthScreensComponents/ChooseOption";

export default function LoginChooseOptScreen({ navigation }) {
  return (
    <ChooseOption
      title="Login to"
      navigation={navigation}
      workerRoute="WorkerLogin"
      customerRoute="CustomerLogin"
    />
  );
}

