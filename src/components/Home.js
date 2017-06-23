import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
    TabViewAnimated, 
    SceneMap 
} from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import Chats from './Chats';
import Contacts from './Contacts';

import Styles from './Styles';

export default class Home extends Component {

    state = {
        index: 0,
        routes: [
            { key: 'chats', title: 'Chats' },
            { key: 'contacts', title: 'Contacts' },
        ],
    };

    _handleChangeTab = index => this.setState({ index });

    _renderHeader = props => <TabBarMenu {...props} />;

    _renderScene = SceneMap({
        'chats': Chats,
        'contacts': Contacts
    });

    render() {
        return (
            <TabViewAnimated
                style={Styles.tabContainer}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }
}
