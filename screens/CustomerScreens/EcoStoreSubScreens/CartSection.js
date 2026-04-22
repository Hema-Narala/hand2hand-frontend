import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/CustomerScreenStyles/EcoStoreSubScreenStyles/CartSectionStyles';
import CartItem from '../../../components/Customer/CustomerComponents/CartItem';

const CartSection = ({ cartItems, onIncrease, onDecrease, onRemove, navigation }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={70} color="#00A86B" style={styles.emptyIcon} />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubText}>Start shopping for eco-friendly products</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('EcoStoreScreen')}>
          <Ionicons name="sparkles-outline" size={18} color="#fff" />
          <Text style={styles.startButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.cartContainer}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
          onRemove={() => onRemove(item.id)}
        />
      ))}

      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
        </View>

        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>₹0</Text>

        <View style={styles.tipContainer}>
          <Ionicons name="leaf-outline" size={18} color="#00A86B" />
          <Text style={styles.tipText}>
            You're making a sustainable choice! All products are eco-friendly.
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton}>
          <Ionicons name="card-outline" size={18} color="#fff" />
          <Text style={styles.payButtonText}>Insufficient Balance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CartSection;
