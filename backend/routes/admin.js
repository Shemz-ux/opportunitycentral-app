const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/admin');
const { authenticateToken } = require('../middleware/authenticate');

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);

// Protected route - register new admin (only existing admins can create new ones)
adminRouter.post('/register', registerAdmin);

module.exports = adminRouter;