// navigation/HireStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchCustomerScreen from '../../screens/WorkerScreens/SearchCustomer';
import RequestsForMyPostScreen from '../../screens/marketplaceScreens/RequestsForThisPostScreen';
import WorkerChatStackNavigator from './WorkerChatStackNavigator';
import ViewCustomerProfileScreen from '../../screens/WorkerScreens/ViewCustomerProfileScreen';

const Stack = createNativeStackNavigator();

const HiringStackNavigatorW = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchCustomer" component={SearchCustomerScreen} />
      <Stack.Screen name="RequestsForMyPost" component={RequestsForMyPostScreen} />
      <Stack.Screen name="ChatStack" component={WorkerChatStackNavigator} />
      <Stack.Screen name="ViewCustomerProfile" component={ViewCustomerProfileScreen} />
    </Stack.Navigator>
  );
};

export default HiringStackNavigatorW;
