import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import WorkerDashboardScreen from '../../screens/WorkerScreens/WorkerDashboardScreen';
// import PostWorkScreen from '../../screens/WorkerScreens/PostWorkScreen';
import HiringStackNavigatorW from './HiringStackNavigatorW';

const Stack = createNativeStackNavigator();

const WorkerHomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkerDashboardScreen" component={WorkerDashboardScreen} />
      <Stack.Screen name="SearchWork" component={HiringStackNavigatorW} />
      {/* <Stack.Screen name="WalletStack" component={WalletStackNavigator} />
      <Stack.Screen name="CampusComplaintsStack" component={CampusComplaintsStackNavigator} />
      <Stack.Screen name="LevelStack" component={LevelStackNavigator} />
      <Stack.Screen name="ReferAndEarn" component={ReferAndEarnScreen} />
      <Stack.Screen name="ReferralDetails" component={ReferralDetailsScreen} />
      <Stack.Screen name="DiscoveryStack" component={DiscoveryStackNavigator} /> */}
    </Stack.Navigator>
  );
};

export default WorkerHomeStackNavigator;
