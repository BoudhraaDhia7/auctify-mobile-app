import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, FlatList } from 'react-native';
import { AuctionMembers } from '../../apis/interfaces';
import { toUtcDate } from '../../helpers';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    updateBetState : (v : boolean) => void;
    sendBet : (t: number) => void;
}


const ActiveBet = ({ updateBetState, sendBet} : Props) => {

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
        if (counter > 5) updateBetState(false);
    },[counter])

    const onSendBet = useCallback(() => {
        let clickTime = new Date().getTime();
        let duration: number = clickTime - entryTime;
        sendBet(duration);
    }, []);



    

    return(
        <View style={styles.container}>
           <View style={styles.progressContainer}>
            <AnimatedCircularProgress
                    size={100}
                    width={10}
                    fill={counter * 20}
                    tintColor="#00e0ff"
                    backgroundColor="rgba(255,255,255,.2)"
            />
            <TouchableOpacity style={styles.betButton} onPress={() => onSendBet()}>
                <LinearGradient style={styles.gradient} colors={["#0652C5", "#D4418E"]}>
                    <View style={styles.gradientText}>
                        <Text style={styles.btCounter}>{ 5 - counter}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
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
    },

    betButton : {
        position: 'absolute',
        width: 74,
        height: 74,
        borderRadius: 40,
        backgroundColor: "#CCC",
        left: 13,
        top: 13,
        overflow: 'hidden'
    },

    gradient :{
        position: "absolute",
        width: "100%",
        height : "100%",
        justifyContent: 'center',
        alignItems: "center"
    },

    gradientText : {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center"
    },

    btCounter : {
        fontFamily: 'Orbitron-Bold',
        fontSize: 30,
        color: '#FFF'
    }
   
   

}); 

export default ActiveBet;