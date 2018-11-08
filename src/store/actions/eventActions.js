export const createEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        dispatch({ type: 'CREATE_EVENT', event });
    }
}