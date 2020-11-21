import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initialize } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

//Tehty 6.16
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize(initialize()))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App