export const createEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('events').add({
            ...event,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: 'CREATE_EVENT', event });
        }).catch( err => {
            dispatch({ type: 'CREATE_EVENT_ERROR', err });
        })
    }
}

export const deleteEvent = (event) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('events').doc(event).delete().then(() => {
            dispatch({ type: 'DELETE_EVENT', event })
        }).catch( err => {
            dispatch({ type: 'DELETE_EVENT_ERROR', err })
        })
    }
}

export const addParticipant = (event) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('events').doc(event).collection('participants').add({
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId
        }).then(() => {
            dispatch({ type: 'ADD_PARTICIPANT', profile })
        }).catch( err => {
            dispatch({ type: 'ADD_PARTICIPANT_ERROR', err })
        })
    }
}