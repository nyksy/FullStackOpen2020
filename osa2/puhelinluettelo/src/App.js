import React, { useState } from 'react'
import Name from './components/Name'

//TODO ->2.7 asti
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 1}])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  window.alert('xd')
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
          //value={}
          //onChange={}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(name => 
          <Name key={name.id} name={name} />
        )}
      </div>
    </div>
  )
}

export default App