import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import { SCREEN, STATUSBAR_HEIGHT, colorShema } from '../../../assets/styles/global';
import Jauge from '../../products/jauge';
import { ProductInfo, ProductList } from '../../../apis/interfaces';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { BASE_URL, PICT_URL } from '../../../apis/axiosConfig';


type Props = {
    close : () => void;
    particpateProd : (sel : string, info : ProductList|null) => void;
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


const Product = ( { close, particpateProd } : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const profile = useAppSelector((state) => state.profile);
    const product = useAppSelector((state) => state.product);
    

    const dispatch = useAppDispatch();

        const prc =  product.selectedProd ? ((product.selectedProd?.total / ( product.selectedProd?.prodPrice * product.selectedProd?.prodBenefit )) * 100) : 0;
 


    const animValue = useSharedValue(0);
    const translationY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y;
        console.log(event.contentOffset.y)
    });

    const pictAnimStyle = useAnimatedStyle(() => {
        return { transform: [{ translateY: translationY.value *.75 }]};
    });

    const headerAnimStyle = useAnimatedStyle(() => {
        const ty = interpolate(translationY.value, [SCREEN.width - 180, SCREEN.width - 80], [ -100, 0 ], Extrapolate.CLAMP);
        return {transform: [{translateY : ty}] };
    });

    const animatedStyles = useAnimatedStyle(() => {
        const ty = interpolate(animValue.value, [0, 1], [ SCREEN.height / 2 , 0 ], Extrapolate.CLAMP);
        const r = interpolate(animValue.value, [0,3, 1], [ 10, 0 ], Extrapolate.CLAMP);
        const t = interpolate(animValue.value, [0, 1], [ 0, 1 ], Extrapolate.CLAMP);
        return { borderRadius : r, opacity: t, transform: [{translateY : ty}] };
    });
    console.log("product.selectedProd", product.selectedProd);
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

    function generateImgUrl(filePath: string) {
        if (filePath.includes('http')) return filePath + "&format=png"
        console.log("filazeazeazePath", PICT_URL,filePath);
        return `${PICT_URL}${filePath}`;
      }

      console.log("product.selectedProd", product);
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
                            <Image style={{ alignSelf: 'center', marginTop: '20%', width: "50%", height: "50%", resizeMode: 'contain'}} source={{ uri :  generateImgUrl(product.selectedProd?.prodPicture[0].filePath)}} />
                        </LinearGradient>
                    </Animated.View>
                    
                    <View style={styles.detailsZone}>
                        <View style={styles.timingContainer}>
                            <View style={styles.detailsTiming}>
                                <Icon name="clock" size={20} color="#FFF" /> 
                                <Text style={styles.timingText}>{product.selectedProd.prodStatus == 3 ? 'Enchére termine' : 'Bientôt disponible'}</Text>
                            </View>
                        </View>

                        <View style={styles.productInfos}>
                            <Text style={styles.productInfosTitle}>{product.selectedProd?.prodName}</Text>
                            <Text style={styles.productInfosLabel}>Prix magasin</Text>
                            <View style={styles.productInfosPrice}>
                                <Text style={styles.productInfosValue}>{product.selectedProd?.prodPrice}</Text>
                                <Text style={styles.productInfosCurrency}>TND</Text>
                            </View>
                        </View>
                        {
                            product.selectedProd.prodStatus != 3 && (
                                <TouchableOpacity style={styles.participationBt} onPress={() => particpateProd("PARTICIPATE", product.selectedProd)}>
                                    <Text style={styles.participationText}>PARTICIPER A 1D</Text>
                                </TouchableOpacity>
                            )
                        }
                   

                        <View style={styles.productInfos}>
                            <Text style={styles.descrTitle}>Descprition</Text>
                            <RenderHtml baseStyle={{ fontFamily: "Montserrat-Regular"}} systemFonts = {[ ...defaultSystemFonts, 'Montserrat-Regular', 'Montserrat-Bold' ]} contentWidth={SCREEN.width} source={{ html : `${product.selectedProd?.prodDescription}`}} />
                        </View>
                        
                        <LinearGradient style={styles.magasinContainer} colors={["#9C75FF", "#6FA1FF"]}>
                            <View style={styles.magasinLogoContainer}>
                            <Image style={{ alignSelf: 'center', width: "100%", height: "100%", resizeMode: 'contain'}}  source={{ uri : generateImgUrl(product.selectedProd?.companyLogo)}}  />
                            </View>
                            <View style={styles.magasinInfoContainer}>
                                <Text style={styles.magasinInfoTitle}>{product.selectedProd?.companyName}</Text>
                                {/* <Text style={styles.magasinInfoData}>{product.selectedProd?.company.address}</Text>
                                <Text style={styles.magasinInfoData}>{product.selectedProd?.company.city} - {product.selectedProd?.company.country}</Text>
                                <Text style={styles.magasinInfoData}>Mobile : {product.selectedProd?.company.phone}</Text> */}
                            </View>
                        </LinearGradient>
                        

                        <View style={styles.jaugeContainer}>
                            <Jauge pourcent={prc} />
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
                        <Text style={styles.backLabel}>{product.selectedProd?.prodName}</Text>
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
        backgroundColor : 'rgba(255,255,255,.98)'
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
        width: 30,
        height : 40,
        justifyContent: "center",
        alignItems: 'flex-start',
    },

    backLabel : {
        fontFamily: "Montserrat-Regular",
        fontSize : 11,
        color: "#FFF",
     
    },

    parentScroll : {
        width: '100%',
        flex: 1,
        backgroundColor : '#ccc'
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
        minHeight : SCREEN.height + 60,
        backgroundColor : '#FFF',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        marginTop : SCREEN.width - 20,
        paddingHorizontal: 20
    },

    timingContainer : {
        width: "100%",
        marginTop : -20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    detailsTiming : {
        backgroundColor: colorShema.primary,
        borderRadius : 10,
        paddingHorizontal : 10,
        height : 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    timingText : {
        fontFamily: "Montserrat-Regular",
        fontSize : 11,
        color: "#FFF",
        paddingLeft: 6
    },

    productInfo : {
        width: '100%',
        marginTop : 10,
    },

    productTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize : 16,
        color: "#333",
    },

    productInfos : {
        width: '100%',
        marginTop : 20
    },

    productInfosTitle : {
        width: '80%',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: colorShema.primaryDark,
        textTransform: 'uppercase',
    },

    productInfosLabel : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        color: "#000",
        marginTop: 10
    },

    productInfosValue : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: "#000",
    },

    productInfosCurrency : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 9,
        color: "#000",
        marginLeft: 3,
    },

    productInfosPrice : {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems :"center",
    },

    descrTitle : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        color: "#000",
        marginBottom: 10,
        marginTop : 20
    },

    jaugeContainer : {
        position: 'absolute',
        right : 20,
        top: 10,
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

    magasinContainer : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
        marginTop: 36,
        padding : 10
    },

    magasinLogoContainer : {
        width : 100,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden'
    },

    magasinInfoContainer : {
        paddingLeft: 10,
        flex: 1,
    },

    magasinInfoTitle : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        color: "#FFF",
    },

    magasinInfoData : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: "#FFF",
    },

  
   

}); 

export default Product;