import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import { STATUSBAR_HEIGHT } from '../../assets/styles/global';


type Props = {
    label : string;
    logo? : boolean;
    avatar? : boolean;
    navigateTo : (sc: string) => void;
    from: string
}


const BackSection = ({ label, logo, avatar, navigateTo, from } : Props) => {

    return(
        <>
            <View style={styles.statusBarContainer}></View>
            <View style={styles.backSection}>
                <View style={styles.backContainer}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigateTo(from)}>
                        <Icon name="chevron-left" size={34} color="#333" />
                    </TouchableOpacity>
                    <Text  style={styles.backLabel}>{ label }</Text>
                </View>
                { logo && <Image  style={styles.backLogo} source={require("../../assets/images/logo.png")} />}
            </View>
        </>
    )
}

export const styles = StyleSheet.create({

    statusBarContainer : {
        width: "100%",
        height : STATUSBAR_HEIGHT,
    },

    backSection : {
        width: "100%",
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal : 10,
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

    backLogo : {
        width : 60,
        height : 60,
        resizeMode : 'contain',
    }
  

}); 

export default BackSection;