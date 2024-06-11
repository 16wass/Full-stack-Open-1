const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');



app.use(cors());
app.use(express.json());


app.get('/api/blogs', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

app.post('/api/blogs', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(500).send({ error: 'Something went wrong!' });
});

const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});


