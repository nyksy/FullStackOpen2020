import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    
    const addVote = async (anecdote) => {
        await dispatch(addVoteTo(anecdote))
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => addVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList