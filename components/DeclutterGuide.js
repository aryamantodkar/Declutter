import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Pressable,Image, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import WallpaperPreview from '../assets/wallpaper-preview.svg';
import DarkMode from '../assets/dark-mode.svg';
import hideApps1 from '../assets/hide-apps-1.svg';
import hideApps2 from '../assets/hide-apps-2.svg';
import deleteApps1 from '../assets/delete-app-1.svg';
import deleteApps2 from '../assets/delete-app-2.svg';
import hidePages1 from '../assets/hide-pages-1.svg';
import hidePages2 from '../assets/hide-pages-2.svg';
import Slider from './Slider';

const width = Dimensions.get('window').width;

const steps = [
  {
    title: 'Enable Dark Mode',
    description: '→ Go to Settings.\n\n→ Dsiplay & Brightness.\n\n→ Appearance → Dark.',
  },
  {
    title: 'Set the Wallpaper',
    description: '→ Save the wallpaper\n\n→ Set the image as your wallpaper.',
  },
  {
    title: 'Clean Your Home Screen',
    description: '→ Long-press any App Icon or empty space.\n\n→ Remove from Home Screen.\n\n→ Repeat for all apps.',
  },
  {
    title: "One Page Home Screen",
    description: "→ Tap and hold your home screen\n\n→ Tap on the page dots.\n\n→ Uncheck all other screens to hide them."
  },
  {
    title: 'Hide Distractions',
    description: '→ Long-press icons.\n\n→ Require Face ID.\n\n→ Hide and Require Face ID.\n\n→ Repeat for all distracting apps.',
  },
  {
    title: 'Move This App to the Dock',
    description: 'Drag this app down to the dock for easy access.',
  },
  {
    title: 'Choose 5 Essential Apps',
    description: 'Pick the apps you actually need inside the app.',
  },
];

const DeclutterGuide = ({setShowSelectedApps}) => {
  const hideApps = [
    {
      url: hideApps1
    },
    {
      url: hideApps2
    }
  ]
  
  const deleteApps = [
    {
      url: deleteApps1
    },
    {
      url: deleteApps2
    }
  ]
  
  const hidePages = [
    {
      url: hidePages1
    },
    {
      url: hidePages2
    }
  ]

  return (
    <View style={{flex: 1,width: '100%'}}>
      <View style={{marginBottom: 30, alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontFamily: 'Outfit-Medium', color: '#fff', }}>
            Minimalist Setup Guide
          </Text>
        </View>
        {steps.map((step, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: 16,
                marginBottom: 15,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: 15,
                paddingHorizontal: 15
              }}
            >
              <View style={{width: '100%'}}>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                  <View style={{backgroundColor: '#3C3C3C',borderRadius: 100,padding: 5,paddingHorizontal: 12,marginRight: 5}}>
                    <Text style={{ fontSize: 15, fontFamily: 'Outfit-Medium', color: '#fff',textAlign: 'center' }}>{index}</Text>
                  </View>
                  <View style={{marginLeft: 5}}>
                    <Text style={{ fontSize: 22, fontFamily: 'Outfit-Medium', color: '#fff' }}>
                      {step.title}
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 20,display: 'flex'}}>
                  <Text style={{ fontSize: 15, fontFamily: 'Outfit-Regular', color: '#aaa'}}>
                    {step.description}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 10,width: '100%',justifyContent: 'center' }}>
                {
                  index==0
                  ?
                  <View style={{marginVertical: 10}}>
                    <DarkMode width={Dimensions.get('window').width*0.8} height={200} />
                  </View>
                  :
                  (
                    index==1
                    ? 
                    <View style={{marginVertical: 10}}>
                      <WallpaperPreview width={Dimensions.get('window').width*0.8} height={150} />
                    </View>
                    :
                    (
                      index==2
                      ?
                      <View style={{marginVertical: 10}}>
                        <Slider data={deleteApps} size='normal'/>
                      </View>
                      :
                      (
                        index==3
                        ?
                        <View style={{marginVertical: 10}}>
                            <Slider data={hidePages} size='normal'/>
                        </View>
                        :
                        (
                          index==4
                          ?
                          <View style={{marginVertical: 10}}>
                            <Slider data={hideApps} size='large'/>
                          </View>
                          :
                          (
                            index==5
                            ?
                            null
                            :
                            <Pressable onPress={() => {
                              setShowSelectedApps(true);
                            }} style={{padding: 15,paddingHorizontal: 20,borderRadius: 30,backgroundColor: '#242424',display: 'flex',justifyContent: 'center',alignItems: 'center',margin: 'auto'}}>
                              <Text style={{fontFamily: 'Outfit-Regular', fontSize: 14, color: '#fff'}}>Select Apps</Text>
                            </Pressable>
                          )
                        )
                      )
                    )
                  )
                }
              </View>
              {
                index==1
                ?
                <Pressable style={{backgroundColor: '#262626', padding: 15,paddingHorizontal: 25,borderRadius: 30,display: 'flex',justifyContent: 'center',alignItems: 'center',margin: 'auto'}}>
                  <Text style={{fontFamily: 'Outfit-Regular', color: '#fff',}}>Save Wallpaper</Text>
                </Pressable>
                :
                null
              }
            </View>
          ))}
        <View style={{marginVertical: 20,paddingBottom: 40, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{marginRight: 10}}>
            <AntDesign name="checkcircle" size={24} color="#17C900"/>
          </View>
          <Text style={{ fontSize: 26, fontFamily: 'Outfit-Medium', color: '#fff', }}>
            You're All Set!
          </Text>
        </View>
    </View>
  )
}

export default DeclutterGuide

const styles = StyleSheet.create({})