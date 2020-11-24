import React, { useState } from 'react'
import Blogservice from '../services/blogs'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, user, updateBlogs, onLikeClick }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeBlog = async event => {
    event.preventDefault()

    if (window.confirm(`remove blog ${blog.title} ${blog.author}?`)) {
      Blogservice.remove(blog.id, user.token)
      updateBlogs(Math.random())
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div id='blog' style={blogStyle}>
      <div style={hideWhenVisible} className='lessInfo'>
        {blog.title} {blog.author} <Button id='view-button' style={{float: "right"}} variant="primary" onClick={toggleVisibility}> view</Button>
      </div>
      <div style={showWhenVisible} className='moreInfo'>
        {blog.title} {blog.author} <Button variant="primary" style={{float: "right"}} onClick={toggleVisibility}>hide</Button> <br />
        {blog.url} <br />
        <div id='likeElement'>
          likes {blog.likes} <Button  variant="primary" id='like-button' onClick={() => onLikeClick(blog.id)}>like</Button><br />
        </div>
        <Button id='delete-button' variant="secondary" onClick={removeBlog}> delete</Button>
      </div>
    </div>
  )
}

export default Blog
