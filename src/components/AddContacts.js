import React, { Component } from 'react';
import {
    View, 
    Text, 
    TextInput, 
    TouchableHighlight,
    Alert,
    ActivityIndicator,
    StyleSheet 
} from 'react-native';

import { connect } from 'react-redux';
import { 
    changeAddContact,
    searchContact,
    dismissSuccessView
} from '../actions/AppActions';

import Styles from './Styles';

class AddContacts extends Component {

    renderButtonAddContact(){
        if(this.props.loading){
            return(
                <ActivityIndicator color="white" />
            )
        }
        return(
            <Text style={styles.buttonText}>Search</Text>
        )
    }

    successMessage(){
        if(this.props.successViewAddContact){
            return(
                Alert.alert(
                    'Success!!',
                    'The contact was added successfully!',
                    [{text: 'OK', onPress: () => this.props.dismissSuccessView() }],   
                )
            )
        }
    }

    errorMessage() {
        if(this.props.errorViewAddContact) {
            return(
                <View style={Styles.errorView}>
                    <Text style={Styles.errorText}>{this.props.errorTextAddContact}</Text>
                </View>
            )
        }
    }

    resultSearch() {

        if(this.props.searchResult) {

            return(
                <View>
                    <Text style={styles.resultTitle}>User found:</Text>
                    <View style={styles.resultSearch}>
                        <Text style={styles.resultName}>{this.props.contactFoundName}</Text>
                        <TouchableHighlight style={styles.buttonAddContact}>
                            <Text style={styles.buttonAddContactText}>Add +</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    style={Styles.input} 
                    placeholder="Email"
                    value={this.props.contact_to_add}
                    onChangeText={(text) => this.props.changeAddContact(text)}
                />
                <View>
                    {this.successMessage()}
                    {this.errorMessage()}
                </View>
                <TouchableHighlight
                    style={styles.button} 
                    onPress={() => this.props.searchContact(this.props.contact_to_add)}
                >
                    {this.renderButtonAddContact()}
                </TouchableHighlight>
                { this.resultSearch() }
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        contact_to_add: state.AppReducer.contact_to_add,
        loading: state.AppReducer.loadingAddContact,
        searchResult: state.AppReducer.contactSearchResult,
        contactFoundName: state.AppReducer.contactFoundName,
        successViewAddContact: state.AppReducer.successViewAddContact,
        errorViewAddContact: state.AppReducer.errorViewAddContact,
        errorTextAddContact: state.AppReducer.errorTextAddContact
    }
)

export default connect(mapStateToProps, {changeAddContact, searchContact, dismissSuccessView})(AddContacts)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 20,
        backgroundColor: '#eee'
    },
    input: {
        fontSize: 16,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#313850', 
        borderWidth: 1
    },
    button: {
        marginTop: 20,
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#313850'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    },
    buttonAddContact: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#313850'
    },
    buttonAddContactText: {
        color: '#fff'
    },
    resultSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 10,
        backgroundColor: '#fff'
    },
    resultTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    resultName: {
        marginTop: 5,
        fontSize: 16,
        color: '#333'
    },
    resultEmail: {
        color: '#bbb'
    }
})