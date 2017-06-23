import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import AddContacts from '../components/AddContacts';

export default props => (
    <Router>
        <Scene key="signIn" component={SignIn} title="Sign In" hideNavBar></Scene>
        <Scene key="signUp" component={SignUp} title="Sign Up" hideNavBar={false}></Scene>
        <Scene key="home" component={Home} title="Home"></Scene>
        <Scene key="addContacts" component={AddContacts} title="Add Contacts" hideNavBar={false}></Scene>
    </Router>
)