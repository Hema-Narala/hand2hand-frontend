// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomerProfileScreen from './components/Worker/WorkerComponents/WorkerAvailabilityCard';

// export default function App() {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <CustomerProfileScreen />
//     </SafeAreaView>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigations/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// import { View, Text } from "react-native";

// export default function App() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>App Working</Text>
//     </View>
//   );
// }