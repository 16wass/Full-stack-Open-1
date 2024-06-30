import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const handleLike= async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, updatedBlog);
    updatedBlog(blog.id, updatedBlog);
  }
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  }



  return (
    <div style={blogStyle} className='blog '>
      <div className='blog-tilte-author'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick ={handleLike}> like </button></p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
