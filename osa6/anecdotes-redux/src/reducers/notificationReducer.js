const initialState = {}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            if (state.timeOut) {
                clearTimeout(state.timeOut)
            }
            return {
                content: action.data.content,
                timeOut: action.data.timeOut
            }
        case 'DELETE':
            return {}
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    console.log('CONTENT:', content)
    console.log('TIME:', time)
    return async dispatch => {
        const timeOut = setTimeout(() => {
            dispatch({
                type: 'DELETE'
            })
        }, time * 1000);
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                content,
                timeOut //Välitetään timeOutId parametrina reducerille, jotta
            }           //mahdolliset päällekkäiset ilmoitukset voidaan estää
        })
    }
}

export default notificationReducer