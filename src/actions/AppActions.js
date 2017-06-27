import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';

import {
    CHANGE_ADD_CONTACT,
    SUCCESS_ADD_CONTACT,
    SUCCESS_FIND_CONTACT,
    ERROR_ADD_CONTACT,
    DISMISS_SUCCESS_VIEW,
    LOADING_ADD_CONTACT,
    LIST_USER_CONTACT
} from '../actions/type';

export const changeAddContact = email => {
    return {
        type: CHANGE_ADD_CONTACT,
        payload: email
    }
}

export const dismissSuccessView = () => {
    return {
        type: DISMISS_SUCCESS_VIEW
    }
}

// export const addContact = contact_to_add => {

//     return dispatch => {

//         dispatch({ type: LOADING_ADD_CONTACT })

//         let emailEncript = base64.encode(contact_to_add);

//         firebase.database().ref(`/contacts/${emailEncript}`)
//             .once('value')
//             .then(snapshot => {
//                 if(snapshot.val()){

//                     const userData = _.first(_.values(snapshot.val()));

//                     const { currentUser } = firebase.auth();

//                     let emailCurrentEncript = base64.encode(currentUser.email);

//                     firebase.database().ref(`/user_contacts/${emailCurrentEncript}`)
//                         .push({ email: contact_to_add, name: userData.name})
//                         .then(() => successAddContact(dispatch))
//                         .catch(error => errorAddContact(error, dispatch))

//                 } else {
//                     dispatch(
//                         {
//                             type: ERROR_ADD_CONTACT,
//                             payload: 'This email was not found!'
//                         }
//                     )
//                 }
//             })
//     }
// }

export const searchContact = contact_to_add => {

    return dispatch => {

        dispatch({ type: LOADING_ADD_CONTACT })

        let emailEncript = base64.encode(contact_to_add);

        firebase.database().ref(`/contacts/${emailEncript}`)
            .once('value')
            .then(snapshot => {

                if(snapshot.val()){

                    const contactFound = _.first(_.values(snapshot.val()));
                    successFindContact(contactFound.name, dispatch);

                } else {
                    dispatch(
                        {
                            type: ERROR_ADD_CONTACT,
                            payload: 'This email was not found!'
                        }
                    )
                }
            })
    }
}

export const userContactsFetch = () => {

    const { currentUser } = firebase.auth();

    return dispatch => {

        let emailCurrentUserEncript = base64.encode(currentUser.email);

        firebase.database().ref(`/user_contacts/${emailCurrentUserEncript}`)
            .on('value', snapshot => {
                dispatch(
                    {
                        type: LIST_USER_CONTACT,
                        payload: snapshot.val()
                    }
                )
            })
    }

}     

const successAddContact = (dispatch) => {
    dispatch(
        {
            type: SUCCESS_ADD_CONTACT
        }
    )
}

const successFindContact = (contactFound, dispatch) => {
    dispatch (
        {
            type: SUCCESS_FIND_CONTACT,
            payload: contactFound
        }
    )
}

const errorAddContact = (error, dispatch) => {
    dispatch(
        {
            type: ERROR_ADD_CONTACT,
            payload: error.message
        }
    )
}

