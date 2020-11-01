import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
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

    const li = component.container.querySelector('li')
    console.log(prettyDOM(li))

    expect(component.container).toHaveTextContent(
        'This is a test'
    )
    expect(component.container).toHaveTextContent(
        'Juho Nykänen'
    )
    expect(component.container).not.toHaveTextContent(
        'www.com'
    )
    expect(component.container).not.toHaveTextContent(
        '0'
    )
})