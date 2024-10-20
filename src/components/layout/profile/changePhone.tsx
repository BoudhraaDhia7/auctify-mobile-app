import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { Controller, useForm, Resolver, SubmitHandler   } from 'react-hook-form';

import { SCREEN, STATUSBAR_HEIGHT, colorShema, globalStyles } from '../../../assets/styles/global';
import InscriptionInput from '../inputs/inscriptionInput';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { EditProfileForm } from '../../../apis/interfaces';
import { editEmail, editPhone, setEmailInfo, setIsAddProfile, setPhoneInfo } from '../../../stores/profileSlice';
import Toast from 'react-native-toast-message';

type FormValues = {
    phoneNumber: number;
    confirmPhoneNumber: number;
};


type Props = {
    close : () => void;
    navigateTo : (s : string) => void;
}


const ChangePhone = ( { close, navigateTo } : Props) => {

    const animValue = useSharedValue(0);
    const translationY = useSharedValue(0);

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>({defaultValues : {
        phoneNumber: profile.profileInfo?.phone,
        confirmPhoneNumber: profile.profileInfo?.phone,
    }});


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

    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        let datatoInsert : {
            id : string,
            phoneNumber: number,
            confirmPhoneNumber : number,
        }

        datatoInsert = { 
            id : profile.profileInfo?._id ? profile.profileInfo?._id : '',
            phoneNumber : data.phoneNumber,
            confirmPhoneNumber : data.confirmPhoneNumber,
        };

            dispatch(setIsAddProfile(true));
            const res = await editPhone(datatoInsert);

            if (res) {
                
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Votre numéro de téléphone a été modifié avec succès',
                    visibilityTime: 3000,
                });

                // change the user email in the store state.profile = res   
                dispatch(setPhoneInfo({ phoneNumber : datatoInsert.phoneNumber }));
            }

            dispatch(setIsAddProfile(false));
            thisClose();
        
    }


    return (
        <Animated.View style={[styles.container, animatedStyles]}>
            <Animated.ScrollView 
               style={styles.parentScroll}
               onScroll={scrollHandler}
               scrollEventThrottle={16}
            >
                <View style={styles.detailsContent}>
                    <Animated.View style={[styles.prodPictContainer, pictAnimStyle]}>
                        <LinearGradient style={styles.prodPictContainer} colors={["#9C75FF", "#6FA1FF"]}>
                        </LinearGradient>
                    </Animated.View>
                    
                    <View style={styles.detailsZone}>
                        <View style={styles.inscForm}>
                            <View style={styles.formLine}>
                                <Controller 
                                    control={control} 
                                    name="phoneNumber"
                                    rules={{ 
                                        required: { value: true, message: 'Le numéro de téléphone est obligatoire !'},
                                        pattern: {
                                            value: /^\d{8}$/,
                                            message: "Format de numéro de téléphone invalide"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) =>
                                        <InscriptionInput placeholder='Numéro de téléphone' keyboard='phone-pad' secret={false} value={value?.toString()} onChange={(v) => onChange(v)} />}
                                />
                                {errors?.phoneNumber && <View><Text style={styles.errorTxt}> {errors?.phoneNumber.message}</Text></View>}
                            </View>
                            <View style={styles.formLine}>
                                <Controller 
                                    control={control} 
                                    name="confirmPhoneNumber"
                                    rules={{ 
                                        required: { value: true, message: 'Veuillez confirmer votre numéro de téléphone !'},
                                        validate: value => value === control._formValues.phoneNumber || 'Les numéros de téléphone doivent correspondre !'
                                    }}
                                    render={({ field: { onChange, value } }) =>
                                        <InscriptionInput placeholder='Confirmer numéro de téléphone' keyboard='phone-pad' secret={false} value={value?.toString()} onChange={(v) => onChange(v)} />}
                                />
                                {errors?.confirmPhoneNumber && <View><Text style={styles.errorTxt}> {errors?.confirmPhoneNumber.message}</Text></View>}
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
    
            <View style={styles.btSubmit}>
                { profile.isAddProfile ? 
                    <View style={globalStyles.connectButton}>
                        <ActivityIndicator size={24} color={"#FFF"} />
                    </View> : 
                    <TouchableOpacity style={globalStyles.connectButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={globalStyles.connectButtonText}>SAUVEGARDER</Text>
                    </TouchableOpacity>
                }
            </View>
    
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
                        <Text style={styles.backLabel}>Changer votre numéro de téléphone</Text>
                    </View>
                </View>
            </View>
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
        paddingHorizontal: 20
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
    inscForm : {
        width: "100%",
        paddingHorizontal: 0,
        marginTop: 30
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
    },

    btSubmit : {
        position: 'absolute',
        width : '100%',
        left : 0,
        bottom : 10,
        justifyContent : 'center',
        alignItems :'center',
        paddingHorizontal: 20,
    }
    
  
   

}); 

export default ChangePhone;