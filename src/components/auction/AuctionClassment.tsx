import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, FlatList } from 'react-native';
import { AuctionClassment, AuctionMembers } from '../../apis/interfaces';
import { toUtcDate } from '../../helpers';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type Props = {
    member : AuctionClassment;
    index : number;
}


const AuctionClassmentItem = ({ member, index } : Props) => {

    return(
        <View style={styles.auctionClassMember}>
           <Text style={styles.classment}>{index}</Text>
           <View style={styles.classMember}>
                <View style={styles.classAvatar}>
                    <Image source={{ uri : member.betAvatar }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </View>
                <Text style={styles.classNickName}>{member.betUserName}</Text>
           </View>
           <Text style={styles.classSolde}>{member.totalSolde}</Text>
        </View>
        
    )
}

export const styles = StyleSheet.create({

    auctionClassMember :{
        width : '100%',
        minHeight: 60,
        backgroundColor : 'rgba(255,255,255,.2)',
        borderRadius : 10,
        borderColor : 'rgba(255,255,255,.4)',
        borderWidth : 1,
        marginBottom : 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight : 16
    },

    classment : {
        width: 60,
        fontFamily: 'Orbitron-Bold',
        fontSize: 28,
        color: '#FFF',
        textAlign: 'center',
        borderRightColor: 'rgba(255,255,255,.5)',
        borderRightWidth : 1
    },

    classMember : {
        flexDirection: 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        flex: 1,
        paddingHorizontal: 10
    },

    classSolde : {
        fontFamily: 'Orbitron-Bold',
        fontSize: 16,
        color: '#FFF',
    },

    classAvatar : {
        width: 36,
        height : 36,
        marginRight : 5,
        borderRadius : 20,
        backgroundColor: "#ccc"
    },

    classNickName : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#FFF',
    }
   
   

}); 

export default AuctionClassmentItem;