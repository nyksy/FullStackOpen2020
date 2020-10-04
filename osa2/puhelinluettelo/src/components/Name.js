import React from 'react'

const Name = ({ name, toggleDeletion }) => {
  return (
    <p>{name.name} {name.number} <button onClick={toggleDeletion}>delete</button></p>
  )
}

export default Name