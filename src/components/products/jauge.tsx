import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { colorShema, globalStyles } from '../../assets/styles/global';

type Props = {
    pourcent : number;
}

const Jauge = ( { pourcent } : Props) => {

    return(
        <View style={styles.jauge}>
            <View style={[styles.jaugeProgress, {height : `${pourcent}%`}]}></View>
            <View style={styles.jaugeInfo}>
                <View style={styles.icon}>
                    <Svg width="10.975" height="10.562" viewBox="0 0 10.975 10.562">
                        <G id="Groupe_11" data-name="Groupe 11" transform="translate(-344.933 -603.442)">
                            <G id="Groupe_10" data-name="Groupe 10">
                            <Path id="Tracé_6" data-name="Tracé 6" d="M349.608,612.793h-.235v-.539a.572.572,0,0,0-.572-.572h-2.489a.572.572,0,0,0-.572.572v.539h-.235a.572.572,0,0,0-.572.572V614h5.248v-.639A.572.572,0,0,0,349.608,612.793Z"/>
                            <Path id="Tracé_7" data-name="Tracé 7" d="M355.585,610.4l-4.1-2.762.217-.324a.927.927,0,0,0,.106-.828c.357-.491.672-.136.916-.6s-.055-.912-1.235-1.706-1.7-.913-2.046-.5c-.328.389.084.549-.184,1.029a.929.929,0,0,0-.822.41l-1.3,1.926a.927.927,0,0,0-.075.906c-.323.341-.608.072-.834.5-.25.476.056.912,1.236,1.706s1.7.913,2.046.5c.322-.383-.071-.544.171-1.007a.928.928,0,0,0,.721-.409l.264-.392,4.1,2.762a.73.73,0,1,0,.815-1.211Z"/>
                            </G>
                        </G>
                    </Svg>
                </View>
                <Text style={styles.pourcent}>{pourcent.toFixed(0)}%</Text>
            </View>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    jauge : {
        width: 30,
        height : 70,
        backgroundColor : colorShema.jaugeBg,
        borderRadius : 6,
        overflow: 'hidden',
    },

    jaugeProgress: {
        position: 'absolute',
        width: "100%",
        height: 30,
        borderRadius : 6,
        backgroundColor : colorShema.primary,
        bottom : 0,
        left: 0,
    },

    jaugeInfo : {
        position: 'absolute',
        width : '100%',
        bottom : 6,
        left : 0,
        flexDirection: "column",
        justifyContent : 'center',
        alignItems: 'center',
    },

    icon : {
        width: "100%",
        height: 12,
        marginBottom: 0,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ scale: 1.2}]
    },

    pourcent : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        color: '#000',
        opacity: .8,
    }

}); 


export default Jauge;

