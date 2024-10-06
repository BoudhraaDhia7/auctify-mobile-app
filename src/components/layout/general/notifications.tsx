import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, View, Image, Text, TouchableOpacity, BackHandler, ActivityIndicator, Pressable, TextInput } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, Extrapolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { SCREEN, STATUSBAR_HEIGHT } from '../../../assets/styles/global';
import { getNotification } from '../../../apis/actions';
import { FlatList } from 'react-native-gesture-handler';
import { PICT_URL } from '../../../apis/axiosConfig';


type Props = {
    close : () => void;
}

const Notifications = ( { close } : Props) => {

    const animValue = useSharedValue(0);
    const [notifications, setNotifications] = useState<any[]>([]);
    const animatedStyles = useAnimatedStyle(() => {
        const tx = interpolate(animValue.value, [0, 1], [ SCREEN.width / 2, 0 ], Extrapolate.CLAMP);
        const r = interpolate(animValue.value, [0,3, 1], [ 10, 0 ], Extrapolate.CLAMP);
        const t = interpolate(animValue.value, [0, 1], [ 0, 1 ], Extrapolate.CLAMP);
        return {
            borderRadius : r,
            opacity: t,
            transform: [{translateX : tx}]
        };
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
    const timeAgo = (date: Date) => {
        const now = new Date();
        const secondsPast = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
      
        if (secondsPast < 60) {
          return `${secondsPast} seconds ago`;
        }
        if (secondsPast < 3600) {
          const minutes = Math.floor(secondsPast / 60);
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        if (secondsPast <= 86400) {
          const hours = Math.floor(secondsPast / 3600);
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        if (secondsPast <= 2592000) {
          const days = Math.floor(secondsPast / 86400);
          return `${days} day${days > 1 ? 's' : ''} ago`;
        }
        if (secondsPast <= 31536000) {
          const months = Math.floor(secondsPast / 2592000);
          return `${months} month${months > 1 ? 's' : ''} ago`;
        }
        
        const years = Math.floor(secondsPast / 31536000);
        return `${years} year${years > 1 ? 's' : ''} ago`;
      };

      
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchNotifications = async () => {
          try {
            const response = await getNotification();
            setNotifications(response); 
          } catch (error) {
            console.error('Error fetching notifications:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchNotifications();
      }, []);

      function generateImgUrl(filePath: string) {

        if (filePath.includes('http')) return filePath + "&format=png"
    
        const normalizedFilePath = filePath.replace(/\\/g, '/')
    
        const cleanFilePath = encodeURI(normalizedFilePath)
    
        return `${PICT_URL}${cleanFilePath}`
        }

        
      const renderNotification = ({ item }: { item: any }) => (
        <View style={styles.notificationItem}>

          <Image source={{ uri: generateImgUrl(item.avatar ?? '')  ,cache: 'force-cache',}} style={styles.avatar} onError={(e) => console.log("Image failed to load", e.nativeEvent.error)} />
      
          <View style={styles.notificationTextContainer}>
            <Text style={styles.textLine}>
              <Text style={styles.nickname}>{item.nickname} </Text> 
              <Text style={styles.content}>{item.content}</Text>
            </Text>
      
            <Text style={styles.timeAgo}>{timeAgo(item.date)}</Text>
          </View>
        </View>
      );

    return(
        <Animated.View style={[styles.container, animatedStyles]}>
        <View style={styles.backSection}>
          <View style={styles.backContainer}>
            <TouchableOpacity style={styles.backIcon} onPress={() => thisClose()}>
              <Icon name="chevron-left" size={34} color="#333" />
            </TouchableOpacity>
          
            <Text style={styles.backLabel}>Notifications</Text>
          </View>
        </View>
      
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          contentContainerStyle={styles.notificationList}
        />
      </Animated.View>
      
        
    )
}

export const styles = StyleSheet.create({
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50, // Make it round
        marginLeft: 10, // Adds space between the icon and text
      },
      backLabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#333',
        marginLeft: 10, // Adds space between the avatar and the label
      },
    notificationItem: {
        flexDirection: 'row', // Places image on the right
        alignItems: 'center',         // Vertically aligns nickname and content
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      avatar: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginLeft: 10, 
        marginRight: 10,
      },
      notificationTextContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      textLine: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      nickname: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
      },
      content: {
        fontSize: 14,
        color: '#555',
      },
      timeAgo: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 5,
      },
    notificationList: {
        paddingTop: 5,
      },

      notificationTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#333',
      },
      notificationBody: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: '#666',
        marginTop: 5,
      },
    container : {
        position: 'absolute',
        width: "100%",
        height : '100%',
        backgroundColor : 'rgba(255,255,255,.98)'
    },
    backSection : {
        width: "100%",
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal : 10,
        marginTop : STATUSBAR_HEIGHT,
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


   

}); 

export default Notifications;
