const express = require('express');
const router = express.Router();
const { getSlides, createSlide, deleteSlide } = require('../controllers/slideController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getSlides)
    .post(protect, upload.single('image'), createSlide);

router.route('/:id')
    .delete(protect, deleteSlide);

module.exports = router;
