import firebase from 'firebase/storage';

export const createEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        const test = getFirebase()
        const storage = test.storage()
        const storageRef = storage.ref()
        const ref = storageRef.child(`images/${event.file.name}`)
        const blob = event.file;

        ref.put(blob)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => {
                firestore.collection('events').add({
                    title: event.title,
                    content: event.content,
                    image: downloadURL,
                    authorFirstName: profile.firstName,
                    authorLastName: profile.lastName,
                    authorId: authorId,
                    createdAt: new Date(),
                }).then(() => {
                    dispatch({ type: 'CREATE_EVENT', event });
                }).catch( err => {
                    dispatch({ type: 'CREATE_EVENT_ERROR', err });
                })
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

        firestore.collection('participants').doc(event).set({
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