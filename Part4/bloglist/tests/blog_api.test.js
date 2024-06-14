const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({ username: 'root', name: 'Superuser', passwordHash: 'hashedpassword' });
  await user.save();

  const blog = new Blog({ title: 'Blog title', author: 'Author', url: 'http://url.com', user: user._id });
  await blog.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'http://newurl.com',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(2);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).toContain('New Blog');
});

test('blog has user information', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  expect(blogs[0].user.username).toBe('root');
});

afterAll(() => {
  mongoose.connection.close();
});
