import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colorShema } from '../../../assets/styles/global';


type Props = {
    solde : number;
    value : number;
    selectPack : (d : number, v : number) => void;
}


const PackItem = ({ solde, value, selectPack } : Props) => {

    return(
        <View style={styles.profilStats}>
            <LinearGradient style={styles.profilStat} colors={['rgba(255,255,255,.2)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,.3)']}>
                <View style={styles.profilStatHeader}>
                    <View style={styles.statIcon}><Icon name="credit-card" size={22} color="#333" /></View>
                    <Text style={styles.statTitle}>Pack {solde} TDN</Text>
                </View>
                <View style={styles.profilStatContent}>
                    <View style={{ flexDirection : 'row', alignItems: 'flex-end'}}>
                        <Text style={styles.soldeVal}>{value}</Text>
                        <Text style={styles.soldeCurr}>TND</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.buyButton} onPress={() => selectPack(solde, value)}>
                        <View style={styles.statIcon}><Icon name="shopping-cart" size={18} color="#FFF" /></View>
                        <Text style={styles.buyText}>Acheter</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    profilStats : {
        width: '100%',
        flexDirection: 'column',
        justifyContent :'center',
        alignItems : 'center',
        marginBottom : 10,
        borderTopColor : "#FFF",
        borderTopWidth : 1,
        borderLeftColor : "#FFF",
        borderLeftWidth : 1,
        borderRightColor: "rgba(63,70,104,.1)",
        borderRightWidth: 1,
        borderBottomColor: "rgba(63,70,104,.1)",
        borderBottomWidth: 1,
        borderRadius : 20,
    },
    
    profilStat : {
        width: '100%',
        minHeight : 80,
        borderRadius : 20,
        overflow : 'hidden',
        paddingHorizontal : 20,
    },

    profilStatHeader : {
        width : '100%',
        flexDirection :'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        paddingVertical : 12
    },

    statIcon : {
        marginRight : 10,
    },

    statTitle : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 14,
        color: '#333'
    },

    profilStatContent : {
        width : '100%',
        flexDirection :'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop: 4,
        marginBottom : 10,
    },

    soldeVal : {
        fontFamily: 'Credit-CardFont',
        fontSize : 22,
        color: '#333'
    },

    soldeCurr :{
        fontFamily: 'Montserrat-Bold',
        fontSize : 11,
        color: '#333',
        paddingLeft : 6,
        paddingBottom: 3
    },

    buyButton : {
        paddingHorizontal : 16,
        height : 42,
        borderRadius : 20,
        // backgroundColor : 'rgba(255,255,255,.6)',
        backgroundColor: colorShema.secondary,
        flexDirection :'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },

    buyText : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 11,
        color: '#FFF'
    },

    
}); 

export default PackItem;