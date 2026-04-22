import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ title, subtitle, onBack }) {
  return (
    <View style={{ padding: 18, backgroundColor: "#6a64ef", flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back" size={26} color="white" />
      </TouchableOpacity>
      <View style={{ marginLeft: 12 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: "#ddd", fontSize: 13 }}>{subtitle}</Text>
      </View>
    </View>
  );
}
