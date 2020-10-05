import React, { useState, useEffect } from 'react'
import NameRenderer from './components/NameRenderer'
import Filter from './components/Filter'
import axios from 'axios'
import nameService from './services/names'
import Notification from './components/Notification'



//2.19 tehty
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => { // Datan hakeminen
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addName = (event) => { // Nimen ja puhelinnumeron lisääminen palvelimelle
    event.preventDefault()
    console.table(persons)
    const nameObject = {
      id: newName,
      name: newName,
      number: newNumber,
    }

    var contains = false //testataan löytyykö nimeä jo tiedoista
    for (let i = 0; i < persons.length; i++)
      if (persons[i].name === newName) {
        contains = true
        window.alert(`${newName} is already in the phonebook`)
      }
    if (contains === false) {
      nameService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
        })
        setErrorMessage(
          `${newName} added to the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    setNewName('')
    setNewNumber('')
    contains = false
  }

  const toggleDeletionOf = (id) => { // Poistofunktion kutsu
    const name = persons.find(n => n.name === id)

    if (window.confirm(`Delete ${name.name}?`))
      nameService
        .remove(id)
        .then(setPersons(persons.filter(n => n.name !== id)))
        .catch(error => {
          alert(
            `the name '${name.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.name !== id))
        })
  }

  //eventhandlerit nimelle, numerolle ja filtterille
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
      <Notification message={errorMessage} />
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
      <NameRenderer persons={persons} filter={newFilter}
        toggleDeletionOf={toggleDeletionOf} />
    </div>
  )
}

export default App