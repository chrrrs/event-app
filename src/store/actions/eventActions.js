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
                    organization: profile.organization,
                    authorId: authorId,
                    createdAt: new Date(),
                    participants: [],
                    challenges: [
                        {
                            challengeTitle: 'Attend in person',
                            challengeDesc: 'Attend an event, get the event kode from the event organizer and earn some points ',
                            points: 150
                        },
                        {
                            challengeTitle: 'Meet a new person',
                            challengeDesc: 'Meet a new person at the event, make a connection and get their code - earn some points and maybe you can get coffee together',
                            points: 245
                        },
                        {
                            challengeTitle: 'Buy something to drink',
                            challengeDesc: 'Go get yourself something to drink and while you are at it, get the bartenderes code',
                            points: 50
                        }
                    ]
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
        const userId = getState().firebase.auth.uid;

        const user = {
            userFirstName: profile.firstName,
            userLastName: profile.lastName,
            organization: profile.organization,
            userId: userId
        }
        
        firestore.collection('events').doc(event).update({
            participants: firestore.FieldValue.arrayUnion(user)
        }).then(() => {
            dispatch({ type: 'ADD_PARTICIPANT', profile })
        }).catch( err => {
            dispatch({ type: 'ADD_PARTICIPANT_ERROR', err })
        })
    }
}

export const removeParticipant = (event) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        const user = {
            userFirstName: profile.firstName,
            userLastName: profile.lastName,
            organization: profile.organization,
            userId: userId
        }

        firestore.collection('events').doc(event).update({
            participants: firestore.FieldValue.arrayRemove(user)
        }).then(() => {
            dispatch({ type: 'REMOVE_PARTICIPANT', profile })
        }).catch(err => {
            dispatch({ type: 'REMOVE_PARTICIPANT_ERROR', err })
        })
    }
}