const express = require('express');
const connection = require('./connection');
const blogRouter = require('./routes/blogs');

const app = express();
app.use(express.json());

connection().then(db => {
    require('./controllers/blogs').setDb(db);

    app.get('/', (req, res) => {
        res.send('You are connected to the OC-web server!')
    });

    app.use('/api/blogs', blogRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
});
