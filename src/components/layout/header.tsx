import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { SCREEN, colorShema, globalStyles } from '../../assets/styles/global';
import { useAppDispatch, useAppSelector } from '../../stores/storeHook';

type Props = {
    navigateTo : (sc : string) => void;
    openNotif : () => void;
}

const MainHeader = ({ navigateTo, openNotif } : Props) => {

    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    

    return(
        <>
            <Image style={globalStyles.headerLogo} source={require('../../assets/images/logo.png')} />
            <View style={globalStyles.headerIcons}>
                <TouchableOpacity style={globalStyles.iconContainer} onPress={() => navigateTo('Favourite')}>
                    <Icon name="bookmark" size={24} color="#333" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={globalStyles.iconContainer} onPress={() => navigateTo('Saved')}>
                    <Icon name="heart" size={24} color="#333" />
                </TouchableOpacity> */}
                <TouchableOpacity style={{...globalStyles.headerAvatar, marginRight: 10, backgroundColor: "#9C6CFE", borderRadius : 20}}  onPress={() => navigateTo('Cart')}>
                    <Icon name="shopping-cart" size={20} color="#FFF" />
                </TouchableOpacity>

                
                
                <TouchableOpacity style={globalStyles.headerAvatar} onPress={() => navigateTo('Profil')}>
                    { profile.connexionInfo.isLogin && <Image style={{ width: '100%', height: '100%' }} source={{uri : profile.profileInfo?.avatar}} /> }
                    { !profile.connexionInfo.isLogin && <Icon name="user" size={21} color="#FFF" /> }
                </TouchableOpacity>
                <TouchableOpacity style={{...globalStyles.iconContainer, alignItems: 'flex-end', marginRight: 1, marginLeft: 6}}  onPress={() => openNotif()} >
                    <Icon name="bell" size={24} color="#333" />
                </TouchableOpacity>
                
            </View>
        </>
        
    )
}


export default MainHeader;