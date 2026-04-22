// import React from "react";
// import { View, Pressable, Text } from "react-native";
// import ChooseOption from "../components/ChooseOption";
// import styles from "../css/ChooseOptionStyles";

// export default function SignupChooseOptScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1 }}>
//       <ChooseOption title="Signup as" />
      
//       {/* Back Button */}
//       <Pressable
//         style={[styles.button, { margin: 20 }]}
//         onPress={() => navigation.navigate("Landing")}
//       >
//         <Text style={[styles.buttonText]}>Back</Text>
//       </Pressable>
//     </View>
//   );
// }
import React from "react";
import ChooseOption from "../../components/AuthScreensComponents/ChooseOption";

export default function SignupChooseOptScreen({ navigation }) {
  return (
    <ChooseOption
      title="Signup to"
      navigation={navigation}
      workerRoute="WorkerSignup"
      customerRoute="CustomerSignup"
    />
  );
}
