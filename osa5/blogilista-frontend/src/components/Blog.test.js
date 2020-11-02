import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'This is a test',
        author: 'Juho Nykänen',
        url: 'www.com',
        likes: 0,
    }

    const component = render(
        <Blog blog={blog} />
    )

    const div = component.container.querySelector('.lessInfo')

    expect(div).toHaveTextContent(
        'This is a test'
    )
    expect(div).toHaveTextContent(
        'Juho Nykänen'
    )

    expect(div).not.toHaveTextContent(
        'www.com'
    )

    expect(div).not.toHaveTextContent(
        '0'
    )
})

test('renders more content when not hidden', () => {
    const blog = {
        title: 'This is a test',
        author: 'Juho Nykänen',
        url: 'www.com',
        likes: 0,
    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.moreInfo')

    expect(div).toHaveTextContent(
        'This is a test'
    )
    expect(div).toHaveTextContent(
        'Juho Nykänen'
    )
    expect(div).toHaveTextContent(
        'www.com'
    )
    expect(div).toHaveTextContent(
        '0'
    )
})

test('like-button is pressed twice', () => {
    const blog = {
        title: 'This is a test',
        author: 'Juho Nykänen',
        url: 'www.com',
        likes: 0,
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} onLikeClick={mockHandler}/>
    )

    const likeButton = component.getByText('like')
    
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})