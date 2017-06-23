import React, { Component } from 'react';
import {  
    View, 
    Text,
    TextInput,
    TouchableHighlight,
    Alert 
} from 'react-native';

import { connect } from 'react-redux';
import { 
    changeName,
    changeEmail,
    changePassword,
    authSignUp,
    clearStates 
} from '../actions/AuthActions';

import Styles from './Styles';

class SignUp extends Component {

    _authSignUp(){
        const { name, email, password } = this.props;
        this.props.authSignUp({name, email, password});
    }

    errorMessage(){
        if(this.props.errorView){
            return(
                <View style={Styles.errorView}>
                    <Text style={Styles.errorText}>{this.props.errorText}</Text>
                </View>
            )
        }
    }

    successMessage(){
        if(this.props.successView){
            return(
                Alert.alert(
                    'Success!!',
                    'Your account was created successfully!',
                    [{text: 'OK', onPress: () => this.props.clearStates() }],   
                )
            )
        }
    }

    render(){
        return(
            <View style={Styles.container}> 
                <Text style={Styles.title}>Create your account!</Text>
                <TextInput 
                    style={Styles.input} 
                    placeholder="Name"
                    value={this.props.name}
                    onChangeText={(text) => this.props.changeName(text)} 
                />
                <TextInput 
                    style={Styles.input} 
                    placeholder="Email"
                    value={this.props.email}
                    onChangeText={(text) => this.props.changeEmail(text)} 
                />
                <TextInput 
                    secureTextEntry 
                    style={Styles.input} 
                    placeholder="Password" 
                    value={this.props.password}
                    onChangeText={(text) => this.props.changePassword(text)}
                />
                <View>
                    {this.errorMessage()}
                    {this.successMessage()}
                </View>
                <TouchableHighlight 
                    style={Styles.button}
                    onPress={() => this._authSignUp()}
                >
                    <Text style={Styles.buttonText}>Create</Text>
                </TouchableHighlight>  
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        name: state.AuthReducer.name,
        email: state.AuthReducer.email,
        password: state.AuthReducer.password,
        errorView: state.AuthReducer.errorView,
        errorText: state.AuthReducer.errorSignUp,
        successView: state.AuthReducer.successView
    }
)

export default connect(mapStateToProps,{changeName, changeEmail, changePassword, clearStates, authSignUp})(SignUp);