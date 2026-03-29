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

module.exports = { registerAdmin, loginAdmin, setDb };