require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
// const connectDB = require('../config/db'); // We will connect manually with options

const verify = async () => {
    try {
        console.log('Attempting to connect to DB to verify...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected!');

        const admin = await Admin.findOne({});
        if (!admin) {
            console.log('No admin found!');
            process.exit();
        }

        console.log(`Stored Username: '${admin.username}'`);

        const password = 'hm252531';
        const isMatch = await bcrypt.compare(password, admin.password);

        console.log(`Testing password '${password}' against hash...`);
        console.log(`Match Result: ${isMatch}`);

        process.exit();
    } catch (error) {
        console.error('Connection Error:', error.message);
        process.exit(1);
    }
};

verify();
