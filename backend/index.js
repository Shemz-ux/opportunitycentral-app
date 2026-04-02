require('dotenv').config();
const express = require('express');
const connection = require('./connection');
const cors = require('cors')
const blogRouter = require('./routes/blogs');
const mailingListRouter = require('./routes/mailingList');

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:3000',  
    'http://localhost:5000',
]

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());

connection().then(db => {
    require('./controllers/blogs').setDb(db);
    require('./controllers/mailingList').setDb(db);
    require('./controllers/admin').setDb(db);

    app.get('/', (req, res) => {
        res.send('You are connected to the OC-web server!')
    });

    app.use('/api/blogs', blogRouter);
    app.use('/api/mailingList', mailingListRouter);
    app.use('/api/admin', require('./routes/admin'));
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});
