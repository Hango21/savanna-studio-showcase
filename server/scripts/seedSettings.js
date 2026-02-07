const mongoose = require('mongoose');
const Setting = require('../models/Setting');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const defaultSettings = [
    {
        key: 'home_intro_image',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/wedding-couple.jpg',
        label: 'Home Intro Section Image',
        type: 'image'
    },
    {
        key: 'home_mission_bg',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/wedding-couple.jpg',
        label: 'Home Mission Background',
        type: 'image'
    },
    {
        key: 'home_testimonial_avatar',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/about-photographer.jpg',
        label: 'Home Testimonial Avatar',
        type: 'image'
    },
    {
        key: 'home_about_image',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/about-photographer.jpg',
        label: 'Home About Section Image',
        type: 'image'
    },
    {
        key: 'services_hero_bg',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/hero-wedding.jpg',
        label: 'Services Hero Background',
        type: 'image'
    }
];

const seedSettings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding settings...');

        for (const setting of defaultSettings) {
            await Setting.findOneAndUpdate(
                { key: setting.key },
                setting,
                { upsert: true, new: true }
            );
        }

        console.log('Settings seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding settings:', error);
        process.exit(1);
    }
};

seedSettings();
