import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test ('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author : 'author',
        url : 'url',
        likes : 4
    };
    render(<Blog blog={blog} />);
    /**const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined() */
    const titleElement = screen.getByText('Component testing is done with react-testing-library ')
    expect(titleElement).toBeDefined()
    const authorElement = screen.getByText('author')
    expect(authorElement).toBeDefined()
    const urlElement = screen.getByText('url')
    expect(urlElement).toBeDefined()
    const likesElement = screen.getByText('likes')
    expect(likesElement).toBeDefined()
});

