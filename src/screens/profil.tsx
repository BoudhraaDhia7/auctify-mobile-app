import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, ScrollView } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Icon from 'react-native-vector-icons/Feather';

import { SCREEN, globalStyles } from '../assets/styles/global';
import BackSection from '../components/layout/BackSection';
import LinearGradient from 'react-native-linear-gradient';
import HrOuter from '../components/layout/general/hrOuter';
import SocialContact from '../components/layout/socialContact';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { getProfileInfo, setProfileInfo } from '../stores/profileSlice';
import EditProfile from '../components/layout/profile/editProfile';
import ChangePassword from '../components/layout/profile/changePassword';
import ChangeEmail from '../components/layout/profile/changeEmail';

type ProfileScreenProp = NativeStackNavigationProp<RootStackParamList, 'Profil'>;

const Profil = () => {

    const navigation = useNavigation<ProfileScreenProp>();

    const [statusBg, setStatusBg] = useState<string>("transparent");
    const [statusContent, setStatusContent] = useState<string>("dark-content");

    const [ isEditProfile, setIsEditProfile ] = useState<boolean>(false);
    const [ isChangePass, setIsChangePass ] = useState<boolean>(false);


    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const navigateTo = (sc: any) => {
        navigation.replace(sc);
    }

    const thisGetProfileInfo = async(id : string) => {
        const data = await getProfileInfo(id);
        console.log("dataID", id)
        if ( data ) {
            dispatch(setProfileInfo(data))
        }
    }

    useEffect(() => {
        thisGetProfileInfo(profile.connexionInfo.idClient);
    }, [])

    useEffect(() => {
        changeNavigationBarColor("#FFFFFF", true);
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

    const closeEditProfile = () => { setIsEditProfile(false) }
    const closeChangePass = () => { setIsChangePass(false) }

    return(
        <View style={globalStyles.container}>
            <StatusBar  barStyle="dark-content"  backgroundColor = { statusBg } translucent = {true} animated = {true} />
            <LinearGradient
                colors={['#b2c6e7', '#ffffff', '#9AB6EB']}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}}
                style={globalStyles.bgOverlay}
            />
            <View style={globalStyles.bgOverlay}></View>
            
            <BackSection label="Profil" logo={true} navigateTo={navigateTo} from='Main'/>
            
            <HrOuter />

            <ScrollView style={{ width: '100%', flex: 1, paddingVertical: 16 }}>
            <View style={styles.profilContainer}>
                <LinearGradient style={styles.profilActions} colors={["#9C75FF", "#6FA1FF"]}>
                    <View style={styles.userInfo}>
                        <Text style={styles.profilName}>{profile.profileInfo?.firstName + " " + profile.profileInfo?.lastName}</Text>
                        <Text style={styles.profilMail}>{profile.profileInfo?.email}</Text>
                        <Text style={styles.profilMail}>+216 {profile.profileInfo?.phone}</Text>
                    </View>
                    <View style={styles.userMenu}>
                        <TouchableOpacity style={styles.userMenuItem} onPress={() => setIsEditProfile(true)}>
                            <Text style={styles.userMenuText}>Modifier mes informations</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userMenuItem} onPress={() => setIsChangePass(true)}>
                            <Text style={styles.userMenuText}>Paramètres du compte</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={styles.avatarZone}>
                    <LinearGradient style={styles.avatarBorder} colors={["#9C75FF", "#6FA1FF"]}>
                        <View style={styles.avatar}>
                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: profile.profileInfo?.avatar }} />
                        </View>
                    </LinearGradient>
                </View>
            </View>

            <View style={styles.profilStats}>
                <LinearGradient style={styles.profilStat} colors={["#9C75FF", "#6FA1FF"]}>
                    <View style={styles.profilStatHeader}>
                        <View style={styles.statIcon}><Icon name="credit-card" size={22} color="#FFF" /></View>
                        <Text style={styles.statTitle}>Mon Solde</Text>
                    </View>
                    <View style={styles.profilStatContent}>
                        <Text style={styles.soldeVal}>{profile.profileInfo?.solde}</Text>
                        <TouchableOpacity style={styles.buyButton} onPress={() => navigation.replace("Transactions")}>
                            <View style={styles.statIcon}><Icon name="archive" size={18} color="#333" /></View>
                            <Text style={styles.buyText}>Transactions</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.profilStats}>
                <LinearGradient style={styles.profilStat} colors={["#9C75FF", "#6FA1FF"]}>
                    <View style={styles.profilStatHeader}>
                        <View style={styles.statIcon}><Icon name="list" size={22} color="#FFF" /></View>
                        <Text style={styles.statTitle}>Mes Produits</Text>
                    </View>
                    <View style={styles.profilStatContent}>
                        
                        <View style={styles.prodStats}>
                            <Text style={styles.prodLabel}>PARTICIPATIONS</Text>
                            <Text style={styles.prodValue}>3</Text>
                        </View>
                        <View style={styles.prodStats}>
                            <Text style={styles.prodLabel}>REMPORTES</Text>
                            <Text style={styles.prodValue}>1</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>


            <View style={styles.profilStats}>
                <TouchableOpacity style={styles.profilLink}>
                    <Text style={styles.profilLinkLabel}>Comment ça marche ?</Text>
                    <View><Icon name="chevron-right" size={22} color="#333" /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profilLink}>
                    <Text style={styles.profilLinkLabel}>Termes et conditions d'utilisation</Text>
                    <View><Icon name="chevron-right" size={22} color="#333" /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profilLink}>
                    <Text style={styles.profilLinkLabel}>Mentions légales</Text>
                    <View><Icon name="chevron-right" size={22} color="#333" /></View>
                </TouchableOpacity>


            </View>

            <View style={styles.socialContact}>
                <SocialContact />
            </View>

            <View style={styles.marginBot}></View>

            </ScrollView>

            { isEditProfile && <EditProfile close={closeEditProfile} navigateTo={navigateTo} />}
            { isChangePass && <ChangePassword close={closeChangePass} navigateTo={navigateTo} />}


        </View>
        
    )
}

export const styles = StyleSheet.create({

    creditCardContainer : {
        width: "100%",
        flexDirection: 'column',
    },

    profilContainer : {
        width: '100%',
        paddingHorizontal : 26,
        flexDirection: 'column',
        justifyContent :'center',
        alignItems : 'center',
    },

    profilActions : {
        width: '100%',
        minHeight : 80,
        borderRadius : 20,
        overflow : 'hidden',
        marginTop : 45,
    },

    avatarZone : {
        position: 'absolute',
        width: "100%",
        justifyContent: 'center',
        alignItems : "center",
        top: 0,
        left : 30
    },

    avatarBorder : {
        width : 90,
        height: 90,
        borderRadius : 45,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems : "center",
    },

    avatar : {
        width : 86,
        height: 86,
        borderRadius : 45,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems : "center",
    },

    userInfo : {
        width: '100%',
        marginTop : 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom : 30
    },
    
    profilName : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 16,
        color: '#FFF'
    },

    profilMail : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 12,
        color: '#FFF'
    },

    userMenu : {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom : 10,
        paddingHorizontal : 20
    },

    userMenuItem : {
        width : '100%',
        height : 48,
        borderRadius : 10,
        backgroundColor : 'rgba(255,255,255,.6)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    userMenuText : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 12,
        color: '#333'
    },

    profilStats : {
        width: '100%',
        paddingHorizontal : 26,
        flexDirection: 'column',
        justifyContent :'center',
        alignItems : 'center',
        marginTop : 16,
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
        height : 50,
        flexDirection :'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },

    statIcon : {
        marginRight : 10,
    },

    statTitle : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 16,
        color: '#FFF'
    },

    profilStatContent : {
        width : '100%',
        flexDirection :'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop: 4,
        marginBottom : 20,
    },

    soldeVal : {
        fontFamily: 'Credit-CardFont',
        fontSize : 18,
        color: '#FFF'
    },

    buyButton : {
        paddingHorizontal : 10,
        height : 48,
        borderRadius : 10,
        backgroundColor : 'rgba(255,255,255,.6)',
        flexDirection :'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },

    buyText : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 11,
        color: '#333'
    },

    prodStats : {
        width : '48%',
        padding : 11,
        borderRadius : 10,
        backgroundColor : 'rgba(255,255,255,.6)',
        flexDirection :'column',
        justifyContent : 'flex-start',
        alignItems : 'flex-start',
    },

    prodLabel : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 10,
        color: '#333'
    },

    prodValue : {
        width: '100%',
        fontFamily: 'Montserrat-Bold',
        fontSize : 20,
        color: '#333',
        textAlign: 'right'
    },

    profilLink : {
        width : '100%',
        padding : 20,
        borderRadius : 20,
        backgroundColor : 'rgba(255,255,255,.6)',
        flexDirection :'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom: 10,
    },

    profilLinkLabel : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 14,
        color: '#333'
    },

    socialContact : {
        paddingHorizontal : 50,
        paddingVertical : 15
    },

    marginBot : {
        width: '100%',
        height: 30,
    }



}); 



export default Profil;