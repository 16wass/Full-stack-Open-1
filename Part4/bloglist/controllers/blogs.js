const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

/*
blogsRouter .get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
  });
  
blogsRouter .post('/', async (request, response) => {
  const { title, url, author, likes } = new Blog(request.body);

if (!title || !url) {
  return response.status(400).json({ error: 'Title and URL are required' });
}
const blog = new Blog({
  title,
  url,
  author,
  likes: likes || 0
});*/
// 4.13 Blog List Expansions, step 1
blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletedBlog = await Blog.findByIdAndRemove(id);

  if (deletedBlog) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});
// 4.14 Blog List Expansions, step 2
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

module.exports = blogsRouter;




  