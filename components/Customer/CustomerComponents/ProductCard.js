import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../CustomerComponentStyles/ProductCardStyles';

const ProductCard = ({
  image,
  title,
  description,
  rating,
  reviews,
  stock,
  price,
  oldPrice,
  labels = [],
  onAddPress,
}) => {
  return (
    <View style={styles.card}>
      {/* ---------- Product Image + Labels ---------- */}
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        {/* <View style={styles.labelContainer}>
          {labels.map((label, index) => (
            <View
              key={index}
              style={[
                styles.label,
                label.type === 'popular' && { backgroundColor: '#FF7043' },
                label.type === 'eco' && { backgroundColor: '#2ECC71' },
                label.type === 'discount' && { backgroundColor: '#E74C3C' },
              ]}
            >
              <Text style={styles.labelText}>{label.text}</Text>
            </View>
          ))}
        </View> */}
      </View>

      {/* ---------- Product Details ---------- */}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Rating + Stock */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.reviewText}>({reviews})</Text>
          </View>
          {/* <Text style={styles.stockText}>{stock} left</Text> */}
        </View>

        {/* Price + Add Button */}
        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{price}</Text>
            {oldPrice && <Text style={styles.oldPrice}>₹{oldPrice}</Text>}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
