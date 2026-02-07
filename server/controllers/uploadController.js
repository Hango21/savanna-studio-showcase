const cloudinary = require('../config/cloudinary');

// @desc    Get upload signature
// @route   GET /api/upload/sign
// @access  Private/Admin
const getUploadSignature = (req, res) => {
    try {
        const timestamp = Math.round((new Date()).getTime() / 1000);

        // Define upload parameters
        const params = {
            timestamp: timestamp,
            folder: 'savanna/uploads', // Organize uploads in a folder
        };

        const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

        res.json({
            signature,
            timestamp,
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY
        });
    } catch (error) {
        console.error('Signature generation error:', error);
        res.status(500).json({ message: 'Could not generate upload signature' });
    }
};

module.exports = {
    getUploadSignature
};
