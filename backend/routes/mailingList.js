const express = require('express');
const { 
    createMailingListEntry, 
    deleteMailingListEntry, 
    getMailingList 
} = require('../controllers/mailingList');
const { authenticateToken } = require('../middleware/authenticate');

const mailingListRouter = express.Router();

mailingListRouter
    .route("/")
    .post(createMailingListEntry)
    .get(authenticateToken, getMailingList);

mailingListRouter
    .route("/:id")
    .delete(authenticateToken, deleteMailingListEntry);

module.exports = mailingListRouter;