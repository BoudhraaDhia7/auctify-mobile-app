import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, FlatList } from 'react-native';
import { AuctionMembers } from '../../apis/interfaces';
import { toUtcDate } from '../../helpers';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type Props = {
    updateBetState : (v : boolean) => void;
}


const InactiveBet = ({ updateBetState} : Props) => {

    const [ counter, setCounter ] = useState<number>(0);

    useEffect(() => {
        setCounter(0);
        const interval = setInterval(() => {
            setCounter( v => v + 1);
        }, 1000);
        
        return () => clearInterval(interval);

    }, [])

    useEffect(() => {
        if (counter > 2) updateBetState(true);
    },[counter])

    return(
        <View style={styles.container}>
           <View>
           <AnimatedCircularProgress
                size={100}
                width={10}
                fill={counter * 50}
                tintColor="rgba(255,255,255,.5)"
                backgroundColor="rgba(255,255,255,.2)"
            />
           </View>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: 100,
        height: 100,
    },

    progressContainer : {
        position: "absolute",
        width: "100%",
        height : "100%"
    }
   
   

}); 

export default InactiveBet;