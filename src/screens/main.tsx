import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation, Easing, Extrapolate, withTiming } from 'react-native-reanimated';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SCREEN, globalStyles } from '../assets/styles/global';
import MainHeader from '../components/layout/header';
import ProdSelector from '../components/layout/prodSelector';
import ProdListItem from '../components/layout/prodListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import NextList from '../components/layout/products/nextList';
import NowList from '../components/layout/products/nowList';
import EndedList from '../components/layout/products/endedList';
import { useAppSelector, useAppDispatch } from './../stores/storeHook';
import { selectMainSection } from '../stores/communSlice';
import Notifications from '../components/layout/general/notifications';
import Product from '../components/layout/general/product';
import BottomWindow from '../components/layout/general/bottomWindow';
import { ProductInfo, ProductList } from '../apis/interfaces';
import { setSelectedProd } from '../stores/productSlice';
import LinearGradient from 'react-native-linear-gradient';
import { disconnectSocket, initiateSocket, onAuctionWin } from '../apis/socket';
import Toast from 'react-native-toast-message';

type MainScreenProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
type AuctionScreenProp = NativeStackNavigationProp<RootStackParamList, 'Auction'>;

const Main = () => {

    const navigation = useNavigation<MainScreenProp>();
    const AuctionNvigation = useNavigation<AuctionScreenProp>();

    const commum = useAppSelector((state) => state.commun);
    const profile = useAppSelector((state) => state.profile);
    const product = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const [statusBg, setStatusBg] = useState<string>("transparent");
    const [statusContent, setStatusContent] = useState<string>("dark-content");
    const [selectedSection, setSelectedSection] = useState<number>(0);

    const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

    const [ isBottomWindow, setIsBottomWindow ] = useState<boolean>(false);
    const [ selectedBottom, setSelectedBottom ] = useState<string>('SEND_DANNOS');
    

    const sharedX = useSharedValue(0);

    const selectWidth : number = SCREEN.width ;

    const animatedStylesOne = useAnimatedStyle(() => {
        const translateX = interpolate(sharedX.value, [0, 1, 2], [0, -selectWidth, -(selectWidth)], Extrapolate.CLAMP);
        return {
            left: translateX,
        };
    });

    const animatedStylesTwo = useAnimatedStyle(() => {
        const translateX = interpolate(sharedX.value, [0, 1, 2], [selectWidth, 0, -(selectWidth)], Extrapolate.CLAMP);
        return {
            left: translateX,
        };
    });

    const animatedStylesThree = useAnimatedStyle(() => {
        const translateX1 = interpolate(sharedX.value, [0, 1, 2], [selectWidth, selectWidth, 0], Extrapolate.CLAMP);
        return {
            left: translateX1,
        };
    });

    

    const animSelect = (s : number) => {
        sharedX.value = withTiming(s, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        setTimeout(() => { setSelectedSection(s) }, 100);
    }


    useEffect(() => {
        changeNavigationBarColor("#FFFFFF", true);
    }, [])

    const navigateTo = (sc: any) => {
        if (profile.connexionInfo.idClient) {
            navigation.replace(sc);
        }
        else {
            navigation.replace("Login");
        }
    }

    const openNotif = () => {
        setIsOpenNotification(true)
    }

    const closeNotif = () => {
        setIsOpenNotification(false)
    }

    const openDetails = (info : ProductList|null) => {
        dispatch(setSelectedProd(info));
        setIsOpenDetails(true);
    }

    const closeDetais = () => {
        setIsOpenDetails(false)
    }

    const openParticipate = ( sel: string, info : ProductList|null) => {
        if (profile.connexionInfo.isLogin) {
            setSelectedBottom(sel)
            dispatch(setSelectedProd(info));
            setIsBottomWindow(true);
        }
        else {
            navigateTo('Login');
        }
    }

    const openAuction = (id : string) => {
        if (profile.connexionInfo.isLogin) {
            AuctionNvigation.replace('Auction', { productId: id});
        }
        else {
            navigateTo('Login');
        }
    }

    const currendPlayerId = profile.connexionInfo.idClient;
    console.log("currendPlayerId", currendPlayerId)

    
    const selectSection = (ss : number) => {
        animSelect(ss)
    }

    const closeBottomWindow = () => {
        setIsBottomWindow(false);
    }

    useEffect(() => {

        initiateSocket();

        onAuctionWin(currendPlayerId, () => {
            Toast.show({
              type: 'success',
              text1: 'Victoire aux enchères',
              text2: 'Félicitations ! Vous avez remporté l\'enchère.'
            });
          });

        return () => { disconnectSocket() }

    }, [])

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
            <View style={globalStyles.mainContainer}>
                <View style={globalStyles.mainHeader}>
                    <MainHeader navigateTo={navigateTo} openNotif={openNotif} />
                </View>
                <View style={globalStyles.mainProductSelector}>
                    <ProdSelector select={selectSection} />
                </View>
                <View style={globalStyles.mainProductList}>
                    <View style={[globalStyles.mainProdListSections]}>
                        <Animated.View style={[globalStyles.mainProdListSection, animatedStylesOne]}>
                           { selectedSection == 0 && <NextList selectProd={openDetails} particpateProd={openParticipate} openAuction={openAuction} />}
                        </Animated.View>
                        <Animated.View style={[globalStyles.mainProdListSection, animatedStylesTwo]}>
                           { selectedSection == 1 && <NowList  selectProd={openDetails} particpateProd={openParticipate} openAuction={openAuction} />}
                        </Animated.View>
                        <Animated.View style={[globalStyles.mainProdListSection, animatedStylesThree]}>
                           {  selectedSection == 2 && <EndedList  selectProd={openDetails} particpateProd={openParticipate} openAuction={openAuction} />}
                        </Animated.View>
                    </View>
                </View>
            </View>

            

            { isOpenDetails && <Product close={closeDetais} particpateProd={openParticipate} />}
            { isOpenNotification && <Notifications close={closeNotif} />}

            {isBottomWindow && <BottomWindow close={closeBottomWindow} windowType={selectedBottom} />}

            <Toast />
        </View>
        
    )
}


export default Main;