// import React from "react";
// import { View, Text } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import WorkerDashboardScreen from "../../screens/WorkerScreens/WorkerDashboardScreen";
// import WorkerProfileScreen from "../../screens/WorkerScreens/WorkerProfileScreen";

// const Tab = createBottomTabNavigator();

// /* ---------- TEMP PLACEHOLDER SCREENS ---------- */
// const PlaceholderScreen = ({ title }) => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#fff",
//     }}
//   >
//     <Text style={{ fontSize: 20, fontWeight: "600" }}>
//       {title} Screen
//     </Text>
//     <Text style={{ marginTop: 8, color: "gray" }}>
//       Coming soon 🚧
//     </Text>
//   </View>
// );

// /* ---------- MAIN TABS ---------- */
// export default function CustomerTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: { backgroundColor: "white" },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home")
//             iconName = focused ? "home" : "home-outline";
//           else if (route.name === "Bookings")
//             iconName = focused ? "calendar" : "calendar-outline";
//           else if (route.name === "Profile")
//             iconName = focused ? "person" : "person-outline";
//           else if (route.name === "Help")
//             iconName = focused ? "help-circle" : "help-circle-outline";
//           else if (route.name === "Points")
//             iconName = focused ? "star" : "star-outline";

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "purple",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={WorkerDashboardScreen} />

//       <Tab.Screen
//         name="Bookings"
//         children={() => <PlaceholderScreen title="Bookings" />}
//       />

//       <Tab.Screen name="Profile" component={WorkerProfileScreen} />

//       <Tab.Screen
//         name="Help"
//         children={() => <PlaceholderScreen title="Help" />}
//       />

//       <Tab.Screen
//         name="Points"
//         children={() => <PlaceholderScreen title="Points" />}
//       />
//     </Tab.Navigator>
//   );
// }

import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// import DiscoverScreen from '../screens/DiscoverScreen';
// Screens
// import CustomerProfileScreen from "../../screens/CustomerScreens/CustomerProfileScreen";
// import BookingsScreen from "../../screens/CustomerScreens/BookingScreen";
// import EcoStoreScreen from "../../screens/CustomerScreens/EcoStoreSubScreens/EcoStoreScreen";
// import SellScreen from "../../screens/CustomerScreens/SellScreen";
// import HomeStackNavigator from './HomeStackNavigator';

import WorkerDashboardScreen from "../../screens/WorkerScreens/WorkerDashboardScreen";
import WorkerProfileScreen from "../../screens/WorkerScreens/WorkerProfileScreen";
import WorkerHomeStackNavigator from "./WorkerHomeStackNavigator";
import ChatStackNavigator from "./WorkerChatStackNavigator";
import BookingStackNavigator from './BookingStackNavigatorW';

const Tab = createBottomTabNavigator();

const WorkerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7c5c98',
        tabBarInactiveTintColor: '#7c5c987c',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          height: 65,
          paddingBottom: 5,
        },
      }}
    >

      {/* 🏠 Home */}
      <Tab.Screen
        name="Home"
        // component={EcoStoreScreen}
        component={WorkerHomeStackNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Ionicons name="home" size={22} color={color} />
        //   ),
        // }}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'WorkerDashboardScreen';
          const hideOnScreens = ['SearchWork', 'RequestsForMyPost', 'CreateJobPostForm','ChatScreen','ViewCustomerProfile','ViewWorkerProfile'];
          // console.log("Route Name:", routeName);
          return {
            tabBarStyle: hideOnScreens.includes(routeName)
              ? { display: 'none' }
              : {
                  backgroundColor: '#fff',
                  borderTopWidth: 0.5,
                  borderTopColor: '#ccc',
                  height: 65,
                  paddingBottom: 5,
                },
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={30} color={color} />
            ),
          };
        }}
      />


      {/* ♻️ Chat */}
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "ChatsList";
          const hideOnScreens = ['ChatScreen','ViewWorkerProfile','ViewCustomerProfile'];

          return {
            tabBarStyle:
              routeName === "ChatScreen"
                ? { display: "none" }
                : {
                    backgroundColor: "#fff",
                    borderTopWidth: 0.5,
                    borderTopColor: "#ccc",
                    height: 65,
                    paddingBottom: 5,
                  },

            tabBarIcon: ({ color }) => (
              <Ionicons
                name="chatbubble-ellipses"
                size={30}
                color={color}
              />
            ),
          };
        }}
      />
      {/* <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={30} color={color} />
          ),
        }}
      /> */}


      {/* Bookings */}
      <Tab.Screen
        name="Bookings"
        // component={RecycleInfoStackNavigator}
        component={BookingStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';
          // const hideOnScreens = ['LevelStack', 'Tasks', 'Achievements', 'Ranking', 'MoreLevels','WalletStack','History','DiscoveryStack','CampusComplaintsStack'];
          const hideOnScreens = ['ChatScreen','ViewWorkerProfile','ViewCustomerProfile'];

          return {
            tabBarStyle: hideOnScreens.includes(routeName)
              ? { display: 'none' }
              : {
                  backgroundColor: '#fff',
                  borderTopWidth: 0.5,
                  borderTopColor: '#ccc',
                  height: 65,
                  paddingBottom: 5,
                },
            tabBarIcon: ({ color }) => (
              <Ionicons name="book" size={22} color={color} />
            ),
          };
        }}
      />

      

      {/* ♻️ Sell */}
      {/* <Tab.Screen
        name="Sell"
        // component={SellScrapStackNavigator}
        component={WorkerProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag" size={22} color={color} />
          ),
        }}
      /> */}

      
     {/* <Tab.Screen
        name="Home"
        component={WorkerHomeStackNavigator}
        // component={CustomerDashboardScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => {
            const focused = props.accessibilityState ? props.accessibilityState.selected : false;

            return (
              <TouchableOpacity
                {...props}
                style={{
                  top: -20, // float above tab bar
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...props.style,
                }}
              >
                <View
                  style={{
                    backgroundColor: focused ? '#7c5c98' : '#7c5c987c',
                    borderRadius: 40,
                    width: 70,
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // shadowColor: '#000',
                    // shadowOpacity: 0.3,
                    // shadowOffset: { width: 0, height: 3 },
                    // shadowRadius: 4,
                    // elevation: 5,
                  }}
                >
                  <Ionicons name="home" size={28} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      /> */}

      {/* 🛍️ Buy */}
      {/* <Tab.Screen
        name="Buy"
        // component={EcoStoreScreen}
        component={WorkerProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={22} color={color} />
          ),
        }}
      /> */}

      {/* 👤 Profile */}
      <Tab.Screen
        name="Profile"
        // component={ProfileStackNavigator}
        component={WorkerProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default WorkerTabs;


// import React from "react";
// import { View, Text } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import CustomerDashboardScreen from "../screens/CustomerScreens/CustomerDashboardScreen";
// import CustomerProfileScreen from "../screens/CustomerScreens/CustomerProfileScreen";
// import BookingsScreen from "../screens/CustomerScreens/BookingScreen";
// import EcoStoreScreen from "../screens/CustomerScreens/EcoStoreSubScreens/EcoStoreScreen";
// import SellScreen from "../screens/CustomerScreens/SellScreen";

// const Tab = createBottomTabNavigator();

// /* ---------- TEMP PLACEHOLDER SCREENS ---------- */
// const PlaceholderScreen = ({ title }) => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#fff",
//     }}
//   >
//     <Text style={{ fontSize: 20, fontWeight: "600" }}>
//       {title} Screen
//     </Text>
//     <Text style={{ marginTop: 8, color: "gray" }}>
//       Coming soon 🚧
//     </Text>
//   </View>
// );

// /* ---------- MAIN TABS ---------- */
// export default function CustomerTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: { backgroundColor: "white" },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home")
//             iconName = focused ? "home" : "home-outline";
//           else if (route.name === "Bookings")
//             iconName = focused ? "calendar" : "calendar-outline";
//           else if (route.name === "Profile")
//             iconName = focused ? "person" : "person-outline";
//           else if (route.name === "Buy")
//             iconName = focused ? "help-circle" : "help-circle-outline";
//           else if (route.name === "Sell")
//             iconName = focused ? "star" : "star-outline";

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "purple",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={CustomerDashboardScreen} />

//       <Tab.Screen name="Bookings" component={BookingsScreen}  />

//       <Tab.Screen name="Profile" component={CustomerProfileScreen}  />

//       <Tab.Screen name="Buy" component={EcoStoreScreen}  />

//       <Tab.Screen name="Sell" component={SellScreen}  />
      
// {/* 
//       <Tab.Screen
//         name="Buy"
//         children={() => <PlaceholderScreen title="Help" />}
//       /> */}

//       {/* <Tab.Screen
//         name="Sell"
//         children={() => <PlaceholderScreen title="Points" />}
//       /> */}
//     </Tab.Navigator>
//   );
// }
