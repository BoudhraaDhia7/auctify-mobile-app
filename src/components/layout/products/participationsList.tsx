import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, ActivityIndicatorBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colorShema } from '../../../assets/styles/global';
import AuctionItem from '../transactions/AuctionItem';
import { getAuctionHistory, getProfileInfo } from '../../../stores/profileSlice';
import { useAppSelector } from '../../../stores/storeHook';


const ParticipationsList = () => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [history, setHistory] = useState<any>([]);
    const renderItems = () => {
        return(
                <View style={styles.listContainer}>
                    {history.map((item: any, index: number) => {
                        return <AuctionItem key={index} date={item.dateOfParticipation} action={item.productName} picture={item.productPhoto} value={item.totalBids} statues={item.status} />
                    })}
                </View>

        )
    }

    const renderLoading = () => {
        return(
            <View style={styles.listContainer}>
                <ActivityIndicator color={colorShema.primary} size={30}></ActivityIndicator>
            </View>
        )
    }
    const profile = useAppSelector((state) => state.profile);

    useEffect(() => {
        setIsLoaded(false);
        const fetchHistory = async() => {
            const data = await getAuctionHistory(profile.connexionInfo.idClient);
            
             if (data) {
                setHistory(data);
             }
           
            setIsLoaded(true);
        }
        fetchHistory();

    },[])
 
    return(
        <View style={styles.container}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
               
                    { isLoaded ? renderItems() : renderLoading() }
              
            </ScrollView>
        </View>
        
    )
}

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        height: '100%',
    },

    listContainer : {
        width : '100%',
        paddingHorizontal : 20
    }
   
}); 

export default ParticipationsList;