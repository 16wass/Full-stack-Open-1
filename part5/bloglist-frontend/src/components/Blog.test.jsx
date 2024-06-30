import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

/** checks that the component displaying a blog renders the blog's title and author,
  but does not render its URL or number of likes by default. */
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
    expect(titleElement).toBeInTheDocument()
    const authorElement = screen.getByText('author')
    expect(authorElement).toBeInTheDocument()

    const urlElement = screen.getByText('url')
    expect(urlElement).not.toBeInTheDocument()
    const likesElement = screen.getByText('4 likes')
    expect(likesElement).not.toBeInTheDocument()
});
/**checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked. */
test ('clicking the button shows the blog\'s url and number of likes', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author : 'author',
        url : 'url',
        likes : 4,
        user: {
            username: 'user',
            name: 'Test ',
          },
    };
    render(<Blog blog={blog} user={{ username: 'user' }} />);
    const button = screen.getByText('view')
    userEvent.click(button)

    const urlElement = screen.getByText('url')
    expect(urlElement).toBeInTheDocument()
    const likesElement = screen.getByText('4 likes')
    expect(likesElement).toBeInTheDocument()
});
 /** ensures that if the like button is clicked twice, the event handler the component received as props is called twice */
 test ('clicking the like button twice calls the event handler twice', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author : 'author',
        url : 'url',
        likes : 4,
        user: {
            username: 'user',
            name: 'Test ',
          },
    };
    const mockHandler = jest.fn()
    render(<Blog blog={blog} user={{ username: 'user' }} handleLike={mockHandler} />);
    
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)
    // like button is clicked twice
    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandleLike.mock.calls).toHaveLength(2);
});
    

