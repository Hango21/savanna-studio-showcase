const express = require('express');
const router = express.Router();
const { getPhotos, createPhoto, deletePhoto } = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getPhotos)
    .post(protect, upload.single('image'), createPhoto);

router.route('/:id')
    .delete(protect, deletePhoto);

module.exports = router;
