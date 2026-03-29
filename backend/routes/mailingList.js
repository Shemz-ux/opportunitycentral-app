const express = require('express');
const { 
    createMailingListEntry, 
    deleteMailingListEntry, 
    getMailingList 
} = require('../controllers/mailingList');

const mailingListRouter = express.Router();

mailingListRouter
    .route("/")
    .post(createMailingListEntry)
    .get(getMailingList);

mailingListRouter
    .route("/:id")
    .delete(deleteMailingListEntry);

module.exports = mailingListRouter;