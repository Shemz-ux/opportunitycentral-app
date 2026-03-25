const express = require('express');
const { createBlog, getBlogs } = require('../controllers/blogs')

const blogRouter = express.Router();

blogRouter
.route("/")
.post(createBlog)
.get(getBlogs)

module.exports = blogRouter;