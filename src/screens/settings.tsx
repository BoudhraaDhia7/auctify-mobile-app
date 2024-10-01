import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, ScrollView } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SCREEN, globalStyles } from '../assets/styles/global';


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import BackSection from '../components/layout/BackSection';
import LinearGradient from 'react-native-linear-gradient';

type SettingsScreenProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const Settings = () => {

    const navigation = useNavigation<SettingsScreenProp>();

    const navigateTo = (sc: any) => {
        navigation.replace(sc);
    }

    useEffect(() => {
        changeNavigationBarColor("#FFFFFF", true);
    }, [])

    const [statusBg, setStatusBg] = useState<string>("transparent");

    return(
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content"  backgroundColor = { statusBg } translucent = {true} animated = {true} />
            <LinearGradient
                colors={['#b2c6e7', '#ffffff', '#9AB6EB']}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}}
                style={globalStyles.bgOverlay}
            />
            <View style={globalStyles.bgOverlay}></View>
            
            <BackSection label="Paramètres" logo={true} navigateTo={navigateTo} from='Main'/>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    creditCardContainer : {
        width: "100%",
        flexDirection: 'column',
    }, 
}); 



export default Settings;