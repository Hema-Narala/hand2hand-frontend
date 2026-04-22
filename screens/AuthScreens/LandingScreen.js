import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/AuthScreenStyles/LandingScreenStyles";
import Button from "../../components/AuthScreensComponents/Button";

export default function LandingScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#8159cfff", "#65bcf3ff"]} // light purple → light sky blue
      style={styles.container}
    >
      {/* Top Section (Logo + App Name) */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/logo1.png")} // make sure to add your logo inside assets folder
          style={styles.logo}
        />
        <Text style={styles.title}>Hand2Hand</Text>

        {/* Navigate to LoginChooseOptScreen */}
        <Button
          title="Login"
          onPress={() => navigation.navigate("LoginChoose")}
          // onPress={() => console.log("LoginChoose button pressed")}

        />

        {/* Navigate to SignupChooseOptScreen */}
        <Button
          title="Signup"
          onPress={() => navigation.navigate("SignupChoose")}
          // onPress={() => console.log("LoginChoose button pressed")}

        />
      </View>

      {/* Bottom Section (Get Started button) */}
      {/* <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.getStartedButton}
          // onPress={() => alert("Get Started pressed")}
          onPress={() => navigation.navigate("LoginChoose")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View> */}
    </LinearGradient>
  );
}
