const Slide = require('../models/Slide');
const cloudinary = require('../config/cloudinary');

// @desc    Get all slides
// @route   GET /api/slides
// @access  Public
const getSlides = async (req, res) => {
    try {
        const slides = await Slide.find().sort({ order: 1 });
        res.json(slides);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a slide
// @route   POST /api/slides
// @access  Private/Admin
const createSlide = async (req, res) => {
    try {
        const { title, order, active } = req.body;
        let imageUrl = '';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'savanna/slides',
            });
            imageUrl = result.secure_url;
        } else if (req.body.imageUrl) {
            imageUrl = req.body.imageUrl;
        } else {
            return res.status(400).json({ message: 'Please upload an image or provide an image URL' });
        }

        const slide = await Slide.create({
            title,
            imageUrl,
            order,
            active,
        });

        res.status(201).json(slide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a slide
// @route   DELETE /api/slides/:id
// @access  Private/Admin
const deleteSlide = async (req, res) => {
    try {
        const slide = await Slide.findById(req.params.id);

        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }

        // Extract public ID from URL to delete from Cloudinary
        if (slide.imageUrl) {
            // Example URL: https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/slides/sample.jpg
            const parts = slide.imageUrl.split('/');
            const filename = parts.pop().split('.')[0];
            const publicId = `savanna/slides/${filename}`;

            await cloudinary.uploader.destroy(publicId);
        }

        await slide.deleteOne();

        res.json({ message: 'Slide removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getSlides,
    createSlide,
    deleteSlide,
};
