import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, BackHandler, ScrollView } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { SCREEN, globalStyles } from '../assets/styles/global';
import BackSection from '../components/layout/BackSection';
import TransactionItem from '../components/layout/transactions/transactionItem';
import HrOuter from '../components/layout/general/hrOuter';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import CreditCard from '../components/layout/general/creditCard';
import LinearGradient from 'react-native-linear-gradient';
import {  getTransaction } from '../stores/profileSlice';
import { ActivityIndicator } from 'react-native';

type TransactionsScreenProp = NativeStackNavigationProp<RootStackParamList, 'Transactions'>;

const Transactions = () => {

    const navigation = useNavigation<TransactionsScreenProp>();

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [transactions, setTransactions] = useState<any>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await getTransaction(profile.profileInfo?._id ? profile.profileInfo?._id : '')

            if (res) {
                setTransactions(res);
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [dispatch, profile.profileInfo?._id]);

    

    const navigateTo = (sc: any) => {
        navigation.replace(sc);
    }

    useEffect(() => {
        changeNavigationBarColor("#FFFFFF", true);
    }, [])


    const [statusBg, setStatusBg] = useState<string>("transparent");

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
            
            <View style={{ width : "100%"}}>
                <CreditCard />
            </View>


            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Transactions</Text>
            </View>
            <HrOuter />

          

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : transactions.length > 0 ? (  <ScrollView style={styles.transactionsScroll}>
                <View style={styles.transactionsContainer}>
                    {/* <TransactionItem date="01-04/2024" action='Alimentation portfeuil' profile='Solde Wallet' value={50} />
                    <TransactionItem date="02-04/2024" action="J'ai reçu des fonds" profile='Mehdi Belgacem' value={110} />
                    <TransactionItem date="03-04/2024" action="J'ai donné des fonds" profile='Mohamed ben ahmed' value={84} />
                    <TransactionItem date="01-04/2024" action='Alimentation portfeuil' profile='Solde Wallet' value={50} />
                    <TransactionItem date="02-04/2024" action="J'ai reçu des fonds" profile='Mehdi Belgacem' value={110} />
                    <TransactionItem date="03-04/2024" action="J'ai donné des fonds" profile='Mohamed ben ahmed' value={84} />
                    <TransactionItem date="01-04/2024" action='Alimentation portfeuil' profile='Solde Wallet' value={50} />
                    <TransactionItem date="02-04/2024" action="J'ai reçu des fonds" profile='Mehdi Belgacem' value={110} />
                    <TransactionItem date="03-04/2024" action="J'ai donné des fonds" profile='Mohamed ben ahmed' value={84} /> */}
                    {transactions.map((transaction: any) => (
                        <TransactionItem key={transaction._id} date={transaction.formattedDate} action={"J'ai reçu des fonds"} profile={transaction.userProfile?.username ?? 'Mehdi Belgacem'} value={transaction.amount} />
                    ))}
                </View>
            </ScrollView>
            ) : (
                <View style={styles.noTransactionsContainer}>
                    <Text style={styles.noTransactionsText}>Aucune transaction disponible.</Text>
                </View>
            )}

           

        </View>
        
    )
}

export const styles = StyleSheet.create({
    noTransactionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    
    noTransactionsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },


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