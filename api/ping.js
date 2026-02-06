// Simple ping endpoint that doesn't connect to database
module.exports = (req, res) => {
    return res.status(200).json({
        message: 'pong',
        timestamp: new Date().toISOString()
    });
};
