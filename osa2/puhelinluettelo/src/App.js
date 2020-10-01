import React, { useState } from 'react'
import Name from './components/Name'

//TODO tehty 2.9 asti
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <div>
        {persons.map((name, number) =>
          <Name key={name.name} name={name} number={number} />
        )}
      </div>
    </div>
  )
}

export default App