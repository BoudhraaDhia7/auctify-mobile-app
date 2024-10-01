import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';


const HrOuter = () => {

    return(
        <View style={styles.container}>
            <View style={styles.light}></View>
            <View style={styles.shadow}></View>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
    },

    shadow : {
        width: "100%",
        height: 1,
        backgroundColor: '#282551',
        opacity: .08
    },

    light : {
        width: "100%",
        height: 1,
        backgroundColor: '#FFF',
        opacity: .5
    }

   

}); 

export default HrOuter;