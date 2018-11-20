const initState = {
    projects: [
        {id: '1', title: 'test 1', content: 'text for test 1'},
        {id: '2', title: 'test 2', content: 'text for test 2'},
        {id: '3', title: 'test 3', content: 'text for test 3'}
    ]
}

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            console.log('created event', action.event)
            return state;
        case 'CREATE_EVENT_ERROR':
            console.log('create project error', action.err)
            return state;
        case 'DELETE_EVENT':
            console.log('deleted event', action.event)
            return state;
        case 'DELETE_EVENT_ERROR':
            console.log('delete event error', action.err)
            return state;
        case 'ADD_PARTICIPANT':
            console.log('added participant', action.event)
            return state;
        case 'ADD_PARTICIPANT_ERROR':
            console.log('added participant error', action.err)
            return state;
        case 'REMOVE_PARTICIPANT':
            console.log('removed participant', action.event)
            return state;
        case 'REMOVE_PARTICIPANT_ERROR':
            console.log('removed participant error', action.err)
            return state;
        default:
            return state;
    }
}

export default eventReducer