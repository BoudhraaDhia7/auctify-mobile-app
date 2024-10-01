import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colorShema } from '../../../assets/styles/global';
import { getInitialName } from '../../../helpers';


type Props = {
    date : string;
    action : string;
    profile : string;
    picture? : string;
    value : number;
}


const TransactionItem = ({date, action, profile, value, picture} : Props) => {

    return(
        <View style={styles.container}>
           <View style={styles.transactionItem}>
                <LinearGradient style={styles.transactionAvatar} colors={["#9C75FF", "#6FA1FF"]}>
                    <Text style={styles.avatarName}>{getInitialName(profile)}</Text>
                </LinearGradient>
                
                <View style={styles.transactionInfo}>
                    <Text style={styles.transactionDate}>{date}</Text>
                    <Text style={styles.transactionProfile}>{profile}</Text>
                    <Text style={styles.transactionAction}>{action}</Text>
                </View>
           </View>
           <Text style={styles.transactionValue}>{value}</Text>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        borderBottomColor : "rgba(255,255,255,.6)",
        borderBottomWidth : 1,
        paddingBottom: 10,
        marginBottom : 10
    },

    transactionItem : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems : 'center'
    },

    transactionAvatar : {
        width : 60,
        height : 60,
        borderRadius : 30,
        overflow: 'hidden',
        marginRight : 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    transactionInfo : {
        flexDirection : 'column',
        justifyContent: 'flex-start',
        alignItems : 'flex-start'
    },

    transactionDate : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 9,
        color : '#333'
    },

    transactionAction : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 11,
        color : '#333'
    },

    transactionProfile : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 14,
        color : '#333'
    },

    transactionValue : {
        fontFamily: 'Credit-CardFont',
        fontSize : 16,
        color : '#333'
    },

    avatarName : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 16,
        color : '#FFF'
    },


}); 

export default TransactionItem;