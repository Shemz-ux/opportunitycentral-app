const express = require('express');
const { createBlog, getBlogs, getBlogBySlug, deleteBlog, updateBlog, incrementView } = require('../controllers/blogs')

const blogRouter = express.Router();

blogRouter
.route("/")
.post(createBlog)
.get(getBlogs)

blogRouter
.route("/:id")
.delete(deleteBlog)
.patch(updateBlog)

blogRouter
.route("/:slug")
.get(getBlogBySlug)

blogRouter
.route("/:id/views")
.patch(incrementView)

module.exports = blogRouter;