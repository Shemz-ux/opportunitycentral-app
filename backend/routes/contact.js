const express = require('express');
const { submitContactForm } = require('../controllers/contact');

const contactRouter = express.Router();

contactRouter.post('/submit', submitContactForm);

module.exports = contactRouter;