import React, { useState, useEffect } from 'react'
import NameRenderer from './components/NameRenderer'
import Filter from './components/Filter'
import axios from 'axios'


//todo 2.15 ->
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    event.preventDefault()

    console.table(persons)

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    var contains = false
    for (let i = 0; i < persons.length; i++)
      if (persons[i].name === newName) {
        contains = true
        window.alert(`${newName} is already in the phonebook`)
      }
    if (contains === false)
      setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    contains = false
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NameRenderer persons={persons} filter={newFilter} />
    </div>
  )
}

export default App