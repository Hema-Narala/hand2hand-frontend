// navigation/HireStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsListScreen from '../../screens/marketplaceScreens/ChatsListScreen';
import ChatScreen from '../../screens/marketplaceScreens/ChatScreen';
import UserProfileViewScreen from '../../screens/marketplaceScreens/UserProfileViewScreen';
import ViewWorkerProfileScreen from '../../screens/CustomerScreens/ViewWorkerProfileScreen';
import ViewCustomerProfileScreen from '../../screens/WorkerScreens/ViewCustomerProfileScreen';

const Stack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ViewWorkerProfile" component={ViewWorkerProfileScreen} />
      <Stack.Screen name="ViewCustomerProfile" component={ViewCustomerProfileScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;