import React, { useState } from 'react'

const BLogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:<input
            id='title'
            name='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:<input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:<input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button id="add-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BLogForm