const express = require('express');
const blogsRouter  = express.Router();
const Blog = require('../models/blog');


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
});

const savedBlog = await blog.save();
response.statuts(201).json(savedBlog);
});
  
module.exports = blogsRouter;
  