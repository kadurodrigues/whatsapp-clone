import firebase from 'firebase';
import base64 from 'base-64';
import _ from 'lodash';

import {
    CHANGE_ADD_CONTACT,
    CHANGE_TEXT_MESSAGE,
    SUCCESS_ADD_CONTACT,
    SUCCESS_FIND_CONTACT,
    ERROR_ADD_CONTACT,
    DISMISS_SUCCESS_VIEW,
    LOADING_ADD_CONTACT,
    LIST_USER_CONTACT,
    LIST_USER_CHAT,
    SUCCESS_MESSAGE_SEND
} from '../actions/type';

export const changeAddContact = email => {
    return {
        type: CHANGE_ADD_CONTACT,
        payload: email
    }
}

export const changeMessageText = text => {
    return {
        type: CHANGE_TEXT_MESSAGE,
        payload: text
    }
}

export const sendMessage = (message, contactName, contactEmail) => {

    const { currentUser } = firebase.auth();
    const userEmail = currentUser.email;    

    return dispatch => {

        const userEmailEncript = base64.encode(userEmail);
        const contactEmailEncript = base64.encode(contactEmail);

        firebase.database().ref(`/messages/${userEmailEncript}/${contactEmailEncript}`)
            .push({ message, type: 's'})
            .then(() => {
                firebase.database().ref(`/messages/${contactEmailEncript}/${userEmailEncript}`)
                    .push({ message, type: 'r' })
                    .then(() => dispatch({ type: SUCCESS_MESSAGE_SEND }))     
            })
            .then(() => {
                firebase.database().ref(`/user_chat/${userEmailEncript}/${contactEmailEncript}`)
                    .set({ nome: contactName, email: contactEmail })
            })
            .then(() => {
                firebase.database().ref(`/contacts/${userEmailEncript}`)
                    .once('value')
                    .then(snapshot => {

                        const dataUser = _.first(_.values(snapshot.val()));

                        firebase.database().ref(`/user_chat/${contactEmailEncript}/${userEmailEncript}`)
                            .set({ nome: dataUser.name, email: userEmail })
                    })
            })
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
                dispatch({ type: LIST_USER_CONTACT, payload: snapshot.val() })
            })
    }
}


export const chatUserFetch = contactEmail => {

    const { currentUser } = firebase.auth();

    let userEmailEncript = base64.encode(currentUser.email);
    let contactEmailEncript = base64.encode(contactEmail);

    return dispatch => {
        firebase.database().ref(`/messages/${userEmailEncript}/${contactEmailEncript}`)
            .on('value', snapshot => {
                dispatch({ type: LIST_USER_CHAT, payload: snapshot.val() })
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

