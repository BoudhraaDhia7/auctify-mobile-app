import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, ScrollView } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Shadow } from 'react-native-neomorph-shadows-fixes';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import { SCREEN, colorShema, globalStyles } from '../assets/styles/global';
import BackSection from '../components/layout/BackSection';
import TransactionItem from '../components/layout/transactions/transactionItem';
import HrOuter from '../components/layout/general/hrOuter';


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import PackItem from '../components/layout/transactions/packItem';
import HrInner from '../components/layout/general/hrinner';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { creditDate, creditNumber } from '../helpers';
import { getProfileInfo, setProfileInfo } from '../stores/profileSlice';
import BottomWindow from '../components/layout/general/bottomWindow';
import CreditCard from '../components/layout/general/creditCard';
import { getAllPack } from '../apis/actions';

type TransactionsScreenProp = NativeStackNavigationProp<RootStackParamList, 'Transactions'>;

const Cart = () => {

    const navigation = useNavigation<TransactionsScreenProp>();

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [statusBg, setStatusBg] = useState<string>("transparent");
    const [statusContent, setStatusContent] = useState<string>("dark-content");

    const [ isBottomWindow, setIsBottomWindow ] = useState<boolean>(false);
    const [ selectedBottom, setSelectedBottom ] = useState<string>('SEND_DANNOS');

    const thisGetProfileInfo = async(id : string) => {
        const data = await getProfileInfo(id);
        if ( data ) {
            dispatch(setProfileInfo(data))
        }
    }
    const [cardPacks, setCardPacks] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    //function to get all card packs getAllPack()
    useEffect(() => {
        const fetchCardPacks = async () => {
            try {
                const packs = await getAllPack();
                if (packs) {
                    setCardPacks(packs);
                } else {
                    setCardPacks([]); 
                }
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchCardPacks();
    }, []);

    useEffect(() => {
        thisGetProfileInfo(profile.connexionInfo.idClient);
    }, [])

    useEffect(() => {
        const backAction = () => {
            navigation.replace('Main');
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

    const selectPack = (d: number, v : number) => {
        console.log(d, v);
    }

    const closeBottomWindow = () => {
        setIsBottomWindow(false);
    }

    const selectBottomSection = (sel: string) => {
        setSelectedBottom(sel)
        setIsBottomWindow(true);
    }

    return(
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content"  backgroundColor = { statusBg } translucent = {true} animated = {true} />
            <LinearGradient
                colors={['#b2c6e7', '#ffffff', '#9AB6EB']}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}}
                style={globalStyles.bgOverlay}
            />
            {/* <LinearGradient style={globalStyles.appBg} colors={["#9C75FF", "#6FA1FF", "#9C75FF"]}></LinearGradient> */}
            <View style={globalStyles.bgOverlay}></View>
            
            <BackSection label="Packs Solde" navigateTo={navigateTo} from='Main' />

            <CreditCard />

            {/* <View style={{ width : '100%', paddingTop : 10, paddingHorizontal : 20}}><HrInner /></View> */}
            

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Chargement...</Text>
                </View>
            ) : (
                <ScrollView style={styles.transactionsScroll}>
                    <View style={styles.transactionsContainer}>
                        {cardPacks.length > 0 ? (
                            cardPacks.map((pack : any) => (
                                <PackItem
                                    key={pack._id}
                                    solde={pack.realValue}
                                    value={pack.realValue}
                                    selectPack={selectPack}
                                />
                            ))
                        ) : (
                            <Text style={styles.noPacksText}>Nous ajouterons bientôt des packs.</Text>
                        )}
                    </View>
                </ScrollView>
            )}

            <View style={styles.sectionGetSend}>
                <TouchableOpacity style={styles.GetSendItem} onPress={() => selectBottomSection("SEND_DANNOS")}>
                    <Icon name="corner-left-up" size={24} color="#fff" />
                    <Text style={styles.GetSendText}>Envoi Solde</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.GetSendItem} onPress={() => selectBottomSection("REQUEST_DANNOS")}>
                    <Icon name="corner-left-down" size={24} color="#fff" />
                    <Text style={styles.GetSendText}>Demande Solde</Text>
                </TouchableOpacity>
                
            </View>

            
            {/* <View style={styles.packContainer}>
                <Shadow
                useArt // <- set this prop to use non-native shadow on ios
                style={{
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: .1,
                    shadowColor: "#333",
                    shadowRadius: 20,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255,255,255,1)',
                    width: SCREEN.width * .45,
                    height: 300,
                    left: 20
                }}
                >
                
                </Shadow>
            </View> */}

            {isBottomWindow && <BottomWindow close={closeBottomWindow} windowType={selectedBottom} />}

        </View>
        
    )
}

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#000',
    },

    noPacksText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
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
        paddingVertical : 10,
        marginTop: 10
    },

    sectionTitle : {
        fontFamily : 'Montserrat-Bold',
        fontSize : 14,
        color : "#333",
    },

    sectionGetSend : {
        paddingHorizontal : 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        marginTop: 0,
        paddingVertical: 16,
        backgroundColor: "#FFF",
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20
    },

    GetSendItem : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor : "#9C6CFE",
        width : '49%',
        paddingVertical: 14,
        borderRadius : 30
    },

    GetSendText : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 12,
        color : "#FFF",
        paddingLeft: 10,
    },
    
    packContainer : {
        flex: 1,
        width : '100%',
        backgroundColor: 'rgba(255,255,255, .6)',
        borderRadius: 20,
        marginTop: 10,
    }

}); 



export default Cart;