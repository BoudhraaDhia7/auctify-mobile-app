import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation, Easing, Extrapolate, withTiming } from 'react-native-reanimated';

import { SCREEN, globalStyles } from '../../assets/styles/global';

import { useAppSelector, useAppDispatch } from '../../stores/storeHook';
import { selectMainSection } from '../../stores/communSlice';


type Props = {
    select : (ss : number) => void;
}

const ProdSelector = ({ select } : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const dispatch = useAppDispatch();

    const sharedX = useSharedValue(0);

    const [selectedSection, setSelectedSection] = useState<number>(0);

    const selectWidth : number = (SCREEN.width - 20) * (33.33 / 100 );

    const animatedStyles = useAnimatedStyle(() => {
        const translateX = interpolate(sharedX.value, [0, 1, 2], [0, selectWidth, selectWidth * 2], Extrapolate.CLAMP);
        return {
            transform: [{ translateX: translateX }],
        };
    });


    const animSelect = (s : number) => {
        sharedX.value = withTiming(s, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        select(s);
        setTimeout(() => { setSelectedSection(s) }, 50);
    }

    return(
        <View style={globalStyles.prodSelector}>
            <Animated.View style={[globalStyles.prodSelectorSelected, animatedStyles]}></Animated.View>
            <View style={globalStyles.prodSelectorContainer}>
                <TouchableOpacity style={globalStyles.selectorBtText} onPress={() => animSelect(0) }>
                    <Text style={{...globalStyles.selectorText, color : selectedSection == 0 ? "#FFF" : "#333"}}>Prochaines</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={globalStyles.selectorBtText} onPress={() => animSelect(1) }>
                    <Text style={{...globalStyles.selectorText, color : selectedSection == 1 ? "#FFF" : "#333"}}>En Cours</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.selectorBtText} onPress={() => animSelect(2) }>
                    <Text style={{...globalStyles.selectorText, color : selectedSection == 2 ? "#FFF" : "#333"}}>Terminés</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}


export default ProdSelector;