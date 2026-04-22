// navigation/HireStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkerSearchScreen from '../../screens/CustomerScreens/WorkerSearchScreen';
import RequestsForMyPostScreen from '../../screens/marketplaceScreens/RequestsForThisPostScreen';
import CreateJobPostForm from '../../components/Customer/CustomerComponents/CreateJobPostForm';
import CustomerChatStackNavigator from './CustomerChatStackNavigator';
import ChatScreen from '../../screens/marketplaceScreens/ChatScreen';

const Stack = createNativeStackNavigator();

const HiringStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HireMain" component={WorkerSearchScreen} />
      <Stack.Screen name="RequestsForMyPost" component={RequestsForMyPostScreen} />
      <Stack.Screen name="CreateJobPostForm" component={CreateJobPostForm} />
      <Stack.Screen name="ChatStack" component={CustomerChatStackNavigator} />
      {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
    </Stack.Navigator>
  );
};

export default HiringStackNavigator;
