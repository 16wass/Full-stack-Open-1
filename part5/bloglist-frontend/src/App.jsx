import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const blogsToShow = showAll

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs =>
      setBlogs( blogs )
    )  
  }, [])



  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
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
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog('')
    })
  }
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }



  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
           <BlogForm createBlog={addBlog} />  
        </Togglable>
           
      </div>
      } 
      <div>
        <button onClick={() => setShowAll(!blogsToShow)}>
          show {blogsToShow}
        </button>
      </div> 
      <ul>
         {blogsToShow.map(blog =>
         <Blog key={blog.id} blog={blog} />
      )}
      </ul>
      <Footer />
    </div>
  )
}

export default App