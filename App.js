import React from 'react';
import { StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './components/Homepage';
import Settings from './components/Settings';
import { SelectedAppsProvider } from './components/SelectedAppsProvider';
import { Cloudinary } from '@cloudinary/url-gen';

const Stack = createStackNavigator();

export default function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dhpjqucss' } });

  const [fontsLoaded] = useFonts({
    'OutfitRegular': require('./assets/fonts/Outfit-Regular.ttf'),
    'OutfitMedium': require('./assets/fonts/Outfit-Medium.ttf'),
    'OutfitSemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SelectedAppsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Homescreen">
          <Stack.Screen
            name="Homescreen"
            component={Homepage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SelectedAppsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
