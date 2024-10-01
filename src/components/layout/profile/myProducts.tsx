import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import { SCREEN, STATUSBAR_HEIGHT, colorShema } from '../../../assets/styles/global';
import Jauge from '../../products/jauge';


type Props = {
    close : () => void;
}

const source = {
    html: `
    <div style="width=100vw">
            <div style="text-align: left;
            color: #666666;
            margin: 0;"><div style="font-family: 'Montserrat-Bold': left;">html</div> description produit</div>
      </div>
    `
  };


const MyProducts = ( { close } : Props) => {

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
                        

                        <TouchableOpacity style={styles.participationBt}>
                            <Text style={styles.participationText}>PARTICIPER A 1D</Text>
                        </TouchableOpacity>

                       

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
                        <Text style={styles.backLabel}>Mes Produits</Text>
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
        marginTop : (STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT : 40) + 60,
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

    
  
   

}); 

export default MyProducts;