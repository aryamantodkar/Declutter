import { StyleSheet, Text, View, Pressable, TextInput, Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useMemo, useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native'; 
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { GestureHandlerRootView,  } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AppList from '../urlSchemes.json'; // Ensure this contains an array of objects
import { useSelectedApps } from './SelectedAppsProvider';

const Settings = () => {
  const navigation = useNavigation();
  const { selectedApps, setSelectedApps } = useSelectedApps();
  const sheetRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectionAnimation] = useState(new Animated.Value(0));
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [isBottomSheetOpen,setIsBottomSheetOpen] = useState(false);

  const snapPoints = useMemo(() => ['95%'], []);

  const handleSheetChange = useCallback((index) => {
    // console.log('handleSheetChange', index);
    if(index==-1){
        setIsBottomSheetOpen(false);
    }
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setSheetIndex(index);
    setIsBottomSheetOpen(true);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSelectApp = (app) => {
    const isSelected = selectedApps.some(selectedApp => selectedApp.name === app.name);
  
    if (isSelected) {
      // Remove app from selectedApps
      setSelectedApps(selectedApps.filter(selectedApp => selectedApp.name !== app.name));
    } else {
      if (selectedApps.length < 5) {
        // Add app object to selectedApps while preserving both name and url
        setSelectedApps([...selectedApps, app]);
        setSearchQuery("");
      } else {
        // Trigger animation when trying to select more than 5 apps
        Animated.sequence([
          Animated.timing(selectionAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(selectionAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };  

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        style={[styles.itemContainer, selectedApps.some(app => app.name === item.name) && styles.selectedItem]}
        onPress={() => handleSelectApp(item)}
      >
        <Text style={styles.itemText}>{item.name || 'Unnamed App'}</Text>
        {selectedApps.some(app => app.name === item.name) && (
          <FontAwesome6 name="check" size={22} color="#fff" style={styles.checkIcon} />
        )}
      </Pressable>
    ),
    [selectedApps]
  );
  
  const filteredApps = useMemo(() => {
    if (searchQuery) {
      return AppList.filter(
        (app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selectedApps.some(selectedApp => selectedApp.name === app.name) // Exclude selected apps when searching
      );
    }
  
    // If no search query, show selected apps first
    const filteredSelectedApps = selectedApps.map((selectedApp) =>
      AppList.find((app) => app.name === selectedApp.name)
    ).filter(Boolean); // Make sure to filter out any undefined results
  
    const remainingApps = AppList.filter(
      (app) => !selectedApps.some(selectedApp => selectedApp.name === app.name)
    );
  
    return [...filteredSelectedApps, ...remainingApps];
  }, [searchQuery, selectedApps]);
  
  // Combine selected apps at the top with filtered apps
  const appsToDisplay = useMemo(() => {
    const filteredSelectedApps = selectedApps.map(selectedApp =>
      AppList.find(a => a.name === selectedApp.name)
    ).filter(Boolean);
  
    const filteredRemainingApps = filteredApps.filter(app =>
      !selectedApps.some(selectedApp => selectedApp.name === app.name)
    );
  
    return searchQuery ? [...filteredRemainingApps] : [...filteredSelectedApps, ...filteredRemainingApps];
  }, [filteredApps, selectedApps]);
  

  return (
    <SafeAreaView edges={['top','left','right']} style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1,height: '100%', width: '100%'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, width: '100%' }}>
                <View style={{display: 'flex', flexDirection: 'column', flex: 1, paddingHorizontal: 30, width: '100%', position: 'relative'}}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Pressable
                        onPress={() => navigation.goBack()}
                        style={{ position: 'absolute', left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                        <FontAwesome6 name="arrow-left" size={24} color="#fff" />
                        </Pressable>
                        <Text style={{ fontFamily: 'OutfitMedium', color: '#fff', fontSize: 30 }}>Settings</Text>
                    </View>
                    <View style={{ marginVertical: 20, width: '100%' }}>
                        <Pressable style={[{ marginVertical: 20 }, styles.settingBtn]}>
                        <View style={{ marginRight: 10 }}>
                            <Entypo name="mobile" size={24} color="#ddd" />
                        </View>
                        <Text style={{ color: '#ddd', fontFamily: 'OutfitRegular', fontSize: 18 }}>Declutter Guide</Text>
                        </Pressable>
                        <Pressable style={[{ marginVertical: 20 }, styles.settingBtn]}>
                        <View style={{ marginRight: 10 }}>
                            <FontAwesome5 name="crown" size={22} color="#ddd" />
                        </View>
                        <Text style={{ color: '#ddd', fontFamily: 'OutfitRegular', fontSize: 18 }}>
                            Subscribe to <Text style={{ color: '#fff', fontFamily: 'OutfitMedium' }}>PRO</Text>
                        </Text>
                        </Pressable>
                        <Pressable onPress={() => handleSnapPress(0)} style={[{ marginVertical: 20 }, styles.settingBtn]}>
                        <View style={{ marginRight: 10 }}>
                            <Entypo name="edit" size={24} color="#ddd" />
                        </View>
                        <Text style={{ color: '#ddd', fontFamily: 'OutfitRegular', fontSize: 18 }}>Edit App List</Text>
                        </Pressable>
                    </View>
                </View>
                {
                    isBottomSheetOpen
                    ?
                    <BottomSheet
                        ref={sheetRef}
                        index={sheetIndex}
                        snapPoints={snapPoints}
                        enableDynamicSizing={false}
                        onChange={handleSheetChange}
                        backgroundStyle={{backgroundColor: '#171717'}}
                        handleIndicatorStyle={{backgroundColor: '#fff'}}
                        enablePanDownToClose
                        style={{padding: 20}}
                    >
                        <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>Edit App List</Text>
                        </View>

                        <Animated.View
                        style={{
                            ...styles.selectionWarning,
                            opacity: selectionAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            }),
                        }}
                        >
                        <Text style={styles.selectionWarningText}>You can only select 5 apps!</Text>
                        </Animated.View>

                        {/* Search Input */}
                        <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search apps..."
                            placeholderTextColor="#aaa"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <Pressable onPress={handleClearSearch} style={styles.clearSearchIcon}>
                            <Entypo name="cross" size={24} color="#ddd" />
                        </Pressable>
                        </View>

                        

                        <BottomSheetFlatList
                            data={appsToDisplay}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={styles.contentContainer}
                            keyboardShouldPersistTaps="handled"
                        />
                    </BottomSheet>
                    :
                    null
                }
            </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    // alignItems: 'center',
    width: '100%',
    position: 'relative',
    paddingHorizontal: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  settingBtn: {
    backgroundColor: '#2f2f2f',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    zIndex: 2,
  },
  contentContainer: {
    zIndex: 100,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#242424',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#2f2f2f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedItem: {
    backgroundColor: '#000',
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    color: '#fff',
    fontFamily: 'OutfitRegular',
    fontSize: 18,
  },
  bottomSheetHeader: {
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetTitle: {
    color: '#fff',
    fontFamily: 'OutfitMedium',
    fontSize: 25,
  },
  checkIcon: {
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    position: 'relative'
  },
  clearSearchIcon: {
    position: 'absolute',
    right: 10,
    padding: 5
  },
  selectionWarning: {
    alignItems: 'center',
    marginBottom: 20
  },
  selectionWarningText: {
    color: '#FF5722',
    fontSize: 16,
  },
});
