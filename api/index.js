const connectDB = require('../server/config/db');
const app = require('../server/app');

// Initialize database connection once
let dbConnected = false;

// Serverless function handler
module.exports = async (req, res) => {
    // Connect to database on cold start
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
            console.log('Database connected in serverless function');
        } catch (error) {
            console.error('Database connection error:', error);
            return res.status(500).json({
                message: 'Database connection failed',
                error: error.message
            });
        }
    }

    // Let Express handle the request
    return app(req, res);
};
