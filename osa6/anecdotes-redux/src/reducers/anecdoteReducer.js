import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(a => a.id === id ? action.data : a)
      
    case 'INIT':
      return action.data

    case 'NEW_ANECDOTE':
      console.log(action.data.id)
      return [...state, action.data]
      
    default:
      return state
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }

}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVoteTo = (anecdote) => {
  return async dispatch => {
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const updatedAnecdote = await anecdoteService.update(anecdote.id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export default anecdoteReducer