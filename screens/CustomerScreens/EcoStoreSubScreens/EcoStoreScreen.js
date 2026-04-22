import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/CustomerScreenStyles/EcoStoreSubScreenStyles/EcoStoreScreenStyles';
import ShopSection from './ShopSection';
import CartSection from './CartSection';
import OrdersSection from './OrdersSection';
import TopHeader from '../../../components/Customer/CustomerComponents/TopHeader';

const EcoStoreScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('shop');
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // ---------- Add Item ----------
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // ✅ Recalculate total item count correctly
    const totalCount =
      cartItems.reduce((sum, item) => sum + item.quantity, 0) + 1;
    setCartCount(totalCount);
  };

  // ---------- Increase Quantity ----------
  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  // ---------- Decrease Quantity ----------
  const handleDecrease = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);

    const newCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(newCount);
  };

  // ---------- Remove Item ----------
  const handleRemove = (id) => {
    const removedItem = cartItems.find((item) => item.id === id);
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    const newCount =
      cartCount - (removedItem?.quantity || 0) > 0
        ? cartCount - (removedItem?.quantity || 0)
        : 0;
    setCartCount(newCount);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        {/* ---------- Top Bar ---------- */}
        {/* <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#008037" />
            </TouchableOpacity>

            <Text style={styles.title}>Eco Store</Text>
          </View>
        </View> */}
        <TopHeader title="Eco Store" navigation={navigation} />

        {/* ---------- Main Content ---------- */}
        <View style={styles.container}>
          {/* -------- Tabs: Shop / Cart / Orders -------- */}
          <View style={styles.topSection}>
            <View style={styles.tabContainer}>
              {/* Shop Tab */}
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === 'shop' && styles.selectedTab,
                ]}
                onPress={() => setSelectedTab('shop')}
              >
                <Ionicons
                  name="storefront-outline"
                  size={18}
                  color={selectedTab === 'shop' ? '#fff' : '#008037'}
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === 'shop' && styles.selectedTabText,
                  ]}
                >
                  Shop
                </Text>
              </TouchableOpacity>

              {/* Cart Tab */}
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === 'cart' && styles.selectedTab,
                ]}
                onPress={() => setSelectedTab('cart')}
              >
                <Ionicons
                  name="cart-outline"
                  size={18}
                  color={selectedTab === 'cart' ? '#fff' : '#008037'}
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === 'cart' && styles.selectedTabText,
                  ]}
                >
                  Cart
                </Text>
                <Text style={[styles.cartCount,selectedTab === 'cart' && styles.selectedTabText,]}>({cartCount})</Text>
              </TouchableOpacity>

              {/* Orders Tab */}
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === 'orders' && styles.selectedTab,
                ]}
                onPress={() => setSelectedTab('orders')}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={18}
                  color={selectedTab === 'orders' ? '#fff' : '#008037'}
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === 'orders' && styles.selectedTabText,
                  ]}
                >
                  Orders
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* -------- Conditional Rendering -------- */}
          {selectedTab === 'shop' && (
            // ✅ Pass addToCart function down
            <ShopSection onAddToCart={handleAddToCart} />
          )}

          {selectedTab === 'cart' && (
            <CartSection
              cartItems={cartItems}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
              navigation={navigation}
            />
          )}

          {/* {selectedTab === 'orders' && (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Ionicons name="clipboard-outline" size={70} color="#00A86B" />
              <Text style={{ color: '#008037', fontWeight: '600', marginTop: 10 }}>
                No orders yet
              </Text>
            </View>
          )} */}
          {selectedTab === 'orders' && <OrdersSection />} 

        </View>
      </View>
    </ScrollView>
  );
};

export default EcoStoreScreen;
