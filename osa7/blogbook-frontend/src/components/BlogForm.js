import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
  const style = {
    margin: "5px 0px 0px 5px"
  }
  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id='title'
            name='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
          <Button variant="primary" style={style} id="add-button" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BLogForm