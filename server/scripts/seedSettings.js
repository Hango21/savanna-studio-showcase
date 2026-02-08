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
    },
    {
        key: 'home_service_weddings',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/wedding-couple.jpg',
        label: 'Home Service: Weddings',
        type: 'image'
    },
    {
        key: 'home_service_maternity',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/maternity-portrait.jpg',
        label: 'Home Service: Maternity',
        type: 'image'
    },
    {
        key: 'home_service_family',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/family-portrait.jpg',
        label: 'Home Service: Family',
        type: 'image'
    },
    {
        key: 'home_hero_top',
        value: 'https://res.cloudinary.com/demo/image/upload/v1570979139/savanna/portfolio/wedding-couple.jpg',
        label: 'Home Hero Image (Top)',
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
