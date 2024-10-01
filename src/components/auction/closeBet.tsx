import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, FlatList } from 'react-native';
import { AuctionMembers } from '../../apis/interfaces';
import { toUtcDate } from '../../helpers';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    stopPlaying : () => void;
}


const CloseBet = ({ stopPlaying } : Props) => {

    const [ counter, setCounter ] = useState<number>(0);
    const entryTime: number = new Date().getTime();

    useEffect(() => {
        setCounter(0);
        const interval = setInterval(() => {
            setCounter( v => v + 1);
        }, 1000);
        
        return () => clearInterval(interval);

    }, [])

    useEffect(() => {
        if (counter > 15) stopPlaying();
    },[counter])
   

    return(
        <View style={styles.container}>
           
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        width: 100,
        height: 100,
    },

   
   
   

}); 

export default CloseBet;