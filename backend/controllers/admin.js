// controllers/admin.js
const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let db;

const setDb = (database) => {
    db = database;
};

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 10;

const registerAdmin = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: '⚠️ Email and password are required!' });
    }

    const collection = db.collection('admins');

    try {
        // Check if admin already exists
        const existingAdmin = await collection.findOne({ email });
        if (existingAdmin) {
            return res.status(409).send({ message: '⚠️ Admin already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const admin = {
            email,
            password: hashedPassword,
            name: name || null,
            createdAt: new Date(),
            lastLogin: null,
            isActive: true
        };

        const result = await collection.insertOne(admin);
        console.log(`✅ Successfully registered admin: ${email}`);
        
        res.status(201).send({ 
            message: '✅ Admin registered successfully!',
            adminId: result.insertedId
        });
    } catch (err) {
        console.error('❌ REGISTER ADMIN ERROR:', err);
        res.status(500).send({ message: '❌ Error occurred while registering admin!', error: err.message });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: '⚠️ Email and password are required!' });
    }

    const collection = db.collection('admins');

    try {
        // Find admin by email
        const admin = await collection.findOne({ email });
        if (!admin) {
            return res.status(401).send({ message: '⚠️ Invalid credentials!' });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(403).send({ message: '⚠️ Admin account is deactivated!' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: '⚠️ Invalid credentials!' });
        }

        // Update last login
        await collection.updateOne(
            { _id: admin._id },
            { $set: { lastLogin: new Date() } }
        );

        // Generate JWT token
        const token = jwt.sign(
            { 
                adminId: admin._id,
                email: admin.email,
                name: admin.name
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log(`✅ Admin logged in: ${email}`);
        res.status(200).send({ 
            message: '✅ Login successful!',
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name
            }
        });
    } catch (err) {
        console.error('❌ LOGIN ADMIN ERROR:', err);
        res.status(500).send({ message: '❌ Error occurred while logging in!', error: err.message });
    }
};

const updateAdmin = async (req, res) => {
    const { email, password, name } = req.body;
    const adminId = req.params.id;

    if (!email || !password) {
        return res.status(400).send({ message: '⚠️ Email and password are required!' });
    }

    const collection = db.collection('admins');

    try {
        // Find admin by id
        const admin = await collection.findOne({ _id: new ObjectId(adminId) });
        if (!admin) {
            return res.status(404).send({ message: '⚠️ Admin not found!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Update admin
        await collection.updateOne(
            { _id: new ObjectId(adminId) },
            { $set: { email, password: hashedPassword, name } }
        );

        console.log(`✅ Admin updated: ${email}`);
        res.status(200).send({ message: '✅ Admin updated successfully!' });
    } catch (err) {
        console.error('❌ UPDATE ADMIN ERROR:', err);
        res.status(500).send({ message: '❌ Error occurred while updating admin!', error: err.message });
    }
};

const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;

    const collection = db.collection('admins');

    try {
        // Find admin by id
        const admin = await collection.findOne({ _id: new ObjectId(adminId) });
        if (!admin) {
            return res.status(404).send({ message: '⚠️ Admin not found!' });
        }

        // Delete admin
        await collection.deleteOne({ _id: new ObjectId(adminId) });

        console.log(`✅ Admin deleted: ${admin.email}`);
        res.status(200).send({ message: '✅ Admin deleted successfully!' });
    } catch (err) {
        console.error('❌ DELETE ADMIN ERROR:', err);
        res.status(500).send({ message: '❌ Error occurred while deleting admin!', error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const adminEmail = req.admin.email; // From JWT token

    if (!currentPassword || !newPassword) {
        return res.status(400).send({ message: '⚠️ Current password and new password are required!' });
    }

    if (newPassword.length < 6) {
        return res.status(400).send({ message: '⚠️ New password must be at least 6 characters!' });
    }

    const collection = db.collection('admins');

    try {
        // Get admin from database
        const admin = await collection.findOne({ email: adminEmail });
        
        if (!admin) {
            return res.status(404).send({ message: '⚠️ Admin not found!' });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: '⚠️ Current password is incorrect!' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        // Update password
        await collection.updateOne(
            { email: adminEmail },
            { 
                $set: { 
                    password: hashedPassword,
                    updatedAt: new Date()
                } 
            }
        );

        console.log(`✅ Password changed for admin: ${adminEmail}`);
        res.status(200).send({ message: '✅ Password changed successfully!' });
    } catch (err) {
        console.error('❌ CHANGE PASSWORD ERROR:', err);
        res.status(500).send({ message: '❌ Error occurred while changing password!', error: err.message });
    }
};

module.exports = { registerAdmin, loginAdmin, updateAdmin, deleteAdmin, changePassword, setDb };