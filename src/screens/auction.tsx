import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, ScrollView } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import { SCREEN, STATUSBAR_HEIGHT, globalStyles } from '../assets/styles/global';


import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import BackSection from '../components/layout/BackSection';
import ParticipationsList from '../components/layout/products/participationsList';
import { disconnectSocket, initiateSocket, onJoinEnchere, onUnJoinEnchere, setJoinEnchere, onMiseAuctify, addMiseAuctify } from '../apis/socket';
import { MiseAuctifySended, UserInfoRecieved, UserInfoSended } from '../apis/socketInterface';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { getPlayerMise, removePlayer } from '../helpers';
import { AuctionClassment, AuctionMembers, ProductList } from '../apis/interfaces';
import { getAuctionById, getAuctionClassement, getAuctionMembers, winAuction } from '../apis/actions';
import AuctionMembersList from '../components/auction/AuctionMembers';
import { BASE_URL, PICT_URL } from '../apis/axiosConfig';
import AuctionTimer from '../components/auction/AuctionTimer';
import ActiveBet from '../components/auction/ActiveBet';
import InactiveBet from '../components/auction/InactiveBet';
import AuctionClassmentItem from '../components/auction/AuctionClassment';
import { getProfileInfo, setProfileInfo } from '../stores/profileSlice';
import CloseBet from '../components/auction/closeBet';



type AuctionScreenProp = NativeStackNavigationProp<RootStackParamList, 'Auction'>;

const Auction = () => {

    const navigation = useNavigation<AuctionScreenProp>();
    const navState = useRoute<RouteProp<RootStackParamList, 'Auction'>>();
    const { productId } = navState.params;

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [players, setPlayers] = useState<UserInfoRecieved[]>([]);
    
    const [auctionInfo, setAuctionInfo] = useState<ProductList[]>([]);
    const [auctionMembers, setAuctionMembers] = useState<AuctionMembers[]>([]);
    const [auctionClassment, setAuctionClassment] = useState<AuctionClassment[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [isBet, setIsBet] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isAuctionEndCounter, setIsAuctionEndCounter] = useState<boolean>(true);

    let mySolde : number = 0;

    const navigateTo = (sc: any) => {
        navigation.replace(sc);
    }

    useEffect(() => {
        mySolde = profile.profileInfo?.solde ? profile.profileInfo?.solde : 0;
        changeNavigationBarColor("transparent", false);
    }, [])

    useEffect(() => {
        console.log( "players ", players);
    }, [players])

    const onGetAuctionById = async () => {
        setIsDataLoaded(false);
        const infos = await getAuctionById(profile.connexionInfo.idClient, productId);
        if (infos) {
            setAuctionInfo(infos);
            setIsDataLoaded(true);
        }
       
        else {
            console.log("error")
            setIsDataLoaded(true);
        }
    }

    const onGetAuctionMembers = async () => {
        const mbrs = await getAuctionMembers(productId);
        if (mbrs) {
            setAuctionMembers(mbrs);
        }
        else {
            console.log("error")
        }
    }

    const onGetAuctionClassment = async () => {
        const auClass = await getAuctionClassement(profile.connexionInfo.idClient, productId);
        console.log("cla ", auClass);
        if (auClass) {
            setAuctionClassment(auClass);
            
        }
        else {
            console.log("error")
        }
    }

    useEffect(() => {
        onGetAuctionById();
        onGetAuctionMembers();
        onGetAuctionClassment();
    }, [])

    const updateBetState = (v : boolean) => {
        setIsBet(v)
    }

    const sendBet = (t : number) => {
        addMiseAuctify({ idUser : profile.profileInfo ? profile.profileInfo?._id : "",
            idProduct : productId,
            amount : 1,
            duration : t })
    }

    const updateProfile = async() => {
        if (profile.profileInfo) {
            const data = await getProfileInfo(profile.profileInfo?._id);
            if ( data ) {
                dispatch(setProfileInfo(data))
            }
        }
       
    }

    const stopPlaying = async () => {
        setIsBet(false);
        setIsPlaying(false);
        console.log('game over');
        setIsAuctionEndCounter(false);
        await winAuction(productId);
        setTimeout(() => {navigateTo("Main")}, 1500);
    }

    useEffect(() => {

        initiateSocket();

        setJoinEnchere({ idUser: profile.connexionInfo.idClient, idProduct: productId, nickname: profile.connexionInfo.pseudo, avatar: (profile.profileInfo?.avatar ? profile.profileInfo.avatar : ""), amount: 0 });

        onJoinEnchere((err: any, data: UserInfoRecieved) => {
            console.log("join ", data); 
            if (err) return;
            if (data.idProduct == productId) {
                onGetAuctionMembers();
            }
        });

        onUnJoinEnchere((err: any, idSocket: string) => {
            if (err) return;
            onGetAuctionMembers();
        });

        onMiseAuctify((err: any, data: MiseAuctifySended) => {
            if (err) return;
            if (data.idProduct == productId) {
                setIsBet(false);
                onGetAuctionClassment();
                updateProfile();
                setIsAuctionEndCounter(false);
                setTimeout(() => {setIsAuctionEndCounter(true);}, 100);
            }
            
        });

        return () => { disconnectSocket() }

    }, [])


    
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" backgroundColor={"transparent"} translucent={true} animated={true} />
            <View style={[styles.container]} >
                <LinearGradient style={styles.bg} colors={["#9C75FF", "#6FA1FF"]}>
                < View style={styles.auctionContainer}>
                    <View style={styles.header}>
                        <View style={styles.membersContainer}>
                            {<AuctionMembersList members={auctionMembers} />}
                        </View>
                        <TouchableOpacity style={styles.auctionClose} onPress={() => navigateTo("Home")}>
                            <Icon name='x' size={32} color={'#FFF'} />
                        </TouchableOpacity>
                    </View>

                    { isDataLoaded && <View style={styles.productContainer}>
                        <View style={styles.productContainerBg}>
                            <View style={styles.auctionProdInfo}>
                                <Text style={styles.auctionProdInfoTitle}>{auctionInfo[0].prodName}</Text>
                                <Text style={styles.auctionProdInfoPrice}>prix magasin</Text>
                                <Text style={styles.auctionProdInfoPriceValue}>{auctionInfo[0].prodPrice}</Text>
                            </View>
                        </View>
                        <View style={styles.productContainerBase}>
                            <View style={styles.auctionStat}>
                                <Text style={styles.auctionStatTitle}>Membres actifs</Text>
                                <Text style={styles.auctionStatValue}>{auctionMembers.length}</Text>
                            </View>
                            <View style={styles.auctionStat}>
                                <Text style={styles.auctionStatTitle}>Montant enchère</Text>
                                { auctionClassment.length > 0 && <Text style={styles.auctionStatValue}>{auctionClassment[0].totalSolde}</Text>}
                            </View>
                        </View>
                        <Image source={{ uri : BASE_URL + auctionInfo[0].prodPicture[0].filePath }} style={styles.productPicture} />
                    </View>}

                    { isDataLoaded && <View style={styles.auctionTimerContainer}>
                        <View style={styles.auctionTimer}>
                            <AuctionTimer openDate={auctionInfo[0].openDate} />
                        </View>
                    </View>}

                    <View style={styles.auctionClassment}>
                        {
                            auctionClassment.slice(0,3).map(( c, i ) => 
                                <AuctionClassmentItem key={`cc-${i+1}`} member={c} index={i+1} />
                            )
                        }
                        
                    </View>

                    <View style={styles.miseContainer}>
                        <View style={styles.mesSolde}>
                            <Text style={styles.ttValue}>Mon Solde</Text>
                            <Text style={styles.nbrValue}>{profile.profileInfo?.solde}</Text>
                        </View>

                        {( isPlaying && isBet) ? <ActiveBet updateBetState={updateBetState} sendBet={sendBet} /> : <InactiveBet updateBetState={updateBetState} /> }
             
                        <View style={styles.mesMise}>
                            <Text style={styles.ttValue}>Mes Mises</Text>
                            <Text style={styles.nbrValue}>{getPlayerMise(auctionClassment, profile.profileInfo ? profile.profileInfo._id : '-')}</Text>
                        </View>
                    </View>

               
                </View>
                
                </LinearGradient>
            </View>
            { isAuctionEndCounter && <CloseBet stopPlaying={stopPlaying} />}
        </View>

    )
}

export const styles = StyleSheet.create({

    container: {
        width: "100%",
        flex: 1,
        flexDirection: 'column',
    },

    bg: {
        width: "100%",
        flex: 1,
        flexDirection: 'column',
    },

    auctionContainer : {
        width: '100%',
        height: SCREEN.height,
        marginTop: STATUSBAR_HEIGHT? STATUSBAR_HEIGHT  + 10 : STATUSBAR_HEIGHT,
    },

    header : {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
    },

    membersContainer : {
        flex: 1,
        height:40,
     
    },

    auctionClose : {
        width: 44,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    productContainer : {
        width : '100%',
        marginTop : 10,
        paddingHorizontal : 14,
        
    },

    productContainerBg : {
        width: '100%',
        height : 120,
        backgroundColor: 'rgba(255,255,255,.1)',
        borderTopEndRadius : 16,
        borderTopLeftRadius : 16,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: 14,
    },

    productContainerBase : {
        width: '100%',
        minHeight : 100,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderBottomEndRadius : 0,
        borderBottomLeftRadius : 0,
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent : "space-between",
        paddingTop: 40,
        paddingHorizontal: 20,
    },

    productPicture : {
        position: 'absolute',
        width: 140,
        height : 140,
        resizeMode: "contain",
        top: 10,
        left: 30,
    },

    auctionTimerContainer : {
        width: "100%",
        paddingHorizontal : 14,
        justifyContent: "center",
        alignItems: 'center',
    },

    auctionTimer: {
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        
    },

    auctionTimerText : {
        fontFamily: 'Orbitron-Bold',
        fontSize: 52,
        color: '#FFF'
    },

    miseContainer : {
        position: "absolute",
        width: '100%',
        height: 100,
        left: 0,
        bottom: 30,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 16
    },

    mesSolde : {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "flex-start",
        borderTopColor : 'rgba(255,255,255,.2)',
        borderTopWidth : 1,
        borderBottomColor : 'rgba(255,255,255,.2)',
        borderBottomWidth : 1,
        flex: 1,
        paddingVertical: 8
    },

    mesMise : {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "flex-end",
        borderTopColor : 'rgba(255,255,255,.2)',
        borderTopWidth : 1,
        borderBottomColor : 'rgba(255,255,255,.2)',
        borderBottomWidth : 1,
        flex: 1,
        paddingVertical: 8
    },

    nbrValue : {
        fontFamily: 'Orbitron-Bold',
        fontSize: 20,
        color: '#FFF'
    },

    ttValue : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        color: '#FFF',
        textTransform: "uppercase"
    },

    auctionProdInfo : {
        width: SCREEN.width - 200,
    },

    auctionProdInfoTitle : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        color: '#333'
    },

    auctionProdInfoPrice : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        color: '#333',
        marginTop: 10,
    },

    auctionProdInfoPriceValue : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#333'
    },

    auctionStat : {
        width : "50%",
        paddingLeft: 10,
        borderLeftColor: "#FFF",
        borderLeftWidth: 1,
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    auctionStatTitle : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        color: '#FFF',
    },

    auctionStatValue : {
        fontFamily: 'Orbitron-Bold',
        fontSize: 20,
        color: '#FFF'
    },

    auctionClassment : {
        position: 'absolute',
        width : '100%',
        top : 380,
        bottom: 160,
        paddingHorizontal: 20,
    },

    


});



export default Auction;