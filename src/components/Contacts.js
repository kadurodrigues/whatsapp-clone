import React, { Component } from 'react';
import _ from 'lodash';
import { 
    View, 
    Text,
    ListView,
    StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';

import { userContactsFetch } from '../actions/AppActions';

import Styles from './Styles';

class Contacts extends Component {

    componentWillMount(){

        this.props.userContactsFetch()
        this.createData(this.props.contacts)
    }

    componentWillReceiveProps(nextProps){

        this.createData(nextProps.contacts)
    }

    createData(contacts) {

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.listData = ds.cloneWithRows(contacts);
    }

    render() {
        return(
            <ListView
                enableEmptySections
                dataSource={this.listData}
                renderRow={data => (
                    <View style={styles.listContacts}>
                        <Text style={styles.contactName}>{data.name}</Text>
                        <Text style={styles.contactEmail}>{data.email}</Text>
                    </View>
                )}  
            />
        )
    }
}

const mapStateToProps = state => {

    const contacts = _.map(state.listContactsReducer, (val) => {
        return { ...val }
    }) 

    return { contacts }
}

export default connect(mapStateToProps, { userContactsFetch })(Contacts)

const styles = StyleSheet.create({
    listContacts: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3fbbcd'
    },
    contactEmail: {
        fontSize: 14,
        color: '#444'
    }
})