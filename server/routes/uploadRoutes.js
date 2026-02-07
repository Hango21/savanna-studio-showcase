const express = require('express');
const router = express.Router();
const { getUploadSignature } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

router.get('/sign', protect, getUploadSignature);

module.exports = router;
