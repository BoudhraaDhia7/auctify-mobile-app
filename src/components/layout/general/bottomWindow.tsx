import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { SCREEN, STATUSBAR_HEIGHT, colorShema } from '../../../assets/styles/global';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { setAlertError } from '../../../stores/communSlice';
import { Screen } from 'react-native-screens';
import ParticipateTransaction from '../transactions/participateTransaction';
import SoldeSend from '../transactions/soldeSend';
import SoldeRequest from '../transactions/soldeRequest';

type Props = {
    windowType? : string,
    close : () => void,
}


const BottomWindow = ( { windowType, close } : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const dispatch = useAppDispatch();

    const animValue = useSharedValue(0);

    useEffect(() => {
        animate(1);
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        const ty = interpolate(animValue.value, [0, 1], [ SCREEN.height * .6, 0 ], Extrapolate.CLAMP);
        return {
            transform: [{translateY : ty}],
        };
    });

    const animatedStylesParent = useAnimatedStyle(() => {
        const t = interpolate(animValue.value, [.5, 1], [ 0, 1 ], Extrapolate.CLAMP);
        return {
            opacity : t
        };
    });

    const animate = (a : number) => {
        animValue.value = withSpring( a, {
            stiffness : 150,
            damping : 15,
        });
    }

    const thisClose = () => {
        animate(0);
        setTimeout(() => { close(); }, 200)
    }

    useEffect(() => {
        const backAction = () => {
            thisClose();
            return true;
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress", backAction
        );
        return () => backHandler.remove();

    }, []);


    return(
        <Animated.View style={[styles.container, animatedStylesParent]}>
           <TouchableOpacity onPress={() => thisClose()} style={styles.topSpace}></TouchableOpacity>
           <Animated.View style={[styles.window, animatedStyles]}>

            { (windowType == 'PARTICIPATE') && <ParticipateTransaction close={thisClose} /> }
            { (windowType == 'SEND_DANNOS') && <SoldeSend close={thisClose} /> }
            { (windowType == 'REQUEST_DANNOS') && <SoldeRequest close={thisClose} /> }

            <TouchableOpacity onPress={() => thisClose()} style={styles.closeBt}>
                <Icon name='x' color={'#333'} size={28}/>
            </TouchableOpacity>
           </Animated.View>
        </Animated.View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        position : "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
    },

   topSpace : {
    width: '100%',
    flex :1,
   },

   window : {
    width: '100%',
    minHeight: 240,
    maxHeight : '90%',
    borderTopLeftRadius : 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255,255,255,.6)',
    overflow: 'hidden'
   },

   closeBt : {
    position: 'absolute',
    width : 50,
    height : 50,
    top: 0,
    right : 0,
    justifyContent: 'center',
    alignItems : 'center'
   }

   

}); 

export default BottomWindow;