import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

//5.22 kaikki testit oikein
//osa7 
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, updateBlogs] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [])

  const handleLogin = async (event) => { //Kirjautuminen
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeABlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const returnedBlog = await blogService.update(id, updatedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
  }


  const addBlog = (blogObject) => { //Blogin lisääminen
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleLogout = async (event) => { //Uloskirjautuminen
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const hStyle = {
    color: "white",
    padding: "20px 0px 20px 0px",
    fontFamily: "Arial",
  }

  const loginForm = () => (
    <div className='container'>
      <Navbar bg="dark">
        <h2 style={hStyle}>Blog app</h2>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={hStyle}>by Juho Nykänen</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return loginForm()
  }

  const style = {
    padding: 5,
    margin: 5,
  }
  return (
    <div id='main' className='container'>
      <Navbar bg="primary">
        <h2 style={hStyle}>Blog app</h2>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={hStyle}>
            {user.name} logged in
      <Button variant="warning" style={style} onClick={handleLogout}>logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Notification message={errorMessage} />

      {blogForm()}

      <Table bordered>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id}>
                <td>
                  <Blog key={blog.id} blog={blog} user={user} updateBlogs={updateBlogs} onLikeClick={likeABlog} />
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default App