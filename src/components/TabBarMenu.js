import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';

export default props => (
    <View style={style.header}>
        <View style={style.headerContent}>
            <Text style={style.headerTitle}>WhatsApp Clone</Text>
            <View style={style.headerLinks}>
                <TouchableHighlight onPress={() => Actions.addContacts()}>
                    <Image
                        style={{width: 18, height: 18, marginRight: 20}} 
                        source={require('../images/add-contacts.png')} 
                    />  
                </TouchableHighlight> 
                <Text style={style.link}>Sair</Text>
            </View>
        </View>
        <TabBar style={style.tabBar} {...props} />
    </View>
)

const style = StyleSheet.create({
    header: {
        paddingTop: 20,
        backgroundColor: '#3fbbcd'
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    headerLinks: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    link: {
        fontSize: 16,
        color: '#fff'
    },
    headerButtons: {
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    tabBar: {
        backgroundColor: '#46d2e6'
    }
})