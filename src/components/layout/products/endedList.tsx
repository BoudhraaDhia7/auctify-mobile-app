import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProdListItem from '../prodListItem';
import { colorShema } from '../../../assets/styles/global';
import { getEndedProductList, setproductList } from '../../../stores/productSlice';
import { useAppDispatch, useAppSelector } from '../../../stores/storeHook';
import { ProductInfo, ProductList } from '../../../apis/interfaces';


type Props = {
    selectProd : (info : ProductList|null) => void;
    particpateProd : (sel : string, info : ProductList|null) => void;
    openAuction : (id : string ) => void;
}


const EndedList = ( { selectProd, particpateProd, openAuction  } : Props) => {

    const commum = useAppSelector((state) => state.commun);
    const profile = useAppSelector((state) => state.profile);
    const product = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    const renderItems = () => {
        return(
            <View style={styles.listContainer}>
            {
              product.productList.length > 0 ? (
                product.productList.map((p, i) => (
                  <ProdListItem
                    key={`pr-${i + 1}`}
                    onSelect={selectProd}
                    prodInfo={p}
                    onParticipate={particpateProd}
                    openAuction={openAuction}
                  />
                ))
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>Aucune enchère terminé pour le moment. De nouvelles enchères seront ajoutées bientôt !</Text>
                </View>
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
        const res = await getEndedProductList(profile.connexionInfo.idClient);
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
    container: {
      position: "absolute",
      width: "100%",
      height: '100%',
      paddingTop: 0,
    },
  
    listContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },
  
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',  
      height: '100%',
    },
  
    noDataText: {
      fontSize: 18,
      color: '#333',
      textAlign: 'center',
      marginVertical: 20,
    },
  
    noDataImage: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
  });
  
  
export default EndedList;