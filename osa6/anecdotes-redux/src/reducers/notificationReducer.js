const notificationReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'DELETE':
            return ''
        default:
            return ''
    }
}

export const setNotification = (content, time) => {
    console.log('CONTENT:', content)
    console.log('TIME:', time)
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'DELETE'
            })
        }, time * 1000);
    }
}

export default notificationReducer