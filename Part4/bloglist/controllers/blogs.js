const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');


router.get('/', async (request, response, next) => {
    try {
      const blogs = await Blog.find({});
      response.json(blogs);
    } catch (error) {
      next(error);
    }
  });
  
  router.post('/', async (request, response, next) => {
    try {
      const blog = new Blog(request.body);
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;
  