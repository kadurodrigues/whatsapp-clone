import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#3fbbcd',
    },
    tabContainer: {
        flex: 1,
    },
    tabContent: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        margin: 10,
    },
    input: {
        fontSize: 20,
        height: 45,
        marginBottom: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 10,
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#313850'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
    buttonLink: {
        marginTop: 40,
    },
    link: {
        fontSize: 16,
        color: '#fff'
    },
    errorView: {
        marginTop: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#c8ebf1'    
    },  
    errorText: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center'
    }
})