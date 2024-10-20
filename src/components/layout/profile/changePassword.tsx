import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN, STATUSBAR_HEIGHT, colorShema } from '../../../assets/styles/global';
import Jauge from '../../products/jauge';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { setIsLogin, setProfileInfo } from '../../../stores/profileSlice';
import { setAccesToken } from '../../../apis/axiosConfig';
import ChangeEmail from './changeEmail';
import ChangePhone from './changePhone';
import ChangePasswordReuest from './changePasswordRequest';


type Props = {
    close : () => void;
    navigateTo : (s : string) => void;
}


const ChangePassword = ( { close, navigateTo } : Props) => {

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const animValue = useSharedValue(0);
    const translationY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y;
        console.log(event.contentOffset.y)
    });

    const pictAnimStyle = useAnimatedStyle(() => {
        return { transform: [{ translateY: translationY.value }]};
    });

    const headerAnimStyle = useAnimatedStyle(() => {
        const ty = interpolate(translationY.value, [0, 50], [ -100, 0 ], Extrapolate.CLAMP);
        return {transform: [{translateY : ty}] };
    });

    const animatedStyles = useAnimatedStyle(() => {
        const ty = interpolate(animValue.value, [0, 1], [ SCREEN.height / 2 , 0 ], Extrapolate.CLAMP);
        const r = interpolate(animValue.value, [0,3, 1], [ 10, 0 ], Extrapolate.CLAMP);
        const t = interpolate(animValue.value, [0, 1], [ 0, 1 ], Extrapolate.CLAMP);
        return { borderRadius : r, opacity: t, transform: [{translateY : ty}] };
    });

    const animate = (a : number) => {
        animValue.value = withSpring( a, {
            stiffness : 200,
            damping : 15,
        });
    }

    const thisClose = () => {
        animate(0);
        setTimeout(() => { close(); }, 200)
    }

    useEffect(() => {
        animate(1);
    }, []);

    useEffect(() => {
        const backAction = () => {
            thisClose();
            return true;
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress", backAction
        );
        return () => backHandler.remove();

    }, []);

    const deconnect = async() => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch(setIsLogin({ isLogin: false, idClient :'', pseudo : '', token : '' }));
            setAccesToken("");
            navigateTo('Login');
          } catch (e) {
            // saving error
        }
    }

    const [ isChangeEmail, setIsChangeEmail ] = useState<boolean>(false);
    const [ isChangePhone, setIsChangePhone ] = useState<boolean>(false);
    const [ isChangePassword, setIsChangePassword ] = useState<boolean>(false);

    
    const closeChangeEmail = () => { setIsChangeEmail(false) }
    const closeChangePhone = () => { setIsChangePhone(false) }
    const closeChangePassword = () => { setIsChangePassword(false) }

    return(
        <Animated.View style={[styles.container, animatedStyles]}>

            <Animated.ScrollView 
               style={styles.parentScroll}
               onScroll={scrollHandler}
               scrollEventThrottle={16}
            >
                <View style={styles.detailsContent}>

                    <Animated.View style={[styles.prodPictContainer, pictAnimStyle]} >
                        <LinearGradient style={styles.prodPictContainer} colors={["#9C75FF", "#6FA1FF"]}>
                        </LinearGradient>
                    </Animated.View>
                    
                    <View style={styles.detailsZone}>
                        

                        {/* <TouchableOpacity style={styles.participationBt}>
                            <Text style={styles.participationText}>PARTICIPER A 1D</Text>
                        </TouchableOpacity> */}

                        <Text style={styles.pramTitles}>Securité</Text>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionLine} onPress={() => setIsChangeEmail(true)}>
                                <Text style={styles.optionLabel}>Changer Adresse Email</Text>
                                <Icon name='chevron-right' size={24} color={'#333'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionLine} onPress={() => setIsChangePhone(true)}>
                                <Text style={styles.optionLabel}>Changer Numéro Mobile</Text>
                                <Icon name='chevron-right' size={24} color={'#333'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionLine} onPress={() => setIsChangePassword(true)}>
                                <Text style={styles.optionLabel}>Changer mot de passe</Text>
                                <Icon name='chevron-right' size={24} color={'#333'} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.pramTitles}>Compte</Text>

                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionLine} onPress={() => deconnect()}>
                            <Text style={{...styles.optionLabel, color : "#c0392b"}}>Déconnexion</Text>
                                <Icon name='chevron-right' size={24} color={'#c0392b'} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.optionLine}>
                                <Text style={{...styles.optionLabel, color : "#c0392b"}}>Supression du compte</Text>
                                <Icon name='chevron-right' size={24} color={'#333'} />
                            </TouchableOpacity> */}
                           
                        </View>

                       

                    </View>

                </View>
            </Animated.ScrollView>
            <View style={styles.backSectionContainer}>
                <Animated.View style={[styles.backSectionBg, headerAnimStyle]}>
                    <LinearGradient style={{width : '100%', height: SCREEN.width * .8}} colors={["#9C75FF", "#6FA1FF"]}>
                    </LinearGradient>
                </Animated.View>
                <View style={styles.backSection}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity style={styles.backIcon} onPress={() => thisClose()}>
                            <Icon name="chevron-left" size={34} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.backLabel}>Paramètres du compte</Text>
                    </View>
                </View>
            </View>
            { isChangeEmail && <ChangeEmail close={closeChangeEmail} navigateTo={navigateTo} />}
            { isChangePhone && <ChangePhone close={closeChangePhone} navigateTo={navigateTo} />}
            { isChangePassword && <ChangePasswordReuest close={closeChangePassword} navigateTo={navigateTo} />}

        </Animated.View>
            
    )
}

export const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        width: "100%",
        height : '100%',
        backgroundColor : 'rgba(255,255,255,1)'
    },

    backSectionContainer : {
        position: "absolute",
        width: "100%",
    },

    backSection : {
        width: "100%",
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal : 10,
        marginTop : STATUSBAR_HEIGHT,
        elevation : 6,
        paddingBottom : 6
    },

    backSectionBg : {
        position: "absolute",
        width: "100%",
        height : '100%',
        backgroundColor: '#FFF',
        elevation : 5,
        overflow: 'hidden',
        transform: [{ translateY : -100}]
    },

    backContainer : {
        flexDirection:'row',
        justifyContent: "flex-start",
        alignItems: 'center',
    },

    backIcon : {
        width: 40,
        height : 40,
        justifyContent: "center",
        alignItems: 'flex-start',
    },

    backLabel : {
        fontFamily: "Montserrat-Regular",
        fontSize : 16,
        color: "#FFF",
     
    },

    parentScroll : {
        width: '100%',
        flex: 1,
    },

    detailsContent : {
        width: '100%',
        backgroundColor : '#FFF',
    },

    prodPictContainer : {
        position: 'absolute',
        width : '100%',
        height : SCREEN.width,
    },

    detailsZone : {
        width: '100%',
        backgroundColor : '#FFF',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        marginTop : (STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT : 40) + 50,
        paddingHorizontal: 20,
        paddingTop :30
    },

    

    

    
    participationBt : {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorShema.tertiary,
        borderRadius: 10,
        marginTop: 16
    },

    participationText : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: "#FFF",
    },

    pramTitles : {
        width: '100%',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        color: "#333",
        marginBottom : 10,
    },

    optionContainer : {
        width: "100%",
        marginBottom : 30,
    },

    optionLine : {
        width : '100%',
        height : 50,
        borderBottomColor : "#ecf0f1",
        borderBottomWidth : 1,
        marginBottom : 5,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems :'center', 
    },

    optionLabel : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: "#333",
    }

    
  
   

}); 

export default ChangePassword;