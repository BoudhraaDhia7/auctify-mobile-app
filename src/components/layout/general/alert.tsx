import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { STATUSBAR_HEIGHT, colorShema } from '../../../assets/styles/global';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { setAlertError } from '../../../stores/communSlice';

type Props = {
    alertType : string,
    message : string
}


const SoldeAlert = ( { alertType, message } : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const dispatch = useAppDispatch();

    const bgColor: string = alertType == "ERROR" ? colorShema.secondary : colorShema.alertInfo;

    const animValue = useSharedValue(0);

    useEffect(() => {
        animate(1);
        let myTimer: number;
        myTimer = setTimeout(() => { 
            animate(0); 
            setTimeout(() => { dispatch(setAlertError({ isErrorAlert: false, alertErrorType : "", alertErrorMessage : ""})); }, 200)
        }, 3000);
        return () => clearTimeout(myTimer);
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        const ty = interpolate(animValue.value, [0, 1], [ -200, 10 ], Extrapolate.CLAMP);
        return {
            transform: [{translateY : ty}]
        };
    });

    const animate = (a : number) => {
        animValue.value = withSpring( a, {
            stiffness : 100,
            damping : 15,
        });
    }

    return(
        <Animated.View style={[styles.container, animatedStyles, { backgroundColor : bgColor}]}>
           <View style={styles.icon}>
                { alertType == "ERROR" && <Icon name="alert-triangle" size={24} color="#FFF" />}
                { alertType == "INFO" && <Icon name="info" size={24} color="#FFF" />}
           </View>
           <Text style={styles.message}>{message}</Text>
        </Animated.View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        position : "absolute",
        width: "90%",
        minHeight: 60,
        padding : 16,
        borderRadius : 10,
        backgroundColor: colorShema.secondary,
        left : "5%",
        top: STATUSBAR_HEIGHT,
        elevation: 5,
        flexDirection : 'row',
        justifyContent : "flex-start",
        alignItems : "center"
    },

    icon : {
        width : 60,
        justifyContent: 'center',
        alignItems : 'center',
    }, 
    
    message : {
        flex : 1,
        paddingLeft : 10,
        fontFamily : "Montserrat-Regular",
        fontSize: 11,
        color: '#FFF'
    }

   

}); 

export default SoldeAlert;