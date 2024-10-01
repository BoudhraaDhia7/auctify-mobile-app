import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import { SCREEN } from '../../../assets/styles/global';
import { creditDate, creditNumber } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';


const CreditCard = () => {

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    return(
        <Animated.View style={styles.container}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#9C75FF", "#6FA1FF"]} style={styles.GradientCard}>
                    <View style={styles.cardStats}>
                        <View style={styles.cardStatsCol}>
                            <Text style={styles.cardStatsColTitle}>REVENUES</Text>
                            <Text style={styles.cardStatsColValue}>{profile.profileInfo?.amountRecieved}</Text>
                        </View>
                        <View style={styles.cardStatsCol}>
                            <Text style={styles.cardStatsColTitle}>DEPONSES</Text>
                            <Text style={styles.cardStatsColValue}>{profile.profileInfo?.amountSent}</Text>
                        </View>
                        <View style={styles.cardStatsCol}>
                            <Text style={styles.cardStatsColTitle}>SOLDE</Text>
                            <Text style={styles.cardStatsColValue}>{profile.profileInfo?.solde}</Text>
                        </View>
                    </View>
            </LinearGradient>
            <View style={styles.plasticCard}>
            
            <View style={{position: 'absolute', width: '100%', height: '100%'}}
                //blurType="light"
                //blurAmount={20}
                //reducedTransparencyFallbackColor="white"
            >
                <LinearGradient 
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={["#D7E1EC", "#FFFFFF"]}
                    style={{width: '100%', height: '100%', opacity: .9}}>
                
                </LinearGradient>
            </View>
            <Image style={{...styles.logoCard}} source={require('../../../assets/images/logo.png')} />
                <View style={styles.cardNumber}>
                    <Text style={styles.cardNumberShadow}>{creditNumber(profile.profileInfo?.wallet_code ? profile.profileInfo?.wallet_code : 0)}</Text>
                    <Text style={styles.cardNumberLight}>{creditNumber(profile.profileInfo?.wallet_code ? profile.profileInfo?.wallet_code : 0)}</Text>
                    <Text style={styles.cardNumberText}>{creditNumber(profile.profileInfo?.wallet_code ? profile.profileInfo?.wallet_code : 0)}</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardDate}>{creditDate(profile.profileInfo?.created_at ? profile.profileInfo?.created_at : '')}</Text>
                    <Text style={styles.cardName}>{(profile.profileInfo?.firstName + " " + profile.profileInfo?.lastName).toUpperCase()}</Text>
                </View>
            </View>
        </Animated.View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        justifyContent: 'flex-start',
        marginTop : 10,
        alignItems: 'center',
        width: '100%',
        height : (SCREEN.width) * (5/7.5),
      
    },


    plasticCard : {
        position: 'absolute',
        width: SCREEN.width - 40,
        height : (SCREEN.width - 40) * (5/9),
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,.2)',
        overflow: 'hidden',
        borderTopColor:  'rgba(255,255,255,.6)',
        borderLeftColor:  'rgba(255,255,255,.6)',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomColor:  'rgba(0,0,0,.05)',
        borderRightColor:  'rgba(0,0,0,.05)',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        transform: [{rotateX: '10deg'}, {translateX: 10}, {rotateY: '10deg'}, {perspective : 500}]
    },

    logoCard : {
        position: 'absolute',
        width: SCREEN.width * .14,
        height : SCREEN.width * .14,
        resizeMode: 'contain',
        left: 12,
        top: 12
    },


    GradientCard : {
        position: 'absolute',
        width: SCREEN.width - 40,
        height : (SCREEN.width - 40) * (5/9),
        backgroundColor: '#ccc',
        borderRadius: 20,
        transform: [{scale: .90}, {translateY: SCREEN.width * .18},{translateX: -15}, {rotateX: '5deg'}, {rotateY: '-15deg'}, {perspective : 500}]
    },

    cardNumber: {
        position: 'absolute',
        width: "100%",
        height : SCREEN.width * .14,
        top: '45%',
        justifyContent: "center",
        alignItems :'center',

    },

    cardNumberText : {
        position: 'absolute',
        fontFamily : 'Credit-CardFont',
        fontSize : 19,
        color : "#FFF",
        opacity: .2
    },

    cardNumberShadow : {
        position: 'absolute',
        fontFamily : 'Credit-CardFont',
        fontSize : 19,
        color : "#576574",
        opacity: .3,
        transform: [{ translateX : 1}, { translateY: 1}]
    },

    cardNumberLight : {
        fontFamily : 'Credit-CardFont',
        fontSize : 19,
        color : "#FFFFFF",
        opacity: .6,
        transform: [{ translateX : -1}, { translateY: -1}]
    },

    cardInfo : {
        position: 'absolute',
        width: "100%",
        bottom : 0,
        left : 0,
        flexDirection: "column",
        padding: SCREEN.width * .04
    },

    cardDate : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 10,
        color : "#333",
        opacity: .5
    },

    cardName : {
        fontFamily : 'Credit-CardFont',
        fontSize : 13,
        color : "#333",
        opacity: .6,
        marginTop: 2
    },

    cardStats : {
        position: 'absolute',
        width : '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        opacity: .8,
        bottom: 0,
        padding: SCREEN.width * .03
    },

    cardStatsCol : {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems : 'center'
    },

    cardStatsColTitle : {
        fontFamily : 'Montserrat-Bold',
        fontSize : 10,
        color : "#fff",
        marginBottom: 4,
        opacity: .6
    },

    cardStatsColValue : {
        fontFamily : 'Credit-CardFont',
        fontSize : 15,
        color : "#fff",
    },



    
   

}); 

export default CreditCard;