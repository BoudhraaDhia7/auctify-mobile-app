import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { toUtcDate } from '../../helpers';
import { SCREEN } from '../../assets/styles/global';


type Props = {
    openDate : string;
}


const AuctionTimer = ({openDate} : Props) => {

    const [ timeDiff, setTimeDiff ] = useState<number>(0);
    const [ timeDiffText, setTimeDiffText ] = useState<string>('');

    const counter = () => {
        const diff = toUtcDate()?.getTime() - toUtcDate(openDate)?.getTime();
        const diffText = (new Date(diff).getUTCHours() >= 10 ? new Date(diff).getUTCHours() : '0'+ new Date(diff).getUTCHours()  )
                         + '' + (new Date(diff).getUTCMinutes() >= 10 ? new Date(diff).getUTCMinutes() : '0'+ new Date(diff).getUTCMinutes()  )
                         + '' + (new Date(diff).getUTCSeconds() >= 10 ? new Date(diff).getUTCSeconds() : '0'+ new Date(diff).getUTCSeconds()  );
        setTimeDiff(diff);
        setTimeDiffText(diffText);
    }

    useEffect(() => {
        counter();
        const interval = setInterval(() => {
            counter();
        }, 1000);
        
          return () => clearInterval(interval);

    }, [])

    return(
        <>
        <View style={styles.container}>
            <View style={{ width : "25%" }}><Text style={styles.auctionTimerText}>{timeDiffText.slice(0,2)}</Text></View>
            <View style={{ width : "5%" }}><Text style={styles.auctionTimerText}>:</Text></View>
            <View style={{ width : "25%" }}><Text style={styles.auctionTimerText}>{timeDiffText.slice(2,4)}</Text></View>
            <View style={{ width : "5%" }}><Text style={styles.auctionTimerText}>:</Text></View>
            <View style={{ width : "25%",  alignItems: "flex-end" }}><Text style={styles.auctionTimerText}>{timeDiffText.slice(4,6)}</Text></View>
        </View>
           
        </>
        
    )
}

export const styles = StyleSheet.create({

    container : {
        width: "100%",
        height : 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal : 16,
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius : 14,
        borderTopEndRadius : 0,
        borderTopLeftRadius : 0,
        marginTop: 0
    },

    auctionTimerText : {
        fontFamily: 'Orbitron-Bold',
        fontSize: (SCREEN.width - 32) * .11,
        color: '#FFF'
    }
   
   

}); 

export default AuctionTimer;