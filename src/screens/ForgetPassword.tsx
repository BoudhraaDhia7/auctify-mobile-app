import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Image, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Easing, Extrapolate, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {  useForm, SubmitHandler   } from 'react-hook-form';

import { globalStyles } from '../assets/styles/login';
import LoginInput from '../components/layout/inputs/loginInput';
import Inscription from '../components/layout/inscription';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import SoldeAlert from '../components/layout/general/alert';
import { AlertError } from '../apis/interfaces';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { setAlertError } from '../stores/communSlice';
import { forgetPassword, getProfileInfo, setIsLogin, setIsSendLogin, setProfileInfo, userLogin } from '../stores/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccesToken } from '../apis/axiosConfig';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Toast from 'react-native-toast-message';

type ForgetPasswordScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type LogoMeasurements = {
    left: number;
    top: number;
    width: number;
    height: number;
};

type FormValues = {
    firstName: string;
    lastName: string;
};

let logoDim : LogoMeasurements = {left:0, top:0, width:0, height:0};


const ForgetPassword = () => {

    const navigation = useNavigation<ForgetPasswordScreenProp>();

    const commum = useAppSelector((state) => state.commun);
    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [ email, setEmail ] = useState<string>("");


    const screenRef = useRef<View>(null);
    const logoRef = useRef<Image>(null);
    
    const sharedX = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        const h = interpolate(sharedX.value, [0, 1], [ 180, 90], Extrapolate.CLAMP);
        const t = interpolate(sharedX.value, [0, 1], [ 0, -((logoDim.height / 2) + 100)], Extrapolate.CLAMP);
        return {
            height: h,
            transform: [{translateY : t}]
        };
    });

    const animateLogo = (val : number) => {
       
            sharedX.value = withTiming(val, {
                duration: 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }); 
    }

    useEffect(() => {
        dispatch(setProfileInfo(null));
        changeNavigationBarColor("#FFFFFF", true);
        if (logoRef.current && screenRef.current) {
            logoRef.current?.measureLayout(
              screenRef.current,
              (left, top, width, height) => {
                logoDim = {left, top, width, height};
                console.log(logoDim, {left, top, width, height});
              },
              () => {
                console.error('measurement failed');
              },
            );
        }
    }, [])

    

    const ChangeUser = (val : string) => {
        setEmail(val);
    }

    const updateAlert = (alert: AlertError) => {
        dispatch(setAlertError(alert));
    }

  
    

    const forgetPasswordSubmit = async() => {
            dispatch(setIsSendLogin(true));
            const data = await forgetPassword({ email });
            dispatch(setIsSendLogin(false));
            if (data) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Succès',
                text2: 'Un email vous a été envoyé pour réinitialiser votre mot de passe',
                visibilityTime: 4000,
                autoHide: true,
              });
              navigation.replace('Login');
            }
            else {
                updateAlert({ isErrorAlert: true, alertErrorType : "ERROR", alertErrorMessage : "Erreur lors de l'envoi de l'email" });
            }
    }

    const handleLoginPress = () => {
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        };
    
        ReactNativeHapticFeedback.trigger("impactMedium", options);
        // Proceed with login logic
        forgetPasswordSubmit();
    };


    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    

    return (
        <KeyboardAvoidingView  style={globalStyles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -130} >
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={true} animated={true} />
            
            {/* Updated Background with Linear Gradient */}
            <LinearGradient
                colors={['#e3f2fd', '#ffffff', '#bbdefb']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}
                style={globalStyles.bgOverlay}
            />

            {/* Login Main Container */}
            <View style={globalStyles.loginContainer}>
                {/* Logo Section */}
                <View ref={logoRef} style={globalStyles.loginMainLogo}>
                    <Animated.Image 
                        style={[globalStyles.loginMainLogoImage, animatedStyles]} 
                        source={require("../assets/images/logo.png")} 
                    />
                </View>
                
                {/* Form Section */}
                <View style={globalStyles.connectContainer}>
                    <Text style={globalStyles.connectTitle}>Connectez-vous</Text>
                    <LoginInput 
                        placeholder="Email ou Mobile" 
                        secret={false} 
                        value={email} 
                        onChange={ChangeUser} 
               
                    />
           

                    {/* Connect Button or Loader */}
                    {profile.isSendLogin ? (
                        <View style={globalStyles.connectButton}>
                            <ActivityIndicator size={24} color={"#FFF"} />
                        </View>
                    ) : (
                        <TouchableOpacity 
                            style={[globalStyles.connectButton, { backgroundColor: '#64b5f6', borderRadius: 10, shadowOpacity: 0.25, shadowRadius: 5, shadowColor: '#000', shadowOffset: { height: 2, width: 0 } }]} 
                            onPress={handleLoginPress}
                        >
                            <Text style={[globalStyles.connectButtonText, { fontSize: 18, fontWeight: 'bold', letterSpacing: 1.2 }]}>RÉINITIALISER MOT DE PASSE</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Inscription Component */}
            <Inscription animateLogo={animateLogo} updateAlert={updateAlert} />

            {/* Close Button */}
            <TouchableOpacity style={globalStyles.loginClose} onPress={() => navigation.replace('Main')}>
                <Icon name="chevron-left" size={32} color="#333" />
            </TouchableOpacity>

            {/* Error Alert */}
            {commum.alertError.isErrorAlert && (
                <SoldeAlert alertType={commum.alertError.alertErrorType} message={commum.alertError.alertErrorMessage} />
            )}
        </KeyboardAvoidingView>
    );
}


export default ForgetPassword;