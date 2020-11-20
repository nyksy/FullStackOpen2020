import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from './reducers/anecdoteReducer'
import { createAnecdote } from './reducers/anecdoteReducer'

//TODO 6.7
const App = () => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()


  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const addVote = (id) => {
    dispatch(addVoteTo(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App