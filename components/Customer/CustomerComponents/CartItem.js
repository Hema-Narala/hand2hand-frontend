import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../CustomerComponentStyles/CartItemStyles';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.originalPrice}>₹{item.oldPrice}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>₹{item.price * item.quantity}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={onDecrease}>
            <Ionicons name="remove-outline" size={22} color="#008037" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity onPress={onIncrease}>
            <Ionicons name="add-outline" size={22} color="#008037" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={18} color="red" style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
