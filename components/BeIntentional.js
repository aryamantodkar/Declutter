import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BeIntentional = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Prevent going back on Android
    const backAction = () => {
      return true; // Disable back navigation
    };

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', backAction);
    }

    // Clean up when the component is unmounted
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: '#fff', fontFamily: 'OutfitMedium', fontSize: 30 }}>Be Intentional.</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: '#ddd', fontFamily: 'OutfitRegular', fontSize: 18, textAlign: 'center' }}>An average person spends <Text style={{fontFamily: 'OutfitSemiBold', color: '#fff'}}>12 years</Text> looking at screens.</Text>
      </View>
    </View>
  );
};

export default BeIntentional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    padding: 30,
  },
});
