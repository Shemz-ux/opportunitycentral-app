const express = require('express');
const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controllers/admin');
const { authenticateToken } = require('../middleware/authenticate');

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);

// Protected route - register new admin (only existing admins can create new ones)
adminRouter.post('/register', registerAdmin);

adminRouter.patch('/update/:id', authenticateToken, updateAdmin);

adminRouter.delete('/delete/:id', authenticateToken, deleteAdmin);

module.exports = adminRouter;