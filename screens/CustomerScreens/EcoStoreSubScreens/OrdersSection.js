// screens/EcoStoreSubScreens/OrdersSection.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/CustomerScreenStyles/EcoStoreSubScreenStyles/OrdersSectionStyles';

const OrdersSection = () => {
  // Temporary sample data
  const orders = [
    {
      id: 'SCRAP001',
      status: 'Delivered',
      date: '10/01/2024',
      total: 65,
      itemsCount: 2,
      items: [
        { name: 'Eco-Friendly Notebook', qty: 2, price: 50 },
        { name: 'Bamboo Pen Set', qty: 1, price: 15 },
      ],
    },
    {
      id: 'SCRAP002',
      status: 'Dispatched',
      date: '12/01/2024',
      total: 36,
      itemsCount: 1,
      items: [{ name: 'Organic Granola Bar', qty: 3, price: 36 }],
    },
  ];

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      {/* -------- Order Header -------- */}
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Delivered'
              ? styles.delivered
              : styles.dispatched,
          ]}
        >
          <Ionicons
            name={item.status === 'Delivered' ? 'checkmark-circle' : 'cube'}
            size={14}
            color={item.status === 'Delivered' ? '#00A86B' : '#007BFF'}
          />
          <Text
            style={[
              styles.statusText,
              item.status === 'Delivered'
                ? styles.deliveredText
                : styles.dispatchedText,
            ]}
          >
            {item.status}
          </Text>
        </View>
        <Text style={styles.orderTotal}>₹{item.total}</Text>
      </View>

      {/* -------- Date & Count -------- */}
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.itemsCount}>{item.itemsCount} items</Text>
      </View>

      {/* -------- Ordered Items -------- */}
      <View style={styles.itemsContainer}>
        {item.items.map((product, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {product.name} <Text style={styles.qty}>×{product.qty}</Text>
            </Text>
            <Text style={styles.itemPrice}>₹{product.price}</Text>
          </View>
        ))}
      </View>

      {/* -------- Buttons -------- */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.trackButton}>
          <Ionicons name="cube-outline" size={16} color="#00A86B" />
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.reorderText}>Reorder Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={renderOrder}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false} // ✅ disables internal scroll
    />
  );
};

export default OrdersSection;
