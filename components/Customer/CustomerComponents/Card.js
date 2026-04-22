import { View } from "react-native";

export default function Card({ children, style }) {
  return <View style={[{ borderRadius: 16, backgroundColor: "#fff" }, style]}>{children}</View>;
}
