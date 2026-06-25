// navigation/HireStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsScreen from '../../screens/CustomerScreens/BookingScreen';
import ViewWorkerProfileScreen from '../../screens/CustomerScreens/ViewWorkerProfileScreen';




const Stack = createNativeStackNavigator();

const BookingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingScreen" component={BookingsScreen} />
      <Stack.Screen name="ViewWorkerProfile" component={ViewWorkerProfileScreen} />
    </Stack.Navigator>
  );
};

export default BookingStackNavigator;