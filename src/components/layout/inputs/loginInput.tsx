import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { colorShema } from '../../../assets/styles/global';


type Props = {
    placeholder : string;
    secret : boolean;
    value : string;
    onChange : (val: string) => void;
}


const LoginInput = ({ placeholder, secret, value, onChange } : Props) => {

    return(
        <View style={styles.container}>
            <TextInput style={styles.input} autoCapitalize='none' placeholder={placeholder} onChangeText={(val:string) => onChange(val)} secureTextEntry={secret} value={value} />
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{placeholder}</Text>
            </View>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        height : 60,
        backgroundColor : "rgba(255,255,255,.46)",
        borderRadius : 16,
        overflow: 'hidden',
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    input : {
        width: "100%",
        height: 58,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: "#000",
        borderWidth: 1, 
        borderColor: '#ddd',
        borderRadius: 8,
    },

    labelContainer : {
        position: "absolute",
        width: 120,
        height: 26,
        backgroundColor: colorShema.secondary80,
        top: 0,
        right: 0,
        borderRadius: 6,
        borderBottomRightRadius: 0,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 12,
    },

    label : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 11,
        color: "#FFF"
    },

}); 

export default LoginInput;