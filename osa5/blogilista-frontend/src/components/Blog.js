import React, { useState } from 'react'
import Blogservice from '../services/blogs'

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
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div id='blog' style={blogStyle}>
      <div style={hideWhenVisible} className='lessInfo'>
        {blog.title} {blog.author} <button id='view-button' onClick={toggleVisibility}> view</button>
      </div>
      <div style={showWhenVisible} className='moreInfo'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> <br />
        {blog.url} <br />
        <div id='likeElement'>
          likes {blog.likes} <button id='like-button' onClick={() => onLikeClick(blog.id)}>like</button><br />
        </div>
        <button id='delete-button' onClick={removeBlog}> delete</button>
      </div>
    </div>
  )
}

export default Blog
