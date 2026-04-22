import React, { useState, useEffect, useCallback,useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Alert 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/CustomerScreenStyles/CustomerDashboardScreenStyles";
import { useFocusEffect } from "@react-navigation/native";
import CustomerJobPost from "./CustomerJobPost";
import { FontAwesome } from "@expo/vector-icons";
import { BackHandler,ToastAndroid  } from "react-native";
import BASE_URL from "../../utils/api";


const { width } = Dimensions.get("window");

export default function CustomerDashboardScreen({navigation,route }) {
  
  // const BASE_URL = "https://hand2hand-backend.onrender.com";
  // const BASE_URL = __DEV__
  //   ? "http://10.0.2.2:5000"
  //   : "https://hand2hand-backend.onrender.com";
    
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [statsData, setStatsData] = useState(null);

  const scrollRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  

  // Load user from AsyncStorage + backend whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const raw = await AsyncStorage.getItem("user");
          if (!raw) return;
          const parsed = JSON.parse(raw);
          setUser(parsed);
          // const userId = parsed._id || parsed.userid || parsed.id;
          // if (!userId) return;

          // const res = await fetch(`${BASE_URL}/api/users/${userId}`);
          // const data = await res.json();
          // if (res.ok) {
          //   setUser(data);
          // } else {
          //   console.log("❌ Error fetching user:", data.message);
          // }
        } catch (err) {
          console.log("⚠️ Fetch user error:", err);
        }
      };

      fetchUser();

      const fetchUserData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          const res = await fetch(`${BASE_URL}/customerprofile/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await res.json();

          if (res.ok) {
            setProfile(data);
          } else {
            console.log("❌ Error fetching user:", data.message);
          }

        } catch (err) {
          console.log("⚠️ Fetch user error:", err);
        }
      };

      fetchUserData();


      const fetchStats = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          const res = await fetch(`${BASE_URL}/profile/customer-stats`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await res.json();

          if (res.ok) {
            setStatsData(data);
          } else {
            console.log("Stats error:", data.message);
          }
        } catch (err) {
          console.log("Stats fetch error:", err);
        }
      };

      fetchStats();

      //TO HANDLE THE BACK BUTTON OF DASHBOARD TO EXIT APP ON BACK PRESS
      let backPressedOnce = false;
      
      const onBackPress = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        backPressedOnce = true;
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);

        setTimeout(() => {
          backPressedOnce = false;
        }, 2000);

        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();


    }, [])
  );

  //For Alerts
  useEffect(() => {
    if (route.params?.message === "signup_success") {
      Alert.alert("Success", "Signup successful ✅");
    }

    if (route.params?.message === "password_reset_success") {
      Alert.alert("Success", "Password changed successfully ✅");
    }
  }, [route?.params]);

  //Auto Scroll of corousal
  useEffect(() => {
    const totalSlides = 5; // number of images in your carousel
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const nextSlide = (prev + 1) % totalSlides;
        scrollRef.current?.scrollTo({ 
          x: nextSlide * (width - 40), // your image width
          animated: true
        });
        return nextSlide;
      });
    }, 3000); // scroll every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, []);


  // Extract first word of firstname if exists
  const firstName = user?.firstname
    ? user.firstname.split(" ")[0]
    : "Dude";

  // Construct short address
  const shortAddress = user?.address
    ? `${user.address.house || ""} ${user.address.street || ""}, ${user.address.district || ""}`.trim()
    : "";

    const workerRecommendations = [
      {
        id: "1",
        name: "Ramesh",
        skill: "Electrician",
        rating: 4.6,
        wage: "₹800/day",
        image: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: "2",
        name: "Suresh",
        skill: "Plumber",
        rating: 4.4,
        wage: "₹700/day",
        image: "https://i.pravatar.cc/150?img=25",
      },
      {
        id: "3",
        name: "Mahesh",
        skill: "Carpenter",
        rating: 4.8,
        wage: "₹900/day",
        // image: require("../../assets/logo-outline.png"),
        image: "https://i.pravatar.cc/150?img=23",
      },
    ];


  return (
    <LinearGradient
      colors={["#a265e3ff", "#065884ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 3, y: 0 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* TOP HEADER */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/logo-outline.png")}
              // source={{ uri: profileImage }}
              style={styles.logoImg}
            />

            <Text style={styles.appName}>
              Hand<Text style={styles.highlight}>2</Text>Hand
            </Text>
          </View>

          <View style={styles.headerRight}>
            <Pressable style={styles.iconBtn}>
              <FontAwesome
                name="bell"
                size={22}
                color="rgb(129, 89, 207)"
              />
            </Pressable>

            {/*
            <Pressable style={styles.iconBtn}>
              <FontAwesome
                name="comments"
                size={23}
                color="#7c5c98"
              />
            </Pressable>
            */}
          </View>
        </View>

       
        {/* Top part */}
        <View style={styles.top}>
          <TouchableOpacity>
            {shortAddress ? (
              <View style={styles.locationContainer}>
                <Ionicons name="location-sharp" size={18} color="#fff" />
                <Text style={styles.locationText}>{shortAddress}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color="#fff"
            />
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#fff"
              style={{ marginLeft: 15 }}
            />
          </View>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          {/* User Image */}
          <Image
            source={
              profile?.profileImage
                ? { uri: profile.profileImage }
                : require("../../assets/default-profile.jpg")
            }
            style={styles.profileImage}
          />

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>

            <Text style={styles.userNameText}>{firstName}</Text>

            <Text style={styles.subText}>
              Find reliable help in seconds. Explore trusted professionals — all in one place
            </Text>
          </View>
        </View>


        {/* Search + Fav Row */}
        {/* <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#fff"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#ccc"
              style={styles.searchInput}
              
            />
          </View>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart" size={20} color="#fff" />
          </TouchableOpacity>
        </View> */}

       {/* White Card Section */}
        <View style={styles.whiteCard}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            
            {/* Carousel Section */}
            <View style={styles.carouselContainer}>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const slide = Math.round(
                    e.nativeEvent.contentOffset.x / (width - 40)
                  );
                  setActiveSlide(slide);
                }}
              >
                {[
                  require("../../assets/banner.jpg"),
                  require("../../assets/carousel2.png"),
                  require("../../assets/carousel3.png"),
                  require("../../assets/carousel4.png"),
                  require("../../assets/banner.jpg"),
                ].map((img, index) => (
                  <Image key={index} source={img} style={styles.carouselImage} />
                ))}
              </ScrollView>

              {/* Dots */}
              <View style={styles.dotsContainer}>
                {[0, 1, 2, 3, 4].map((dot, i) => (
                  <View
                    key={i}
                    style={[styles.dot, activeSlide === i && styles.activeDot]}
                  />
                ))}
              </View>
            </View>

            {/* 🏆 To Hire/ search workers */}
            <TouchableOpacity 
              style={styles.levelContainer} 
              // onPress={() => navigation.navigate('HireMain')}
              onPress={() =>
                navigation.navigate('HiringStack', {
                  screen: 'HireMain',
                })
              }
              // onPress={() => console.log("LevelStack Pressed")}
              activeOpacity={0.8}
            >
              {/* Left side: Text info */}
              <View style={styles.levelInfo}>
                <Text style={styles.levelTitle}>Skilled Workers</Text>

                <View style={styles.levelRow}>
                  <Text style={styles.levelValue}>Hire Now</Text>
                  <View style={styles.levelArrow}>
                    <Ionicons name="chevron-forward" size={16} color="#7c5c98" />
                  </View>
                </View>

                <Text style={styles.levelSubtitle}>Tap here to, browse services, view profiles & hire instantly!</Text>
              </View>

              {/* Right side: Growth image */}
              <Image
                source={require('../../assets/refer.jpeg')}
                style={styles.levelImage}
              />
            </TouchableOpacity>

            {/* ⚡ Quick Actions Section */}
            {/* <View style={styles.quickActionsContainer}> */}
              {/* Header Row */}
              {/* <View style={styles.quickHeader}>
                <Image
                  source={require('../../assets/quickactions.png')} 
                  style={styles.quickIcon}
                />
                <Text style={styles.quickTitle}>Quick Actions</Text>
                
              </View> */}

              {/* Icons Row */}
              {/* <View style={styles.quickGrid}> */}
                {/* <TouchableOpacity style={styles.quickItem} onPress={() => navigation.navigate('WalletStack')}> */}
                {/* <TouchableOpacity style={styles.quickItem} onPress={() => console.log("WalletStack Pressed")}>
                  <View style={styles.iconCircleTop} >
                    <Ionicons name="wallet-outline" size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.quickLabel}>Wallet</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.quickItem} onPress={() => navigation.navigate('CampusComplaintsStack')}> */}
                {/* <TouchableOpacity style={styles.quickItem} onPress={() => console.log("CampusComplaintsStack Pressed")}> */}
                  {/* <Image
                    source={require('../assets/home/complaintboxicon.png')}
                    style={styles.quickImage}
                  /> */}
                  {/* <View style={styles.iconCircleTop}>
                    <Ionicons name="clipboard-outline" size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.quickLabel}>Campus Complaints</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.quickItem} onPress={() => navigation.navigate('LevelStack')}> */}
                {/* <TouchableOpacity style={styles.quickItem} onPress={() => console.log("LevelStack Pressed")}> */}
                  {/* <View style={styles.iconCircleTop}>
                    <Ionicons name="trophy-outline" size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.quickLabel}>Level</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.quickItem} onPress={() => navigation.navigate('History')}> */}
                {/* <TouchableOpacity style={styles.quickItem} onPress={() => console.log("History Pressed")}> */}
                  
                  {/* <View style={styles.iconCircleTop}>
                    <Ionicons name="time-outline" size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.quickLabel}>History</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            

            {/* Category Section */}
            {/* <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Select Category</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryRow}
            >
              {[
                { name: "Cleaner", img: require("../assets/cleaner.jpg") },
                { name: "Beauty", img: require("../assets/beauty.jpg") },
                { name: "Repairing", img: require("../assets/repair.jpg") },
                { name: "Doctor", img: require("../assets/doctor.jpg") },
              ].map((item, index) => (
                <View key={index} style={styles.categoryCard}>
                  <Image source={item.img} style={styles.categoryIcon} />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              ))}
            </ScrollView> */}

            {/* Post Your Job Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.postjobTitle}>Create Job Post</Text>
              
             
            </View>
            <View style={styles.sectionHeader}>
             <CustomerJobPost />
            </View>

            {/* ---------------- RECOMMENDATIONS SECTION ---------------- */}
            {/* <View style={styles.recommendationsSection}> */}

              {/* WORKER RECOMMENDATIONS */}
              {/* <View style={styles.recommendationBlock}> */}

                {/* Header */}
                {/* <View style={styles.blockHeader}>
                  <Text style={styles.blockTitle}>Recommended Workers</Text>
                  <Pressable>
                    <Text style={styles.viewAllBtn}>View All</Text>
                  </Pressable>
                </View> */}

                {/* Worker Cards */}
                {/* <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.workerCards}
                >
                  {workerRecommendations.map((worker) => (
                    <View key={worker.id} style={styles.workerCard}>
                      <Image
                        source={{ uri: worker.image }}
                        style={styles.workerImage}
                      />

                      <View style={styles.workerInfo}>
                        <Text style={styles.workerName}>{worker.name}</Text>
                        <Text style={styles.skill}>{worker.skill}</Text>
                        <Text style={styles.rating}>⭐ {worker.rating}</Text>

                        <View style={styles.workerFooter}>
                          <Text style={styles.wage}>{worker.wage}</Text>
                          <Pressable style={styles.viewProfileBtn}>
                            <Text style={styles.viewProfileText}>View Profile</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>

              </View>
            </View> */}


            {/* Impact Section */}
            <View style={styles.impactWrapper}>
              <View style={styles.impactContainer}>
                {/* Header */}
                <View style={styles.impactHeader}>
                  <Text style={styles.sectionTitle}>✨ Your Impact since day 1</Text>
                  <Text style={styles.sectionSubtitle}>
                    Your contribution to a sustainable future
                  </Text>
                </View>

                {/* Card Container */}
                <View style={styles.cardContainer}>
                  <View style={styles.cardRow}>
                    {/* Card 1 */}
                    <View style={[styles.card, styles.greenCard]}>
                      <View style={styles.iconCircleTop}>
                        <Ionicons name="repeat-outline" size={24} color="#ffffff" />
                      </View>
                      <Text style={styles.cardValue}>
                        {statsData?.jobsBooked || 0}
                      </Text>
                      <Text style={styles.cardLabel}>Jobs Booked</Text>
                    </View>

                    {/* Card 2 */}
                    <View style={[styles.card, styles.greenCard]}>
                      <View style={styles.iconCircleTop}>
                        <Ionicons name="clipboard-outline" size={24} color="#ffffff" />
                      </View>
                      <Text style={styles.cardValue}>{statsData?.activeJobs || 0}</Text>
                      <Text style={styles.cardLabel}>Active Jobs</Text>
                    </View>
                  </View>

                  <View style={styles.cardRow}>
                    {/* Card 3 */}
                    <View style={[styles.card, styles.yellowCard]}>
                      <View style={styles.iconCircleBottom}>
                        <Ionicons name="calendar-outline" size={24} color="#ffffff" />
                      </View>
                      <Text style={[styles.cardValue, { color: '#7c5c98' }]}>{statsData?.savedWorkers || 0}</Text>
                      <Text style={[styles.cardLabel, { color: '#7c5c98' }]}>Saved Workers</Text>
                    </View>

                    {/* Card 4 */}
                    <View style={[styles.card, styles.yellowCard]}>
                      <View style={styles.iconCircleBottom}>
                        <Ionicons name="cash-outline" size={24} color="#ffffff" />
                      </View>
                      <Text style={[styles.cardValue, { color: '#7c5c98' }]}>₹{statsData?.totalSpent || 0}</Text>
                      <Text style={[styles.cardLabel, { color: '#7c5c98' }]}>Total Spent</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 💰 Eco Wallet Section */}
            {/* <View>
              <View style={styles.walletWrapper}> */}
                {/* Header */}
                {/* <View style={styles.walletHeader}>
                  <Text style={styles.walletTitle}>💳 Payment Dashboard</Text>
                  <Text style={styles.walletSubtitle}>
                    Your earnings and eco-rewards balance
                  </Text>
                </View> */}

                {/* Wallet Details */}
                {/* <View style={styles.walletContainer}> */}
                  {/* Available Balance */}
                  {/* <View style={styles.balanceCard}>
                    <Ionicons name="wallet-outline" size={22} color="#7c5c98" />
                    <Text style={styles.balanceTitle}>Available Balance</Text>
                    <Text style={styles.balanceValue}>₹0</Text>
                  </View> */}

                  {/* Earnings Row */}
                  {/* <View style={styles.earningRow}>
                    <View style={styles.earningCard}>
                      <Text style={styles.earningValue}>₹0</Text>
                      <Text style={styles.earningLabel}>Total Earned</Text>
                    </View>

                    <View style={styles.earningCard}>
                      <Text style={styles.earningValue}>₹0</Text>
                      <Text style={styles.earningLabel}>Withdrawed</Text>
                    </View>
                  </View> */}

                  {/* Estimated Balance */}
                  {/* <View style={styles.balanceCard}>
                    <Ionicons name="wallet-outline" size={22} color="#7c5c98" />
                    <Text style={styles.balanceTitle}>Estimated amount per month if you continue Recycling</Text>
                    <Text style={styles.balanceValue}>₹0</Text>
                  </View> */}

                  {/* Shop Button */}
                  {/* <TouchableOpacity style={styles.shopButton}>
                    <Ionicons name="cart-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.shopButtonText}>Shop Eco Products</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}

            {/* Footer logo */}
            <LinearGradient
              colors={['#ffffff', '#dfc6fada']} // fallback colors
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.footerGradient}
            >
              
              <View style={styles.footerContent}>
                <Image
                  source={require("../../assets/logo-outline.png")}
                  style={styles.logo}
                />
                <Text style={styles.appName}>
                  Hand<Text style={styles.highlight}>2</Text>Hand
                </Text>
              </View>
            </LinearGradient>


            {/* Recommended Section
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendedRow}
            >
              {[
                {
                  title: "Home Cleaning",
                  img: require("../assets/homeclean.jpg"),
                },
                {
                  title: "Kitchen Cleaning",
                  img: require("../assets/kitchen.jpg"),
                },
              ].map((item, index) => (
                <View key={index} style={styles.recommendedCard}>
                  <Image source={item.img} style={styles.recommendedImage} />
                  <Text style={styles.recommendedTitle}>{item.title}</Text>
                </View>
              ))}
            </ScrollView> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
