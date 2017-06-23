import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    changeEmail, 
    changePassword,
    authSignIn 
} from '../actions/AuthActions';

import Styles from './Styles';

import {  
    View, 
    Text, 
    TextInput,
    TouchableHighlight,
    Button,
    ActivityIndicator 
} from 'react-native';

class SignIn extends Component {

    _authSignIn(){
        const { email, password } = this.props;
        this.props.authSignIn({email, password});
    }

    renderButtonSignIn(){
        if(this.props.loading){
            return(
                <ActivityIndicator color="white" />
            )
        }
        return(
            <Text style={Styles.buttonText}>Login</Text>
        )
    }

    render(){
        return(
            <View style={Styles.container}> 
                <Text style={Styles.title}>WhatsApp Clone</Text>
                <TextInput 
                    style={Styles.input} 
                    placeholder="Email"
                    value={this.props.email}
                    onChangeText={text => this.props.changeEmail(text)} 
                />
                <TextInput 
                    secureTextEntry 
                    style={Styles.input} 
                    placeholder="Password" 
                    value={this.props.password}
                    onChangeText={text => this.props.changePassword(text)}
                />
                <Text style={Styles.errorText}>{this.props.errorSignIn}</Text>
                <TouchableHighlight 
                    style={Styles.button}
                    onPress={() => this._authSignIn()}
                >   
                    {this.renderButtonSignIn()}
                </TouchableHighlight>
                <Button
                    title="No account yet? Sign Up right now!"
                    color="#fff"
                    onPress={() => Actions.signUp() }
                />
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        email: state.AuthReducer.email,
        password: state.AuthReducer.password,
        errorSignIn: state.AuthReducer.errorSignIn,
        loading: state.AuthReducer.loadingAuthSignIn
    }
)

export default connect(mapStateToProps, {changeEmail, changePassword, authSignIn})(SignIn);

