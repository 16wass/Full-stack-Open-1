const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map(blog => blog.title);
  assert(titles.includes('React patterns'));
});

test('blog posts have id field instead of _id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach(blog => {
    assert(blog.id);
    assert(!blog._id);
  });
});
//  4.10: Blog list tests, step3
describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Async/Await in Node.js',
      author: 'John Doe',
      url: 'http://example.com/async-await',
      likes: 5
    };
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1);
  
    const titles = blogsAtEnd.body.map(blog => blog.title);
    assert(titles.includes('Async/Await in Node.js'));
  })
});
  
// 4.11*: Blog List Tests, step 4
describe('if likes property is missing, it defaults to 0', () => {
  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Jane Doe',
      url: 'http://example.com/no-likes'
    };
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    assert.strictEqual(response.body.likes, 0);
  })
});

// 4.12*: Blog list tests, step5
describe('if title or url is missing, return 400 Bad Request', () => {
  test(' title and url properties are missing', async () => {
    const newBlog = {
      author: 'John Doe',
      likes: 5
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length);
  })
});
// 4.13 Blog list expansions, step1
describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs');
    const blogToDelete = blogsAtStart.body[0];
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);
  
    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1);
  
    const ids = blogsAtEnd.body.map(b => b.id);
    assert(!ids.includes(blogToDelete.id));
  })
});
  
// 4.14 Blog List Expansions, step 2
describe('updating a blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await api.get('/api/blogs');
    const blogToUpdate = blogsAtStart.body[0];
  
    const updatedBlogData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    };
  
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const updatedBlog = response.body;
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);
  })
});
  
after(async () => {
  await mongoose.connection.close();
});
