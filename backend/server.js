const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userroute');
const transactionRoutes = require('./routes/transactionroute');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());


app.use('/api', authRoutes);
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running in mode on port ${PORT}`.yellow.bold);
});
