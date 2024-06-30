import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test ('the form calls the event handler it received as props with the right details when a new blog is created', () => {
    // to mock creating a new blog
    const mockHandler = jest.fn();
    const component = render(<BlogForm createBlog={mockHandler} />);

    const input = component.container.querySelector('input');
    fireEvent.change(input, {
        target: { value: 'New blog' }
    });

    const form = component.container.querySelector('form');
    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe({
        title: 'newBlog',
        author : 'author',
        url : 'url',
        likes : 0
    });
});



    
