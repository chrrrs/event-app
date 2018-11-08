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
            console.log('created event ', action.event)
    }
    return state
}

export default eventReducer