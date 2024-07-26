const express = require('express');
const cors = require('cors');
require('dotenv').config()

const connectDB = require('./config/connectDB');
const router = require('./routes');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || '*';

app.use(cors({
    origin:  allowedOrigin,
    credentials: true
}));

app.use(express.json())

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.json({
        message: `Server listening on the Port ${PORT}`
    });
});

//api endpoint

app.use('/api', router);


connectDB().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server listening on the Port ${PORT}`);
    });
});
