import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, FlatList } from 'react-native';
import { AuctionMembers } from '../../apis/interfaces';


type Props = {
    members : AuctionMembers[];
}

type ItemProps = {member: AuctionMembers};

const Item = ({member}: ItemProps) => (
  <View style={styles.memberItem}>
    {<Image source={{ uri : member.avatar }} style={styles.memberItemPict} />}
    
  </View>
);


const AuctionMembersList = ({members} : Props) => {

    return(
        <View style={styles.container}>
            <FlatList 
                horizontal
                data={members}
                renderItem={({item}) => <Item member={item} />}
                keyExtractor={item => item._id}
            />
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    memberItem : {
        width: 36,
        height: 36,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        justifyContent: 'center', alignItems: 'center'
    },

    memberItemPict : {
        width: "100%",
        height: '100%',
        resizeMode: 'cover'
    }

   
   

}); 

export default AuctionMembersList;