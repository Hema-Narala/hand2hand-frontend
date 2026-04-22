// navigation/HireStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsListScreen from '../../screens/marketplaceScreens/ChatsListScreen';
import ChatScreen from '../../screens/marketplaceScreens/ChatScreen';
import UserProfileViewScreen from '../../screens/marketplaceScreens/UserProfileViewScreen';

const Stack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;