import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colorShema, globalStyles } from '../../assets/styles/global';
import Jauge from '../products/jauge';
import { ProductInfo, ProductList } from '../../apis/interfaces';
import { BASE_URL, PICT_URL } from '../../apis/axiosConfig';
import { toUtcDate } from '../../helpers';

type Props = {
    prodInfo : ProductList;
    onSelect : (info : ProductList|null) => void;
    onParticipate : (sel : string,  info : ProductList) => void;
    openAuction : (id : string ) => void;
}


const ProdListItem = ( { prodInfo, onSelect, onParticipate, openAuction } : Props) => {

    const prc = (prodInfo.total / ( prodInfo.prodPrice * prodInfo.prodBenefit )) * 100;

    const participBg = (prodInfo.myTotal > 0) ? colorShema.secondary : colorShema.tertiary;

    const [ timeDiff, setTimeDiff ] = useState<number>(0);
    const [ timeDiffText, setTimeDiffText ] = useState<string>('');

    const counter = () => {
        const diff = toUtcDate(prodInfo.openDate)?.getTime() - toUtcDate()?.getTime();
        const diffText = (new Date(diff).getUTCDate() - 1) + ' : ' + new Date(diff).getUTCHours() + ' : ' + new Date(diff).getUTCMinutes() + ' : ' + new Date(diff).getUTCSeconds();
        setTimeDiff(diff);
        setTimeDiffText(diffText);
    }

    useEffect(() => {
        counter();
        const interval = setInterval(() => {
            counter();
        }, 1000);
        
          return () => clearInterval(interval);

    }, [])


    return(
        <TouchableOpacity activeOpacity={.90} style={globalStyles.productListItem} onPress={() => onSelect(prodInfo)}>
            <View style={globalStyles.productListItemContainer}>
                <View style={globalStyles.productInfos}>
                    <Text style={globalStyles.productInfosTitle}>{prodInfo.prodName}</Text>
                    <Text style={globalStyles.productInfosLabel}>Prix magasin</Text>
                    <View style={globalStyles.productInfosPrice}>
                        <Text style={globalStyles.productInfosValue}>{prodInfo.prodPrice}</Text>
                        <Text style={globalStyles.productInfosCurrency}>TND</Text>
                    </View>
                    
                </View>
                { prodInfo.prodStatus == 1 && <TouchableOpacity style={[globalStyles.prodParticipate, { backgroundColor : participBg}]} onPress={() => onParticipate( "PARTICIPATE", prodInfo)}>
                    {(prodInfo.myTotal > 0) && <View style={globalStyles.amountGiven}>
                        <Text style={globalStyles.prodAmountValue}>{prodInfo.myTotal}</Text>
                    </View>}
                    <Text style={globalStyles.prodParticipateText}>{(prodInfo.myTotal > 0) ? "Reparticipez" : "Participez"}</Text>
                </TouchableOpacity>}

                { (prodInfo.prodStatus == 2 && timeDiff < 0) && <TouchableOpacity style={[globalStyles.prodParticipate, { backgroundColor : participBg}]} onPress={() => openAuction( prodInfo._id )}>
                    {(prodInfo.myTotal > 0) && <View style={globalStyles.amountGiven}>
                        <Text style={globalStyles.prodAmountValue}>{prodInfo.myTotal}</Text>
                    </View>}
                    <Text style={globalStyles.prodParticipateText}>{"Jouer"}</Text>
                </TouchableOpacity>}

                { (prodInfo.prodStatus == 2 && timeDiff > 0) && <TouchableOpacity style={[globalStyles.prodParticipate, { backgroundColor : participBg}]} onPress={() => console.log( prodInfo._id )}>
                    {(prodInfo.myTotal > 0) && <View style={globalStyles.amountGiven}>
                        <Text style={globalStyles.prodAmountValue}>{prodInfo.myTotal}</Text>
                    </View>}
                    <Text style={globalStyles.prodParticipateText}>{ timeDiffText}</Text>
                </TouchableOpacity>}


            </View>
            <LinearGradient style={globalStyles.prodPhoto} colors={[colorShema.primary, colorShema.secondary50, colorShema.secondaryTransparent]}>
                <Image style={globalStyles.prodPhotoPict} source={{ uri : `${BASE_URL}${prodInfo.prodPicture[0].filePath}`}} />
            </LinearGradient>
            <View style={globalStyles.prodOwner}>
                <Image style={globalStyles.prodOwnerPict} source={{ uri : `${BASE_URL}${prodInfo.companyLogo}`}} />
            </View>
            <View style={globalStyles.prodJauge}>
                <Jauge pourcent={prc} />
            </View>
        </TouchableOpacity>
        
    )
}


export default ProdListItem;