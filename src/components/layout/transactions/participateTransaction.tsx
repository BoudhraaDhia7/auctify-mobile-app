import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import { colorShema } from '../../../assets/styles/global';
import { getInitialName } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { BASE_URL, PICT_URL } from '../../../apis/axiosConfig';
import { ParticipateForm } from '../../../apis/interfaces';
import { participateProduct } from '../../../apis/actions';
import { getProfileInfo, setProfileInfo } from '../../../stores/profileSlice';
import { getProductList, setproductList } from '../../../stores/productSlice';


type Props = {
    close : () => void,
}


const ParticipateTransaction = ({ close } : Props) => {

    const product = useAppSelector((state) => state.product);
    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [ amount, setAmount ] = useState<number>(1);
    const [ mySolde, setMySolde ] = useState<number|undefined>(profile.profileInfo?.solde);
    const [ isCanParticipate, setIsCanParticipate ] = useState<Boolean>(true);

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

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

    const sendParticipate = async() => {
        setIsLoading(true);
        const dataToSend = {
            player: profile.connexionInfo.idClient,
            product : product.selectedProd ? product.selectedProd._id : "",
            amountGiven : -amount
        }
        
        const res = await participateProduct(dataToSend);
        const profileInfo = await getProfileInfo(profile.connexionInfo.idClient);
        if ( profileInfo ) { dispatch(setProfileInfo(profileInfo))}
        const newlist = await getProductList(profile.connexionInfo.idClient);
        dispatch(setproductList(newlist));
        setIsLoading(false);
        close();
    }

    function generateImgUrl(filePath: string) {
        if (filePath.includes('http')) return filePath + "&format=png"

        // Replace backslashes with forward slashes
        const normalizedFilePath = filePath.replace(/\\/g, '/')

        // Ensure the filePath is properly encoded after normalization
        const cleanFilePath = encodeURI(normalizedFilePath)

        return `${PICT_URL}${cleanFilePath}`
    }


    return(
        <BlurView style={styles.container}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        >
            <View style={styles.content}>
                <View style={styles.sectionTitle}><Text style={styles.sectionTitleLabel}>Participation</Text></View>

                <View style={styles.mySoldeContainer}>
                    <View style={styles.mySoldeContent}>
                        <Icon name='credit-card' size={14} color={'#FFF'} />
                        <Text style={styles.mySoldeText}>{mySolde}</Text>
                    </View>
                </View>
                
                <View style={styles.fieldContainer}>
                    <LinearGradient style={styles.pictContainer} colors={[colorShema.primary, colorShema.secondary50, colorShema.secondary50]}>
                        <Image style={{width: '80%', height: '80%'}} source={{ uri :generateImgUrl(product.selectedProd?.prodPicture[0].filePath ?? '')}} />
                    </LinearGradient>
                    <View style={styles.infoContainer}>
                        <Text style={styles.prodName}>{product.selectedProd?.prodName}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.prodPrice}>{product.selectedProd?.prodPrice}</Text>
                            <Text style={styles.prodCurrency}>TND</Text>
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

                {(isCanParticipate && !isLoading )&& <TouchableOpacity style={styles.btConfirm} onPress={() => sendParticipate()}>
                    <Text style={styles.btText}>CONFIRMER</Text>
                </TouchableOpacity>}

                {(!isCanParticipate && !isLoading) && <View style={[styles.btConfirm, {backgroundColor : colorShema.secondary}]}>
                    <Text style={styles.btText}>PAS DE SOLDE</Text>
                </View>}

                {(isLoading) && <View style={[styles.btConfirm]}>
                    <ActivityIndicator size={'large'} color={'#FFF'} />
                </View>}
                

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
        width : 80,
        height : 80,
        borderRadius : 20,
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
        flexWrap: 'wrap'
    },

    priceContainer : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop : 8
    },

    prodPrice : {
        fontFamily : 'Montserrat-Regular',
        fontSize : 16,
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

export default ParticipateTransaction;