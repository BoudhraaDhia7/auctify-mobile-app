import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput, ActivityIndicatorBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProdListItem from '../prodListItem';
import { colorShema } from '../../../assets/styles/global';


const SavedList = () => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const renderItems = () => {
        return(
                <View style={styles.listContainer}>   
                    
   
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

    useEffect(() => {
        setTimeout(() => { setIsLoaded(true)  }, 100);
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

export default SavedList;