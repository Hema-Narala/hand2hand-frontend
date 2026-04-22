import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Button({ title, onPress }) {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.button, pressed && styles.buttonPressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, pressed && styles.textPressed]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // thin white transparent layer
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    width: 300,
    height:40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonPressed: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  textPressed: {
    color: '#000',
  },
});
