const express = require('express');
const { 
createBlog,
getBlogs,
getBlogBySlug, 
deleteBlog, 
updateBlog, 
incrementView,
getCategories 
} = require('../controllers/blogs')
const { authenticateToken } = require('../middleware/authenticate')

const blogRouter = express.Router();

blogRouter
.route("/")
.post(authenticateToken, createBlog)
.get(getBlogs)

blogRouter
.route("/:id")
.delete(authenticateToken, deleteBlog)
.patch(authenticateToken, updateBlog)

blogRouter
.route("/slug/:slug")
.get(getBlogBySlug)

blogRouter
.route("/id/:id/views")
.patch(incrementView)

blogRouter
.route("/categories")
.get(getCategories)

module.exports = blogRouter;