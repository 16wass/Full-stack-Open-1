import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: newBlog,
          author : 'author',
          url: 'url',
          likes: 0
        }
        createBlog(blogObject)
        setNewBlog('')
        
      }
      return (
        <div>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <input
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
            />
             <button type="submit">save</button>
          </form>
        </div>
        )
}
export default BlogForm