const notificationReducer = (state = [], action) => {
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

export const setNotification = (content, duration) => {
    console.log('CONTENT:', content)
    return {
        type: 'SET_NOTIFICATION',
        data: content
    }

}

export default notificationReducer