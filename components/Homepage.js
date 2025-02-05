import { View, Text, TouchableOpacity, Linking, StyleSheet, SafeAreaView, Dimensions, Modal, TouchableWithoutFeedback, Pressable, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { useSelectedApps } from './SelectedAppsProvider';

const { width, height } = Dimensions.get('window');

const openApp = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};

// const selectedApps = [
//   { name: "Phone", url: "shortcuts://x-callback-url/run-shortcut?x-error=mobilephone://" },
//   { name: "Safari", url: "http://" },
//   { name: "Notes", url: "mobilenotes://" },
//   { name: "Clock", url: "shortcuts://x-callback-url/run-shortcut?x-error=clock-worldclock://" },
//   { name: "Settings", url: "App-Prefs://" },
// ];

const Homepage = () => {
  const navigation = useNavigation();
  const { selectedApps } = useSelectedApps();

  return (
    <SafeAreaView edges={['top','left','right']} style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Settings')} style={[styles.settingsIcon, { top: 80 , right: 40 }]}>
        <Ionicons name="settings-sharp" size={30} color="#fff" />
      </Pressable>

      {selectedApps.map((app, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => openApp(app.url)}>
          <Text style={styles.text}>{app.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    padding: 20,
  },
  settingsIcon: {
    position: 'absolute',
  },
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  text: {
    color: '#fff',
    fontSize: 35,
    fontFamily: 'Outfit-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -Dimensions.get('window').width * 0.45,
    marginTop: -Dimensions.get('window').height * 0.15,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#171717',
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#212121',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'OutfitRegular',
    color: '#ddd',
    fontSize: 17,
  },
});

export default Homepage;
