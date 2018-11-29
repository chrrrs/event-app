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
        case 'COMPLETED_CHALLENGE':
            console.log('completed challenge', action.event)
            return state;
        case 'COMPLETED_CHALLENGE_ERROR':
            console.log('completed challenge error', action.err)
            return state;
        case 'ADD_POINTS':
            console.log('added points', action.event)
            return state;
        case 'ADD_POINTS_ERROR':
            console.log('added points error', action.err)
            return state;
        case 'REMOVE_POINTS':
            console.log('removed points', action.event)
            return state;
        case 'REMOVE_POINTS_ERROR':
            console.log('removed points error', action.err)
            return state;
        default:
            return state;
    }
}

export default eventReducer