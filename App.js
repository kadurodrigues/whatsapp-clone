import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './src/routes';
import reducers from './src/reducers';

export default class App extends Component {

	componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyD_cn0KXAkB90MNAx7SDCDm4TWcv4ELToQ",
            authDomain: "whatsappclone-ea888.firebaseapp.com",
            databaseURL: "https://whatsappclone-ea888.firebaseio.com",
            projectId: "whatsappclone-ea888",
            storageBucket: "whatsappclone-ea888.appspot.com",
            messagingSenderId: "715669818026"
        });
    }

	render() {
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<Routes />
			</Provider>
		);
	}
}


