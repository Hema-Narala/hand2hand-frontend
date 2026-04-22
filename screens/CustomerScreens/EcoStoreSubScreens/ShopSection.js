import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// ❌ COMMENTED — REANIMATED CAROUSEL IMPORT
// import Carousel from 'react-native-reanimated-carousel';

import styles from '../../../styles/CustomerScreenStyles/EcoStoreSubScreenStyles/ShopSectionStyles';
import ProductCard from '../../../components/Customer/CustomerComponents/ProductCard';

const { width } = Dimensions.get('window');

const ShopSection = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All products');

  const categories = [
    { id: '1', name: 'All products', icon: 'grid-outline' },
    { id: '2', name: 'Stationary', icon: 'book-outline' },
    { id: '3', name: 'Snacks', icon: 'fast-food-outline' },
    { id: '4', name: 'Electronics', icon: 'phone-portrait-outline' },
    { id: '5', name: 'Eco products', icon: 'leaf-outline' },
    { id: '6', name: 'Energy Bar', icon: 'barbell-outline' },
  ];

  // ❌ COMMENTED — CAROUSEL DATA USING REANIMATED-CAROUSEL
  /*
  const carouselItems = [
    { id: '1', image: require('../../assets/sell scrap/sell choose opt.png'), text: 'Flat 30% off on Eco Items!' },
    { id: '2', image: require('../../assets/sell scrap/donate choose opt.png'), text: 'Sustainable Stationery & More' },
    { id: '4', image: require('../../assets/sell scrap/donate choose opt.png'), text: 'Sustainable Stationery & More' },
  ];
  */

  const products = [
    {
      id: '1',
      image: 'https://img.freepik.com/free-photo/open-notebook-with-glasses_23-2147949753.jpg',
      title: 'Eco-Friendly Notebook',
      description: '100% recycled paper with biodegradable cover',
      rating: 4.5,
      reviews: 128,
      stock: 50,
      price: 25,
      oldPrice: 35,
      labels: [
        { type: 'popular', text: 'Popular' },
        { type: 'eco', text: 'Eco' },
        { type: 'discount', text: '-29%' },
      ],
    },
    {
      id: '2',
      image: 'https://img.freepik.com/free-photo/eco-friendly-reusable-water-bottle_53876-102805.jpg',
      title: 'Reusable Bottle',
      description: 'Stainless steel bottle with thermal insulation',
      rating: 4.7,
      reviews: 210,
      stock: 80,
      price: 499,
      oldPrice: 650,
      labels: [{ type: 'eco', text: 'Eco' }],
    },
    {
      id: '3',
      image: 'https://img.freepik.com/free-photo/eco-friendly-cutlery-set_53876-129178.jpg',
      title: 'Bamboo Cutlery Set',
      description: 'Reusable and biodegradable spoon, fork, and knife',
      rating: 4.3,
      reviews: 85,
      stock: 30,
      price: 199,
      oldPrice: 249,
      labels: [
        { type: 'popular', text: 'Popular' },
        { type: 'discount', text: '-20%' },
      ],
    },
    {
      id: '4',
      image: 'https://img.freepik.com/free-photo/eco-friendly-snack-bar_53876-119222.jpg',
      title: 'Energy Snack Bar',
      description: 'Natural protein bar with organic ingredients',
      rating: 4.6,
      reviews: 340,
      stock: 60,
      price: 60,
      oldPrice: 75,
      labels: [{ type: 'eco', text: 'Eco' }],
    },
    {
      id: '5',
      image: 'https://img.freepik.com/free-photo/eco-light-bulb_53876-92944.jpg',
      title: 'Eco Light Bulb',
      description: 'Energy-efficient LED bulb that saves power',
      rating: 4.8,
      reviews: 520,
      stock: 100,
      price: 120,
      oldPrice: 150,
      labels: [
        { type: 'popular', text: 'Popular' },
        { type: 'discount', text: '-20%' },
      ],
    },
  ];

  const productList =
    products.length % 2 === 0
      ? products
      : [...products, { id: 'placeholder', placeholder: true }];

  return (
    <View style={styles.shopContainer}>
      {/* -------- Search Bar -------- */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          placeholder="Search Eco friendly products..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          underlineColorAndroid="transparent"
        />
      </View>

      {/* ❌ -------- Carousel (DISABLED) -------- */}
      {/*
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          margin={width * 0.03}
          height={180}
          autoPlay
          data={carouselItems}
          scrollAnimationDuration={1500}
          renderItem={({ item }) => (
            <View style={styles.carouselCard}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.carouselImage}
              />
              <Text style={styles.carouselText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
      */}

      {/* -------- Category Scroll -------- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.categoryScroll}
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
      >
        {categories.map((cat) => (
          <View key={cat.id} style={styles.categoryItem}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === cat.name && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(cat.name)}
            >
              <Ionicons
                name={cat.icon}
                size={19}
                color={selectedCategory === cat.name ? '#fff' : '#008037'}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.categoryLabel,
                selectedCategory === cat.name && styles.selectedCategoryLabel,
              ]}
            >
              {cat.name}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* ---------- Product Grid ---------- */}
      <FlatList
        data={productList}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.placeholder ? (
            <View style={[styles.productCardContainer, { backgroundColor: 'transparent' }]} />
          ) : (
            <View style={styles.productCardContainer}>
              <ProductCard {...item} onAddPress={() => onAddToCart(item)} />
            </View>
          )
        }
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ShopSection;
