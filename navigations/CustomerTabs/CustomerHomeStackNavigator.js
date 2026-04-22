import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import CustomerDashboardScreen from '../../screens/CustomerScreens/CustomerDashboardScreen';
// import WorkerSearchScreen from '../../screens/CustomerScreens/WorkerSearchScreen';
import HiringStackNavigator from './HiringStackNavigator';
import CreateJobPostForm from '../../components/Customer/CustomerComponents/CreateJobPostForm';


const Stack = createNativeStackNavigator();

const CustomerHomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerDashboard" component={CustomerDashboardScreen} />
      <Stack.Screen name="HiringStack" component={HiringStackNavigator} />
      <Stack.Screen name="CreateJobPostForm" component={CreateJobPostForm} />
    </Stack.Navigator>
  );
};

export default CustomerHomeStackNavigator;
