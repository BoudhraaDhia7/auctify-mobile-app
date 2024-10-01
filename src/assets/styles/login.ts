import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bgOverlay: {
        ...StyleSheet.absoluteFillObject, 
        zIndex: -1, 
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center', 
        paddingHorizontal: 20, 
        marginBottom: 150,
    },
    loginMainLogo: {
        alignItems: 'center', 
        marginBottom: 40, 
    },
    loginMainLogoImage: {
        width: 200, 
        resizeMode: 'contain',
    },
    connectContainer: {
        alignItems: 'center',
        width: '100%',
    },
    connectTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
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
    forgetContainer: {
        marginVertical: 10,
    },
    forgetPass: {
        color: '#64b5f6',
        fontSize: 14,
        textAlign: 'center',
    },
    connectButton: {
        width: '100%',
        paddingVertical: 15, 
        borderRadius: 8, 
        backgroundColor: '#64b5f6', 
        alignItems: 'center',
        marginTop: 20, 
    },
    connectButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1, 
    },
    loginClose: {
        position: 'absolute',
        top: 40,
        left: 20, 
    },
});
