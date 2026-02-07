const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const slideRoutes = require('./routes/slideRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const photoRoutes = require('./routes/photoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;
