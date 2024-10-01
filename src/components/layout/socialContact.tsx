import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';


type Props = {
    placeholder : string;
    secret : boolean;
    value : string;
    onChange : (val: string) => void;
}


const SocialContact = () => {

    return(
        <View style={styles.container}>

          <View style={styles.titleContainer}>
            <View style={styles.titleContainerLine}></View>
            <Text style={styles.titleLabel}>Contactez-nous</Text>
            <View style={styles.titleContainerLine}></View>
          </View>

          <View style={styles.socialLogosContainer}>
            <TouchableOpacity style={styles.socialLogo}>
                <Svg width="15.646" height="30" viewBox="0 0 15.646 30">
                    <Path id="icons8-facebook-f" d="M21.1,12.5H17.5v-3c0-1.548.126-2.523,2.344-2.523h1.3a1.5,1.5,0,0,0,1.5-1.5V3.6a1.5,1.5,0,0,0-1.384-1.507Q19.9,2,18.539,2C14.47,2,11.5,4.486,11.5,9.049V12.5h-3A1.5,1.5,0,0,0,7,14v3a1.5,1.5,0,0,0,1.5,1.5h3v12A1.5,1.5,0,0,0,13,32h3a1.5,1.5,0,0,0,1.5-1.5v-12l3.261,0a1.5,1.5,0,0,0,1.489-1.329l.344-2.994A1.5,1.5,0,0,0,21.1,12.5Z" transform="translate(-7 -2)" fill="#6999fb"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLogo}>
                <Svg width="30.319" height="30.319" viewBox="0 0 30.319 30.319">
                    <G id="Groupe_1" data-name="Groupe 1" transform="translate(-204 -198.681)">
                        <Path id="Tracé_1" data-name="Tracé 1" d="M234.024,210.871H232.8v-.062H219.16v6.063h8.567a9.1,9.1,0,1,1-2.533-9.824l4.288-4.288a15.115,15.115,0,1,0,4.542,8.111Z" fill="#ffb017"/>
                        <Path id="Tracé_2" data-name="Tracé 2" d="M205.748,206.784l4.981,3.653a9.078,9.078,0,0,1,14.465-3.389l4.288-4.288a15.131,15.131,0,0,0-23.734,4.024Z" fill="#dc2127"/>
                        <Path id="Tracé_3" data-name="Tracé 3" d="M219.16,229a15.092,15.092,0,0,0,10.163-3.935l-4.692-3.971a9.072,9.072,0,0,1-14.024-4.181l-4.943,3.809A15.147,15.147,0,0,0,219.16,229Z" fill="#4fa13c"/>
                        <Path id="Tracé_4" data-name="Tracé 4" d="M234.024,210.871l-.012-.062H219.16v6.063h8.567a9.122,9.122,0,0,1-3.1,4.223h0l4.692,3.97a14.668,14.668,0,0,0,5-11.224A15.214,15.214,0,0,0,234.024,210.871Z" fill="#0053a0"/>
                    </G>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLogo}>
                <Svg width="32.279" height="26" viewBox="0 0 32.279 26">
                    <Path id="icons8-twitter" d="M38.276,12.074a13.429,13.429,0,0,1-3.808,1.042,6.616,6.616,0,0,0,2.915-3.638,13.3,13.3,0,0,1-4.208,1.592A6.6,6.6,0,0,0,21.9,17.06,18.872,18.872,0,0,1,8.248,10.2a6.483,6.483,0,0,0-.9,3.3A6.549,6.549,0,0,0,10.3,18.968a6.742,6.742,0,0,1-3-.819v.077a6.583,6.583,0,0,0,5.31,6.438,6.586,6.586,0,0,1-1.74.236,7.037,7.037,0,0,1-1.248-.121,6.634,6.634,0,0,0,6.184,4.56,13.381,13.381,0,0,1-8.225,2.81A13.1,13.1,0,0,1,6,32.055,18.925,18.925,0,0,0,16.15,35,18.628,18.628,0,0,0,34.992,16.321c0-.284-.009-.568-.022-.847a13.029,13.029,0,0,0,3.306-3.4" transform="translate(-5.997 -9)" fill="#03a9f4"/>
                </Svg>

            </TouchableOpacity>
          </View>

        </View>
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        flexDirection:'column',
        justifyContent: "center",
        alignItems: 'center',
    },

    titleContainer : {
        width : '100%',
        flexDirection: 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center',
    },

    titleContainerLine : {
        flex : 1,
        height : 1,
        backgroundColor : "#707070",
    },

    titleLabel : {
        fontFamily: "Montserrat-Regular",
        fontSize: 11,
        color: "#707070",
        paddingHorizontal: 8,
    },

    socialLogosContainer : {
        width: '100%',
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop: 10,
    },

    socialLogo : {
        width: 60,
        height : 60,
        margin : 8,
        backgroundColor: 'rgba(255,255,255,.9)',
        borderRadius : 16,
        justifyContent : 'center',
        alignItems : 'center',
    }
  

}); 

export default SocialContact;