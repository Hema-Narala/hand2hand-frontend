// frontend/components/TopHeader.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../CustomerComponentStyles/TopHeaderStyles';

export default function TopHeader({ title, navigation }) {
  return (
    <View style={styles.topheader}>
      <View style={styles.topleftSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack?.()}
        >
          <Ionicons name="chevron-back" size={24} color="#0a5229ff" />
        </TouchableOpacity>
        <Text style={styles.toptitle}>{title}</Text>
      </View>
    </View>
  );
}
