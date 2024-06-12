const {tets,describe} = require('node:test')
const asseert = require('node:asseert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
