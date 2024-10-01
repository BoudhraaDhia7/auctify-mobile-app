import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation, Easing, Extrapolate, withTiming } from 'react-native-reanimated';
import { Controller, useForm, Resolver, SubmitHandler   } from 'react-hook-form';
import Svg, { Path, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import { SCREEN, colorShema, globalStyles } from '../../assets/styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import InscriptionInput from './inputs/inscriptionInput';
import { AlertError, UserInfoForm } from '../../apis/interfaces';
import { useAppDispatch, useAppSelector } from '../../stores/storeHook';
import { addUser, setIsAddProfile } from '../../stores/profileSlice';
import { getRandomNumber } from '../../helpers';


type FormValues = {
    firstName: string;
    lastName: string;
    pseudo: string;
    email: string;
    mobile: number;
    adresse: string;
    ville: string;
    password: string;
    cpassword: string;
};


type Props = {
    animateLogo : (val: number) => void;
    updateAlert : ( al : AlertError) => void;
}

import ReactNativeHapticFeedback from "react-native-haptic-feedback";


const Inscription = ({animateLogo, updateAlert} : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>();
    
    const [ isInscription, setIsInscription ] = useState<boolean>(false);

    const [ insName, setInsName ] = useState<string>("");

    const sharedX = useSharedValue(0);

    const windowHeight : number = SCREEN.height - 100;

    const animatedStyles = useAnimatedStyle(() => {
        const h = interpolate(sharedX.value, [0, 1], [80, windowHeight], Extrapolate.CLAMP);
        return {
            height: h,
        };
    });

    const inscriStyle = useAnimatedStyle(() => {
        const o = interpolate(sharedX.value, [0, 1], [1, 0], Extrapolate.CLAMP);
        const p = interpolate(sharedX.value, [0, 1], [0, 100], Extrapolate.CLAMP);
        return {
            opacity: o,
            transform : [{ translateY : p}]
        };
    });

    const animatedPadding = useAnimatedStyle(() => {
        const p = interpolate(sharedX.value, [0, 1], [0, 20], Extrapolate.CLAMP);
        return {
            marginTop: p,
        };
    });

    const ChangeInsName = (val : string) => {
        setInsName(val);
    }

    const openInscription = (val : number) => {
        sharedX.value = withTiming(val, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        animateLogo(val);
        setIsInscription(!isInscription);
    }

    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        };
    
        ReactNativeHapticFeedback.trigger("impactMedium", options);

        console.log(data);
        let datatoInsert : UserInfoForm;
       
        datatoInsert = { 
            userName : data.pseudo,
            firstName : data.firstName,
            lastName : data.lastName,
            address : data.adresse,
            city : data.ville,
            email : data.email,
            phone : data.mobile,
            status : 1,
            role : 1,
            wallet_code : parseInt(getRandomNumber(17)),
            password : data.password
        };

        if ( data.password != data.cpassword ) {
            updateAlert({ isErrorAlert: true, alertErrorType : "ERROR", alertErrorMessage : "Les mots de passe ne sont pas identique !"});
        }
        else {
            dispatch(setIsAddProfile(true));
            const data = await addUser(datatoInsert);
            console.log(data);
            updateAlert({ isErrorAlert: true, alertErrorType : "INFO", alertErrorMessage : "Votre inscription est effectué avec succès !"});
            dispatch(setIsAddProfile(false));
            openInscription(0);
        }
            
        
    } 


    const renderNoInscription = () => {
        return(
            <Animated.View style={[styles.noIscriptionContainer, inscriStyle]} >
                <Text style={styles.noAccount}>Vous n'avez pas de compte</Text>
                <View style={styles.registerContainer} >
                    <TouchableOpacity onPress={() => openInscription(1)}>
                        <Text style={styles.registerText}>Inscrivez vous </Text>
                    </TouchableOpacity>
                    <View style={styles.registerIcon}>
                        <Icon name="arrow-up-right" size={24} color="#000" />
                    </View>
                </View>
            </Animated.View>
        )
    }

    const renderInscription = () => {
        return(
            <View style={styles.inscriptionContainer} >
               <TouchableOpacity style={styles.closeInsc} onPress={() => openInscription(0)}>
                    <Icon name="x" size={24} color="#FFF" />
               </TouchableOpacity>
               <Text style={styles.titleInsc}>Créez votre compte</Text>
               <ScrollView style={styles.scrollForm}>
                    <View style={styles.inscForm}>

                    <View style={styles.formLine}>
                        <Controller control={control} name="lastName"
                            rules={{ required: { value: true, message: 'Le nom est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Nom' keyboard='default' secret={false} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.lastName && <View><Text style={styles.errorTxt}> {errors?.lastName.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="firstName"
                            rules={{ required: { value: true, message: 'Le prénom est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Prénom' keyboard='default' secret={false} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.firstName && <View><Text style={styles.errorTxt}> {errors?.firstName.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="pseudo"
                            rules={{ required: { value: true, message: 'Le pseudo est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Pseudo' keyboard='default' secret={false} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.pseudo && <View><Text style={styles.errorTxt}> {errors?.pseudo.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="email"
                            rules={{ required: { value: true, message: 'Addresse email est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Email' keyboard='email-address' secret={false} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.email && <View><Text style={styles.errorTxt}> {errors?.email.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="mobile"
                            rules={{ required: { value: true, message: 'le mobile est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Mobile' keyboard='phone-pad' secret={false} value = {value?.toString()} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.mobile && <View><Text style={styles.errorTxt}> {errors?.mobile.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="adresse"
                            rules={{ required: { value: true, message: 'Adresse est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Adresse' keyboard='default' secret={false} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.adresse && <View><Text style={styles.errorTxt}> {errors?.adresse.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="ville"
                            rules={{ required: { value: true, message: 'La ville est obligatoire !'} }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Ville' keyboard='default' secret={false} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.ville && <View><Text style={styles.errorTxt}> {errors?.ville.message}</Text></View>}
                    </View>
                    <View style={styles.formLine}>
                        <Controller control={control} name="password"
                            rules={{  required: { value: true, message: 'le mot de passe est obligatoire !'}, minLength : { value: 8, message: "le mot de passe doit contenir au moin 8 caractères" } }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Mot de passe' keyboard='default' secret={true} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.password && <View><Text style={styles.errorTxt}> {errors?.password.message}</Text></View>}
                    </View>
                        
                    <View style={styles.formLine}>
                        <Controller control={control} name="cpassword"
                            rules={{ required: { value: true, message: 'le mot de passe est obligatoire !'}, minLength : { value: 8, message: "le mot de passe doit contenir au moin 8 caractères" } }}
                            render={({ field: { onChange, value } }) =>
                            <InscriptionInput placeholder='Confirm mot de passe' keyboard='default' secret={true} value = {value} onChange={(v) => onChange(v)} />}
                        />
                        {errors?.cpassword && <View><Text style={styles.errorTxt}> {errors?.cpassword.message}</Text></View>}
                    </View>  
                        
                        
                        
                        
                    </View>
               </ScrollView>
               <View style={styles.inscFooter}>

                   { profile.isAddProfile ? <View style={globalStyles.connectButton}>
                        <ActivityIndicator size={24} color={"#FFF"} />
                    </View> : 
               
                    <TouchableOpacity 
                            style={[globalStyles.connectButton, { backgroundColor: '#64b5f6', borderRadius: 10, shadowOpacity: 0.25, shadowRadius: 5, shadowColor: '#000', shadowOffset: { height: 2, width: 0 } }]} 
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={[globalStyles.connectButtonText, { fontSize: 18, fontWeight: 'bold', letterSpacing: 1.2 }]}>INSCRIPTION</Text>
                        </TouchableOpacity>}


                    <View style={styles.isAccountContainer}>
                        <Text style={styles.isAccountText}>Vous avez déjà un compte</Text>
                        <TouchableOpacity style={styles.flexRow}  onPress={() => openInscription(0)}>
                            <Text style={styles.isAccountConnect}>Connectez vous</Text>
                            <View style={styles.registerIcon}>
                                <Icon name="arrow-up-right" size={24} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
               </View>
            </View>
        )
    }

    return(
        <Animated.View style={[styles.loginFooter, animatedStyles]}>
            <Animated.Image style={[styles.bottomForm, animatedPadding]} source={require('../../assets/images/bottomFooter.png')} /> 
            <View style={styles.inscriptionBg}></View>
            { isInscription ? renderInscription() : renderNoInscription() }
        </Animated.View>
    )
}

export const styles = StyleSheet.create({
    loginFooter : {
        position: 'absolute',
        width : "100%",
        height: 80,
        left: 0,
        bottom : 0,
    },

    bottomForm : {
        width: '100%',
        height : SCREEN.width * ( 211 / 1720 ),
        resizeMode: 'cover',
        opacity: .98,
        // marginTop : 20,
        marginTop : 0
    },

    inscriptionBg : {
        width: '100%',
        flex: 1,
        backgroundColor: "#FFF",
        top : 0,
        opacity: .98,
    },

    noIscriptionContainer : {
        position: 'absolute',
        width: '100%',
        top: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    

    noAccount : {
        fontFamily: "Montserrat-Regular",
        fontSize: 11,
        color: "#333"
    },

    registerContainer : {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },

    registerText : {
        fontFamily: "Montserrat-Bold",
        fontSize: 16,
        color: colorShema.primaryDark
    },
    
    registerIcon : {

    },  

    inscriptionContainer : {
        position: 'absolute',
        width: '100%',
        height: "100%",
        top: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    closeInsc : {
        width: 40,
        height: 40,
        borderRadius : 20,
        backgroundColor: colorShema.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleInsc : {
        width: '100%',
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        color: colorShema.primaryDark,
        paddingVertical : 12,
        textAlign: 'center'
    },

    inscFooter : {
        width: "100%",
        paddingHorizontal: 30,
        paddingTop : 10,
    },

    scrollForm : {
        width: "100%",
        flex: 1,
        marginTop: 10
    },

    inscForm : {
        width: "100%",
        paddingHorizontal: 30,
    },

    isAccountContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },

    isAccountText : {
        fontFamily: "Montserrat-Regular",
        fontSize: 11,
        color: '#000',
    },

    isAccountConnect : {
        fontFamily: "Montserrat-Bold",
        fontSize: 13,
        color: colorShema.primaryDark,
    },

    flexRow : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    errorTxt : {
        fontFamily: "Montserrat-Regular",
        fontSize: 9,
        color: 'red',
    },

    formLine : {
        width: '100%',
        marginBottom : 10,
    }


}); 

export default Inscription;