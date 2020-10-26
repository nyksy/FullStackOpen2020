import React, {useState} from 'react' 

const NoteForm = ({ createBlog }) => {
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
          name="title"
          value={newTitle}
          onChange={handleTitleChange}
        />
        </div>
        <div>
        author:<input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        </div>
        <div>
        url:<input
          value={newUrl}
          onChange={handleUrlChange}
        />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NoteForm