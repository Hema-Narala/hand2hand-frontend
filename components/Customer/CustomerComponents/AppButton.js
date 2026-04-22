import { TouchableOpacity, Text } from "react-native";

export default function AppButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
