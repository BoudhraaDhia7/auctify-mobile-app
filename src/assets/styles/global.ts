import { StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
const { width, height } = Dimensions.get('window');


export const SCREEN =  { width  : width, height : height };

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 32 : StatusBar.currentHeight;

export const colorShema = {
    backColor : "#FFF",
    primary : "#A0BFFE",
    primaryDark : "#182E5A",
    secondary: "#EE3291",
    secondaryTransparent : "rgba(243,184,214,0)",
    secondary50 : "rgba(243,184,214,0.3)",
    secondary80 : "rgba(243,184,214,0.8)", 
    tertiary : '#9C75FF',
    jaugeBg : "#EBEDFD",
    alertInfo : "#19D2B9"
}

export const globalStyles = StyleSheet.create({

    input: {
        width: '100%',
        padding: 12, 
        marginVertical: 8, 
        borderRadius: 8, 
        backgroundColor: '#f5f5f5', 
        borderWidth: 1, 
        borderColor: '#ddd', 
        fontSize: 16,
        fontFamily: 'Inter-Regular', 
        color: '#333', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5, 
    },

    container : {
        flex: 1,
        alignContent : "flex-start",
        justifyContent: "flex-start",
        backgroundColor: colorShema.backColor,
    },

    appBg : {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    bgOverlay : {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left : 0,
        backgroundColor: 'rgba(255,255,255,0)'
    },

    mainContainer : {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    mainHeader : {
        width: '100%',
        height : 80,
        marginTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    headerLogo : {
        width: 80,
        height : 80,
        resizeMode: "contain",
    },

    headerIcons : {
        height : 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    iconContainer : {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },

    headerAvatar : {
        width: 42,
        height: 42,
        borderRadius : 22,
        backgroundColor : colorShema.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2,
    },

    mainProductSelector : {
        width: '100%',
        marginTop : 10,
        height : 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal :10,
    },

    prodSelector : {
        width: '100%',
        height : 40,
        backgroundColor: 'rgba(255,255,255,.6)',
        borderRadius : 30,
    },

    prodSelectorSelected : {
        position: "absolute",
        width: "33.33%",
        height : 40,
        backgroundColor: colorShema.primary,
        borderRadius : 30,
        top : 0,
        left: 0,
    },

    prodSelectorContainer : {
        position: "absolute",
        width: "100%",
        height : 40,
        top : 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    selectorText : {
        width: "100%",
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize : 14,
        color: colorShema.primaryDark,
    },

    selectorBtText : {
        width: '33.33%',
    },


    mainProductList : {
        width: '100%',
        flex: 1,
        marginTop: 0,
        // borderTopColor : 'rgba(0,0,0,.1)',
        // borderTopWidth : 1,

    },

    mainProdListSections : {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
    },

    mainProdListSection : {
        position: 'absolute',
        width: '100%',
        height: '100%',
       
    },
    

    productListItem : {
        width: '100%',
        minHeight: 150,
        marginBottom: 0,
    },

    productListItemContainer : {
        width: SCREEN.width - 36 - 30,
        minHeight: 150,
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 20,
        marginTop: 20,
        overflow: 'hidden',
    },

    productInfos : {
        width: SCREEN.width - 270,
        minHeight : 30,
        marginLeft : 121,
        marginTop: 10,
    },

    productInfosTitle : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: colorShema.primaryDark,
        textTransform: 'uppercase',
    },

    productInfosLabel : {
        fontFamily: 'Montserrat-Regular',
        fontSize: 9,
        color: "#000",
        marginTop: 10
    },

    productInfosValue : {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
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

    prodJauge : {
        position: 'absolute',
        width: 30,
        height : 70,
        top: 40,
        right: 76,
    },

    prodOwner : {
        position: 'absolute',
        width: 70,
        height : 70,
        right: 0,
        top: 40,
        borderRadius : 10,
        backgroundColor : "rgba(255,255,255,0.9)",
        overflow: 'hidden'
    },

    prodOwnerPict : {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    prodPhoto : {
        position: 'absolute',
        width: 110,
        height : 160,
        left: 0,
        top: 20,
        borderRadius : 20,
        borderBottomRightRadius : 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        justifyContent : "center",
        alignItems: 'center',
    },

    prodPhotoPict : {
        width : '95%',
        height : '90%',
        resizeMode: 'contain',
    },

    prodParticipate : {
        position: 'absolute',
        width: '55%',
        height: 36,
        backgroundColor: colorShema.tertiary,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
        right: 0,
        borderRadius: 10,
        borderTopRightRadius : 0,
        borderBottomLeftRadius : 0,
        overflow : 'hidden',
        padding : 4
    },

    amountGiven : {
        height : '100%',
        justifyContent: 'center',
        alignItems : 'center',
        paddingHorizontal : 6,
        backgroundColor : 'rgba(255,255,255,.3)',
        borderTopLeftRadius : 8,
        borderBottomEndRadius : 6
    },

    prodAmountValue : {
        textAlign: "center",
        fontFamily: "Montserrat-Bold",
        color: '#FFF',
        fontSize: 10,
        textTransform: "uppercase"
    },


    prodParticipateText : {
        flex: 1,
        textAlign: "center",
        fontFamily: "Montserrat-Regular",
        color: '#FFF',
        fontSize: 11,
        textTransform: "uppercase"
    },


    loginContainer : {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection:'column',
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingBottom: 110,
    },

    loginMainLogo : {
        width: "100%",
        flex: 1,
        marginTop: STATUSBAR_HEIGHT,
        justifyContent: "center",
        alignItems: 'center',
    },

    loginClose : {
        position: 'absolute',
        width : 60,
        height : 60,
        justifyContent : 'center',
        alignItems : 'center',
        top : STATUSBAR_HEIGHT,
        left : 6,
    },

    loginMainLogoImage : {
        width: '100%',
        height: 180,
        resizeMode: "contain",
    },

    connectContainer : {
        width: "100%",
        paddingHorizontal: 30,
        flexDirection:'column',
        justifyContent: "center",
        alignItems: 'center',
    },

    connectTitle : {
        width: "100%",
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        color: colorShema.primaryDark,
        marginBottom: 10
    },

    forgetContainer : {
        width: '100%',
        justifyContent: 'center',
        alignItems : 'flex-end',
        marginBottom: 16,
    },
    
    forgetPass : {
        fontFamily: "Montserrat-Regular",
        fontSize: 11,
        color: "#222"
    },

    connectButton : {
        width: '100%',
        height: 60,
        backgroundColor: colorShema.primary,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: "center",
    },

    connectButtonText : {
        fontFamily: "Montserrat-Regular",
        fontSize: 15,
        color: "#FFF"
    },

    socialConnectContainer : {
        width: "100%",
        paddingHorizontal: 80,
        flexDirection:'column',
        justifyContent: "center",
        alignItems: 'center',
        marginTop : 30
    },


  



});