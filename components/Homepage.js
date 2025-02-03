import { View, Text, TouchableOpacity, Linking, StyleSheet, SafeAreaView, Dimensions, Modal, TouchableWithoutFeedback, Pressable, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';  
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

  const [showModal, setShowModal] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial opacity set to 0

  useEffect(() => {
    if (showModal) {
      Animated.timing(fadeAnim, {
        toValue: 1,  
        duration: 500,  
        useNativeDriver: true,  
      }).start();
    }
  }, [showModal]);

  const closeModalWithFadeOut = () => {
    // Fade out the modal
    Animated.timing(fadeAnim, {
      toValue: 0,  // Fade to 0 opacity
      duration: 500,  // Set the duration for fade-out
      useNativeDriver: true,
    }).start();

    // After the fade-out, hide the modal after a delay
    setTimeout(() => {
      setShowModal(false);
    }, 500);  // Wait for the fade-out animation to complete
  };

  return (
    <SafeAreaView edges={['top','left','right']} style={styles.container}>
      {showModal && (
        <Modal
          visible={showModal}
          transparent={true}
          animationType="none"
          onRequestClose={closeModalWithFadeOut}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalOverlay}>
              <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
            </View>
          </TouchableWithoutFeedback>

          {/* Animated Modal Content */}
          <Animated.View style={[styles.modalContainer, { width: width * 0.9, height: height * 0.25, opacity: fadeAnim }]}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { justifyContent: 'space-around' }]}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'OutfitRegular', color: '#ddd', fontSize: 18 }}>
                    This moment is a <Text style={{ fontFamily: 'OutfitSemiBold', color: '#fff' }}>choice</Text>.
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: 'OutfitRegular', color: '#ddd', fontSize: 18 }}>
                      Do you want to <Text style={{ fontFamily: 'OutfitSemiBold', color: '#fff' }}>save</Text> time or <Text style={{ fontFamily: 'OutfitSemiBold', color: '#fff' }}>waste</Text> it?
                    </Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                  <Pressable onPress={() => {
                    navigation.navigate('CloseApp');
                    closeModalWithFadeOut();  // Use the fade-out function before closing
                  }} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Be Intentional</Text>
                  </Pressable>
                  <Pressable onPress={closeModalWithFadeOut} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Act on Autopilot</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </Modal>
      )}
      
      <Pressable onPress={() => navigation.navigate('Settings')} style={[styles.settingsIcon, { top: height * 0.1, right: width * 0.1 }]}>
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
