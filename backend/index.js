const express = require('express');
const connection = require('./connection');

const app = express();
app.use(express.json());

connection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});