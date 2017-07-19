import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView,
    ListView,
    StyleSheet 
} from 'react-native';

import _ from 'lodash';

import { connect } from 'react-redux';
import { changeMessageText, sendMessage, chatUserFetch } from '../actions/AppActions';

class Chat extends Component {

    componentWillMount() {
        this.props.chatUserFetch(this.props.contactEmail);
        this.createData(this.props.chat);
    }

    componentWillReceiveProps(nextProps) {
        this.createData(nextProps.chat);
    }

    createData(chat) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(chat);
    }

    _sendMessage() {
        const { message, contactName, contactEmail} = this.props;
        this.props.sendMessage(message, contactName, contactEmail);
    }

    renderRow(text) {
        
        if(text.type === 's') {
            return(
                <View style={[styles.message, styles.messageSend]}>
                    <Text style={{ color: '#fff'}}>{text.message}</Text>
                </View>
            )
        }

        return(
            <View style={[styles.message, styles.messageReceive]}>
                <Text>{text.message}</Text>
            </View>    
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.chatMessages}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
                <KeyboardAvoidingView style={styles.keyboardAvoid} behavior='padding'>
                    <View style={styles.inputMessageContainer}>
                        <TextInput 
                            style={styles.inputMessage}
                            placeholder="Type a message..."
                            value={this.props.message}
                            onChangeText={text => this.props.changeMessageText(text)}
                        />
                        <TouchableHighlight
                            style={styles.button}
                            onPress={this._sendMessage.bind(this)}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableHighlight>    
                    </View>
                </KeyboardAvoidingView>
            </View>   
        )
    }
}

const mapStateToProps = state => {

    const chat =  _.map(state.listChatsReducer, (val, uid) => {
        return { ...val, uid }
    });

    return ({
        chat,
        message: state.AppReducer.message
    })
}

export default connect(mapStateToProps, {changeMessageText, sendMessage, chatUserFetch})(Chat);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "orange"
    },
    chatMessages: {
        flex: 1,
        paddingTop: 80,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f2f2f2'
    },
    message: {
        marginBottom: 10,
        padding: 12,
        borderRadius: 12,
    },
    messageSend: {
        alignItems: 'flex-end', 
        marginLeft: 50,  
        backgroundColor: '#3fbbcd'
    },
    messageReceive: {
        alignItems: 'flex-start', 
        marginRight: 50,
        backgroundColor: '#fff'
    },
    textMessage: {
        fontSize: 16,
        color: '#333'
    },
    keyboardAvoid: {
        justifyContent: 'flex-end'
    },
    inputMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#eee'
    },
    inputMessage: {
        flex: 3,
        height: 44,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    button: {
        width: 44,
        height: 44,
        marginLeft: 10,
        borderRadius: 64,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#313850' 
    },
    buttonText: {
        color: '#fff'
    }
})