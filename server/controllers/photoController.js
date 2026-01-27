const Photo = require('../models/Photo');
const cloudinary = require('../config/cloudinary');

// @desc    Get all photos
// @route   GET /api/photos
// @access  Public
const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find().populate('category');
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a photo
// @route   POST /api/photos
// @access  Private/Admin
const createPhoto = async (req, res) => {
    try {
        const { category, featured } = req.body;
        let imageUrl = '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'savanna/portfolio',
            });
            imageUrl = result.secure_url;
        } else {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const photo = await Photo.create({
            category,
            imageUrl,
            featured: featured === 'true', // Multer fields are strings
        });

        res.status(201).json(photo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a photo
// @route   DELETE /api/photos/:id
// @access  Private/Admin
const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        // Extract public ID from URL to delete from Cloudinary
        if (photo.imageUrl) {
            const parts = photo.imageUrl.split('/');
            const filename = parts.pop().split('.')[0];
            const publicId = `savanna/portfolio/${filename}`;

            await cloudinary.uploader.destroy(publicId);
        }

        await photo.deleteOne();

        res.json({ message: 'Photo removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getPhotos,
    createPhoto,
    deletePhoto,
};
