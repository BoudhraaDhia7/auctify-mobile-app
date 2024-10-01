import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { SCREEN, STATUSBAR_HEIGHT } from '../../../assets/styles/global';


type Props = {
    close : () => void;
}

const Notifications = ( { close } : Props) => {

    const animValue = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        const tx = interpolate(animValue.value, [0, 1], [ SCREEN.width / 2, 0 ], Extrapolate.CLAMP);
        const r = interpolate(animValue.value, [0,3, 1], [ 10, 0 ], Extrapolate.CLAMP);
        const t = interpolate(animValue.value, [0, 1], [ 0, 1 ], Extrapolate.CLAMP);
        return {
            borderRadius : r,
            opacity: t,
            transform: [{translateX : tx}]
        };
    });

    const animate = (a : number) => {
        animValue.value = withSpring( a, {
            stiffness : 200,
            damping : 15,
        });
    }

    const thisClose = () => {
        animate(0);
        setTimeout(() => { close(); }, 200)
    }

    useEffect(() => {
        animate(1);
    }, []);

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
        <Animated.View style={[styles.container, animatedStyles]}>
            <View style={styles.backSection}>
                <View style={styles.backContainer}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => thisClose()}>
                        <Icon name="chevron-left" size={34} color="#333" />
                    </TouchableOpacity>
                    <Text  style={styles.backLabel}>Notifications</Text>
                </View>
            </View>
        </Animated.View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        width: "100%",
        height : '100%',
        backgroundColor : 'rgba(255,255,255,.98)'
    },
    backSection : {
        width: "100%",
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal : 10,
        marginTop : STATUSBAR_HEIGHT,
    },

    backContainer : {
        flexDirection:'row',
        justifyContent: "flex-start",
        alignItems: 'center',
    },

    backIcon : {
        width: 40,
        height : 40,
        justifyContent: "center",
        alignItems: 'flex-start',
    },

    backLabel : {
        fontFamily: "Montserrat-Regular",
        fontSize : 16,
        color: "#333",
     
    },
  
   

}); 

export default Notifications;