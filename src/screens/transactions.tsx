import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, ScrollView } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';


import { SCREEN, globalStyles } from '../assets/styles/global';
import BackSection from '../components/layout/BackSection';
import TransactionItem from '../components/layout/transactions/transactionItem';
import HrOuter from '../components/layout/general/hrOuter';


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { creditDate, creditNumber } from '../helpers';
import CreditCard from '../components/layout/general/creditCard';
import LinearGradient from 'react-native-linear-gradient';

type TransactionsScreenProp = NativeStackNavigationProp<RootStackParamList, 'Transactions'>;

const Transactions = () => {

    const navigation = useNavigation<TransactionsScreenProp>();

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const backAction = () => {
            navigation.replace('Profil');
            return true;
        }
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress", backAction
        );
    
        return () => backHandler.remove();

    }, []);

    const navigateTo = (sc: any) => {
        navigation.replace(sc);
    }

    useEffect(() => {
        changeNavigationBarColor("#FFFFFF", true);
    }, [])


    const [statusBg, setStatusBg] = useState<string>("transparent");
    const [statusContent, setStatusContent] = useState<string>("dark-content");

    return(
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content"  backgroundColor = { statusBg } translucent = {true} animated = {true} />
            <LinearGradient
                colors={['#b2c6e7', '#ffffff', '#9AB6EB']}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}}
                style={globalStyles.bgOverlay}
            />
            <View style={globalStyles.bgOverlay}></View>
            
            <BackSection label="Mes Solde" navigateTo={navigateTo} from='Profil' />

            {/* <View style={styles.creditCardContainer}>
                <View style={styles.creditCard}>
                    <Image style={{...styles.creditCard, left: 0}} source={require('../assets/images/carte_credit01.png')} />
                    <Image style={{...styles.cardLogo}} source={require('../assets/images/logo.png')} />
                    <Text style={styles.cardNumberShadow}>{creditNumber(profile.profileInfo?.wallet_code ? profile.profileInfo?.wallet_code : 0)}</Text>
                    <Text style={styles.cardNumberLight}>{creditNumber(profile.profileInfo?.wallet_code ? profile.profileInfo?.wallet_code : 0)}</Text>
                    <Text style={styles.cardNumber}>{creditNumber(profile.profileInfo?.wallet_code ? profile.profileInfo?.wallet_code : 0)}</Text>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardDate}>{creditDate(profile.profileInfo?.created_at ? profile.profileInfo?.created_at : '')}</Text>
                        <Text style={styles.cardName}>{(profile.profileInfo?.firstName + " " + profile.profileInfo?.lastName).toUpperCase()}</Text>
                    </View>

                    <View style={styles.cardStats}>
                        <View style={styles.cardStatsCol}>
                            <Text style={styles.cardStatsColTitle}>REVENUES</Text>
                            <Text style={styles.cardStatsColValue}>{profile.profileInfo?.amountRecieved}</Text>
                        </View>
                        <View style={styles.cardStatsCol}>
                            <Text style={styles.cardStatsColTitle}>DEPONSES</Text>
                            <Text style={styles.cardStatsColValue}>{profile.profileInfo?.amountSent}</Text>
                        </View>
                        <View style={styles.cardStatsCol}>
                            <Text style={styles.cardStatsColTitle}>SOLDE</Text>
                            <Text style={styles.cardStatsColValue}>{profile.profileInfo?.solde}</Text>
                        </View>
                    </View>
                </View>  
            </View> */}
            
            <View style={{ width : "100%"}}>
                <CreditCard />
            </View>


            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Transactions</Text>
            </View>
            <HrOuter />

            <ScrollView style={styles.transactionsScroll}>
                <View style={styles.transactionsContainer}>
                    <TransactionItem date="01-04/2023" action='Alimentation portfeuil' profile='Solde Wallet' value={50} />
                    <TransactionItem date="02-04/2023" action="J'ai reçu des fonds" profile='Ines Letaief' value={110} />
                    <TransactionItem date="03-04/2023" action="J'ai donné des fonds" profile='Wael Latiri' value={84} />
                    <TransactionItem date="01-04/2023" action='Alimentation portfeuil' profile='Solde Wallet' value={50} />
                    <TransactionItem date="02-04/2023" action="J'ai reçu des fonds" profile='Ines Letaief' value={110} />
                    <TransactionItem date="03-04/2023" action="J'ai donné des fonds" profile='Wael Latiri' value={84} />
                    <TransactionItem date="01-04/2023" action='Alimentation portfeuil' profile='Solde Wallet' value={50} />
                    <TransactionItem date="02-04/2023" action="J'ai reçu des fonds" profile='Ines Letaief' value={110} />
                    <TransactionItem date="03-04/2023" action="J'ai donné des fonds" profile='Wael Latiri' value={84} />
                </View>
            </ScrollView>
           

        </View>
        
    )
}

export const styles = StyleSheet.create({

    creditCardContainer : {
        width: "100%",
        flexDirection: 'column',
    },

    creditCard : {
        width : SCREEN.width + 20,
        height : (SCREEN.width + 20) * (1180 / 1702),
        resizeMode: 'contain',
        left : -10,
    },

    cardLogo : {
        position : 'absolute',
        width: 60,
        height : 60,
        resizeMode : 'contain',
        top: 20,
        left : 40
    },

    cardNumber : {
        position: 'absolute',
        width : '100%',
        textAlign: "center",
        left: 0,
        top : 114,
        fontFamily : 'Credit-CardFont',
        fontSize : 19,
        color : "#D3AEF7",
        opacity: .3
    },

    cardNumberShadow : {
        position: 'absolute',
        width : '100%',
        textAlign: "center",
        left: 1,
        top : 115,
        fontFamily : 'Credit-CardFont',
        fontSize : 19,
        color : "#878688",
        opacity: .4
    },

    cardNumberLight : {
        position: 'absolute',
        width : '100%',
        textAlign: "center",
        left: -1,
        top : 113,
        fontFamily : 'Credit-CardFont',
        fontSize : 19,
        color : "#FFFFFF",
        opacity: .9
    },

    cardInfo : {
        position: 'absolute',
        left: "10%",
        top : '56%',
        flexDirection: "column",

    },

    cardDate : {
        fontFamily : 'Credit-CardFont',
        fontSize : 11,
        color : "#FFFFFF",
        opacity: .9
    },

    cardName : {
        fontFamily : 'Credit-CardFont',
        fontSize : 15,
        color : "#FFFFFF",
        opacity: .8,
        marginTop: 2
    },

    cardStats : {
        position: 'absolute',
        left: "12%",
        top : '76%',
        width : '76%',
        height: "16%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        opacity: .8

    },

    cardStatsCol : {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems : 'center'
    },

    cardStatsColTitle : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 10,
        color : "#333",
        marginBottom: 4,
        opacity: .6
    },

    cardStatsColValue : {
        fontFamily : 'Credit-CardFont',
        fontSize : 15,
        color : "#333",
    },

    transactionsScroll : {
        width: '100%',
        flex: 1,
        height : 200,
        marginTop : 0
    },

    transactionsContainer : {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop : 10
    },

    sectionTitleContainer : {
        width: "100%",
        paddingHorizontal : 20,
        paddingVertical : 10
    },

    sectionTitle : {
        fontFamily : 'Montserrat-Bold',
        fontSize : 14,
        color : "#333",
    }
  

}); 



export default Transactions;