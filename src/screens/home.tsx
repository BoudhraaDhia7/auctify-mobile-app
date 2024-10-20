import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {  globalStyles } from '../assets/styles/global';


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import { ConnexionInterface, getProfileInfo, setIsLogin, setProfileInfo } from '../stores/profileSlice';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { setAccesToken } from '../apis/axiosConfig';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { disconnectSocket, initiateSocket, onAuctionWin } from '../apis/socket';

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {

    const navigation = useNavigation<HomeScreenProp>();

    const dispatch = useAppDispatch();

    const thisGetProfileInfo = async(id : string) => {
        const data = await getProfileInfo(id);
        if ( data ) {
            console.log("data", data)
            dispatch(setProfileInfo(data))
        }
        navigation.replace('Main');
    }
   
    const getIsConnected = async() => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("value", value)
            if(value !== null) {
                const jsonValue : ConnexionInterface = JSON.parse(value);
                if (jsonValue.isLogin) {
                    console.log("connected", jsonValue.token)
                    dispatch(setIsLogin(jsonValue));
                    setAccesToken(jsonValue.token);
                    thisGetProfileInfo(jsonValue.idClient);
                }
            }
            else {
                console.log("not connected")
                navigation.replace('Main');
            }
          } catch(e) {
            navigation.replace('Main');
          }
    }

    useEffect(() => {
        getIsConnected();
    }, []);

    const navigateTo = (sc: any) => {
        navigation.replace(sc);
    }
    

    useEffect(() => {
        changeNavigationBarColor("transparent", true);
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
        </View>
        
    )
}

export const styles = StyleSheet.create({

    creditCardContainer : {
        width: "100%",
        flexDirection: 'column',
    },

  
  

}); 



export default Home;