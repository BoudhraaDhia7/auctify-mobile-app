import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, Keyboard, KeyboardTypeOptions } from 'react-native';
import { colorShema } from '../../../assets/styles/global';


type Props = {
    keyboard : KeyboardTypeOptions;
    placeholder : string;
    secret : boolean;
    value? : string;
    defaultValue? : string,
    onChange : (val: string) => void;
}


const InscriptionInput = ({ keyboard, placeholder, secret, value, defaultValue, onChange } : Props) => {

    return(
        <View style={styles.inputContainer}>
            <View style={styles.container}>
                <TextInput style={styles.input} keyboardType={keyboard} defaultValue={defaultValue} autoCapitalize='none' placeholder={placeholder} onChangeText={(val:string) => onChange(val)} secureTextEntry={secret} value={value} />
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{placeholder}</Text>
            </View>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    inputContainer : {
        width: "100%",
        height : 73,
        marginBottom: 2,
    },

    container : {
        width: "100%",
        height : 60,
        borderRadius : 16,
        paddingHorizontal: 12,
        borderColor : "#bdc3c7",
        borderWidth : 1,
        marginTop: 13
    },

    input : {
        width: "100%",
        height: 58,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: "#000"
    },

    labelContainer : {
        position: "absolute",
        height: 26,
        backgroundColor: "#FFF",
        top: 0,
        left: 16,
        borderRadius: 6,
        borderBottomRightRadius: 0,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 12,
    },

    label : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: "#333"
    },

}); 

export default InscriptionInput;