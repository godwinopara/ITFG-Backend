const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');


const app = express()

// Load environment variables
dotenv.config();


//Middlewares

app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable CORS
app.use(morgan('dev'));  // Log HTTP requests

const PORT = process.env.PORT | 5000
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})