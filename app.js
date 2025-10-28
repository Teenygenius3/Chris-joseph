const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');
const errorHandler = require('./middleware/errorHandler');
const dbConfig = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
dbConfig();

// Routes
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;