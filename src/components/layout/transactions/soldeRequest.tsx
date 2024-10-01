import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import { colorShema } from '../../../assets/styles/global';
import { getInitialName } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { BASE_URL } from '../../../apis/axiosConfig';
import { searchPhoneData } from '../../../apis/interfaces';
import { searchPhoneByNumber, sendSoldeRequest, sendSoldeToUser } from '../../../apis/actions';
import { getProfileInfo, setProfileInfo } from '../../../stores/profileSlice';


type Props = {
    close : () => void,
}

const dd = 
    {
        "id": "6436c1725b7da8f3ead74787",
        "firstName": "ines",
        "lastName": "letaief",
        "phone": 98569865,
        "avatar": "https://ui-avatars.com/api/?name=I+L&background=6FA1FF&size=256&rounded=true&color=fff",
        "message": "USER_EXIST"
    }


const SoldeRequest = ({ close } : Props) => {

    const product = useAppSelector((state) => state.product);
    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [ mobile, setMobile ] = useState<number>(0);
    const [ amount, setAmount ] = useState<number>(1);
    const [ mySolde, setMySolde ] = useState<number|undefined>(profile.profileInfo?.solde);
    const [ isCanParticipate, setIsCanParticipate ] = useState<Boolean>(true);
    const [ isSendSection, setIsSendSection ] = useState<Boolean>(false);

    const [ phoneInfo, setPhoneInfo ] = useState<searchPhoneData>(dd);
    const [ isSearching, setIsSearching ] = useState<Boolean>(false);
    const [ isSending, setIsSending] = useState<Boolean>(false);


    const setAmountIncrease = (v: number) => {
        if (amount > 1 && v == -1) {
            setAmount(n => n - 1);
        }
        else {
            setAmount(n => n + 1);
        } 
    }

    useEffect(() => {
        if (mySolde) {
            if (amount > mySolde) {
                setIsCanParticipate(false);
            }
            else {
                setIsCanParticipate(true);
            }
        }
    }, [amount]);

    const searchPhone = async() => {
        setIsSearching(true);
        try {
            const res = await searchPhoneByNumber( profile.connexionInfo.idClient, mobile );
            console.log(res);
            if (res?.message == "USER_EXIST") {
                setPhoneInfo(res);
                setIsSearching(false);
                setIsSendSection(true);
            }
            else {
                console.log("phone introuvable");
                setIsSearching(false);
                setIsSendSection(false);
            }
        } catch (e) {
            console.log("internet error")
        }
    }

    const dannosRequest = async() => {
        setIsSending(true);
        const dataToSend = {
            userId : profile.connexionInfo.idClient,
            fromId : phoneInfo.id,
            amount : amount,
        }
        try {
            if (phoneInfo.id) {
                const res = await sendSoldeRequest( dataToSend  );
                if (res?._id) {
                    setIsSending(false);
                    close();
                }
                else {
                    setIsSending(false);
                }
                
            }
            
        } catch (e) {
            console.log("internet error")
        }
    }


    const searchForm = () => {
        return(
            <>
                <View style={{...styles.fieldContainer, justifyContent: 'space-between', alignItems :'center'}}>
                    <Text style={{...styles.prodName, paddingLeft : 10, paddingRight : 30}}>Mobile</Text>
                    <View style={styles.amountField}>
                        <TextInput style={styles.amountInput} keyboardType='phone-pad' placeholder='Mobile' onChangeText={(v) => setMobile(parseInt(v))} />
                        
                    </View>
                </View>

                { isSearching ? <View style={styles.btConfirm}>
                    <ActivityIndicator size={'large'} color={"#FFF"} />
                </View> : <TouchableOpacity style={styles.btConfirm} onPress={() => searchPhone()}>
                    <Text style={styles.btText}>RECHERCHE</Text>
                </TouchableOpacity>}
            </>
        )
    }

    const sendForm = () => {
        return(
            <>
                <View style={styles.fieldContainer}>
                    <LinearGradient style={styles.pictContainer} colors={[colorShema.primary, colorShema.secondary50, colorShema.secondary50]}>
                        <Image style={{width: '100%', height: '100%'}} source={{ uri : `${phoneInfo.avatar}`}} />
                    </LinearGradient>
                    <View style={styles.infoContainer}>
                        <Text style={styles.prodName}>{phoneInfo.firstName} {phoneInfo.lastName}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.prodPrice}>{phoneInfo.phone}</Text>
                        </View>
                    </View>
                </View>

                <View style={{...styles.fieldContainer, justifyContent: 'space-between', alignItems :'center'}}>
                    <Text style={{...styles.prodName, paddingLeft : 10, paddingRight : 30}}>Montant</Text>
                    <View style={styles.amountField}>
                        <Text style={styles.amountInput}>{amount}</Text>
                        <TouchableOpacity style={styles.amountChanger} onPress={() => setAmountIncrease(1)}><Icon name='plus' color={'#7f8c8d'} size={20}  /></TouchableOpacity>
                        <TouchableOpacity style={styles.amountChanger} onPress={() => setAmountIncrease(-1)}><Icon name='minus' color={'#7f8c8d'} size={20}  /></TouchableOpacity>
                    </View>
                </View>

                { isSending ? <View style={styles.btConfirm}>
                    <ActivityIndicator size={'large'} color={"#FFF"} />
                </View> : <TouchableOpacity style={styles.btConfirm} onPress={() => dannosRequest()}>
                    <Text style={styles.btText}>ENVOYER</Text>
                </TouchableOpacity>}
            </>
        )
    }


    return(
        <BlurView style={styles.container}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        >
            <View style={styles.content}>
                <View style={styles.sectionTitle}><Text style={styles.sectionTitleLabel}>Demande Solde</Text></View>

                <View style={styles.mySoldeContainer}>
                    <View style={styles.mySoldeContent}>
                        <Icon name='credit-card' size={14} color={'#FFF'} />
                        <Text style={styles.mySoldeText}>{mySolde}</Text>
                    </View>
                </View>
                
                { isSendSection ? sendForm() : searchForm() }

                

                

                

            </View>
           
        </BlurView>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        borderBottomColor : "rgba(255,255,255,.7)",
        borderBottomWidth : 1,
        paddingBottom: 20,

    },

    content : {
        width: '100%',
        paddingHorizontal : 20,
    },

    sectionTitle : {
        width: '100%',
        height : 50,
        justifyContent : 'center',
        alignItems : "flex-start",
        marginBottom : 10
    },

    sectionTitleLabel : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 16,
        color: '#333'
    },

    fieldContainer : {
        width: '100%',
        borderRadius : 20,
        padding : 5,
        borderColor : "rgba(255,255,255,.5)",
        borderWidth : 1,
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10
    },

    pictContainer : {
        width : 60,
        height : 60,
        borderRadius : 40,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems : 'center',
    },

    infoContainer : {
        paddingLeft : 10,
        paddingTop : 6
    },

    prodName : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 12,
        color : "#333",
        paddingRight: 10,
        flexWrap: 'wrap',
        textTransform: 'capitalize'
    },

    priceContainer : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop : 2
    },

    prodPrice : {
        fontFamily : 'Montserrat-Bold',
        fontSize : 12,
        color : "#333"
    },

    prodCurrency : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 9,
        color : "#333",
        paddingLeft: 4
    },

    amountField : {
        flex: 1,
        height : 50,
        borderRadius : 20,
        backgroundColor: 'rgba(255,255,255,.3)',
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight : 5
    },

    amountInput : {
        flex: 1,
        height : 50,
        fontFamily : 'Montserrat-Regular',
        fontSize : 14,
        color : "#333",
        paddingHorizontal : 20,
        lineHeight : 40,
    },

    amountChanger : {
        width : 40,
        height : 40,
        backgroundColor : 'rgba(255,255,255,.8)',
        borderRadius : 20,
        justifyContent: 'center',
        alignItems : 'center',
        marginLeft : 5
    },

    btConfirm : {
        width : '100%',
        height : 60,
        marginTop : 0,
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius : 20,
        backgroundColor : colorShema.primary,
    },

    btText : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 16,
        color : "#FFF",
    },

    mySoldeContainer : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 6
    },

    mySoldeContent : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: colorShema.secondary,
        borderRadius: 20
    },

    mySoldeText : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 10,
        color : "#FFF",
        paddingLeft : 8
    },
   

}); 

export default SoldeRequest;