import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PICT_URL } from '../../../apis/axiosConfig';

type Props = {
    date: string;
    action: string;  // Expected to be 'ongoing', 'won', or 'lost'
    value: number;
    picture?: string;  // URL of the product picture
    statues: string;
};

const AuctionItem = ({ date, action, value, picture, statues }: Props) => {
    console.log("picture", statues)
    const getStatusColor = () => {
        switch (statues) {
            case 'Ongoing':
            return '#FFA500'; // Orange for ongoing
            case 'Won':
            return '#32CD32'; // LimeGreen for won
            case 'Lost':
            return '#FF4500'; // OrangeRed for lost
            default:
            return '#FFA500'; // LimeGreen as default
        }
    };

    
    function generateImgUrl(filePath: string) {
        console.log("filePath", filePath)
        if (filePath.includes('http')) return filePath + "&format=png"
    
        // Replace backslashes with forward slashes
        const normalizedFilePath = filePath.replace(/\\/g, '/')
    
        // Ensure the filePath is properly encoded after normalization
        const cleanFilePath = encodeURI(normalizedFilePath)
        console.log("cleanFilePath", PICT_URL +cleanFilePath)
        return `${PICT_URL}${cleanFilePath}`
        }

    return (
        <View style={styles.container}>
            <View style={styles.auctionItem}>
                <Image source={{ uri: generateImgUrl(picture ?? '') }} style={styles.auctionAvatar} />

                <View style={styles.auctionInfo}>
                    <Text style={styles.auctionDate}>{date}</Text>
                    <Text style={styles.auctionAction}>{action}</Text>
                </View>

                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            </View>
            <Text style={styles.auctionValue}>{value}</Text>
        </View>

    );
};

export const styles = StyleSheet.create({
    container : {
        width: "100%",
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        borderBottomColor : "rgba(255,255,255,.6)",
        borderBottomWidth : 1,
        paddingBottom: 10,
        marginBottom : 10
    },


    auctionItem : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems : 'center'
    },

    auctionAvatar : {
        width : 60,
        height : 60,
        borderRadius : 30,
        overflow: 'hidden',
        marginRight : 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    auctionInfo : {
        flexDirection : 'column',
        justifyContent: 'flex-start',
        alignItems : 'flex-start'
    },

    auctionDate : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 12,
        fontWeight: 'bold',
        color : '#333'
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 19,
    },

    auctionAction : {
        fontFamily: 'Montserrat-Regular',
        fontSize : 11,
        color : '#333'
    },

    transactionProfile : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 14,
        color : '#333'
    },

    auctionValue : {
        fontFamily: 'Credit-CardFont',
        fontSize : 16,
        color : '#333'
    },

    avatarName : {
        fontFamily: 'Montserrat-Bold',
        fontSize : 16,
        color : '#FFF'
    },


}); 


export default AuctionItem;
