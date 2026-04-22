import { TextInput } from "react-native";

export default function AppInput({ value, onChangeText, placeholder, style }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={style}
    />
  );
}
