const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).send({ message: '⚠️ Access token required!' });
    }

    jwt.verify(token, JWT_SECRET, (err, admin) => {
        if (err) {
            console.warn('⚠️ Invalid or expired token');
            return res.status(403).send({ message: '⚠️ Invalid or expired token!' });
        }

        req.admin = admin; 
        next();
    });
};

module.exports = { authenticateToken };