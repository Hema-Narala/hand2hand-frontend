// navigation/HireStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsScreen from "../../screens/WorkerScreens/WorkerBookingsScreen";
import ViewCustomerProfileScreen from '../../screens/WorkerScreens/ViewCustomerProfileScreen';




const Stack = createNativeStackNavigator();

const BookingStackNavigatorW = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingScreen" component={BookingsScreen} />
      <Stack.Screen name="ViewCustomerProfile" component={ViewCustomerProfileScreen} />
    </Stack.Navigator>
  );
};

export default BookingStackNavigatorW;