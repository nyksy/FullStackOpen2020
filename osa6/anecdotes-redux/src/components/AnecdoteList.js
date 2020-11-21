import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const addVote = (id) => {
        dispatch(addVoteTo(id))
    }

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => addVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </ul>
    )
}

export default AnecdoteList