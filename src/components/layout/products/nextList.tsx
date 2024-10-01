import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProdListItem from '../prodListItem';
import { colorShema } from '../../../assets/styles/global';
import { getProductList, setproductList } from '../../../stores/productSlice';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { ProductInfo, ProductList } from '../../../apis/interfaces';


type Props = {
    selectProd : (info : ProductList|null) => void;
    particpateProd : (sel : string, info : ProductList|null) => void;
    openAuction : (id : string ) => void;
}


const NextList = ( { selectProd, particpateProd, openAuction  } : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const profile = useAppSelector((state) => state.profile);
    const product = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    const renderItems = () => {
        return(
                <View style={styles.listContainer}>
                    {
                        product.productList.map((p, i) => 
                            <ProdListItem key={`pr-${i+1}`} onSelect={selectProd}  prodInfo={p} onParticipate={particpateProd} openAuction={openAuction} />
                        )
                    }
                    
                </View>
        )
    }

    const renderLoading = () => {
        return(
            <View style={styles.listContainer}>
                <View style={{ width :'100%', marginTop : 60 }}>
                    <ActivityIndicator color={colorShema.primary} size={30}></ActivityIndicator>
                </View>
                
            </View>
        )
    }

    const getProducts = async() => {
        setIsLoaded(false)
        const res = await getProductList(profile.connexionInfo.idClient);
        console.log(res, profile.connexionInfo.idClient);
        dispatch(setproductList(res))
        setIsLoaded(true);
    }

    useEffect(() => {
        setTimeout(() => { getProducts()  }, 100);
    },[])
 
    return(
        <View style={styles.container}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
               
                    { isLoaded ? renderItems() : renderLoading() }
                    <View style={{ width: '100%', height : 20}}></View>
              
            </ScrollView>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        position: "absolute",
        width: "100%",
        height: '100%',
        paddingTop : 0
    },

    listContainer : {
        width : '100%',
        paddingHorizontal : 20,
    }
   
}); 

export default NextList;