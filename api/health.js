const connectDB = require('../server/config/db');

// Health check endpoint
module.exports = async (req, res) => {
    try {
        // Test database connection
        await connectDB();

        return res.status(200).json({
            status: 'OK',
            message: 'API and Database are working',
            timestamp: new Date().toISOString(),
            envCheck: {
                hasMongoUri: !!process.env.MONGO_URI,
                hasJwtSecret: !!process.env.JWT_SECRET,
                nodeEnv: process.env.NODE_ENV
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Database connection failed',
            error: error.message,
            timestamp: new Date().toISOString(),
            envCheck: {
                hasMongoUri: !!process.env.MONGO_URI,
                hasJwtSecret: !!process.env.JWT_SECRET,
                nodeEnv: process.env.NODE_ENV
            }
        });
    }
};
