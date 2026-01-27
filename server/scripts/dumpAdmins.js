require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

// Connect to DB directly
const dumpAdmins = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected.');

        const admins = await Admin.find({});
        console.log('--- RAW ADMIN DUMP ---');
        console.log(JSON.stringify(admins, null, 2));
        console.log('----------------------');

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

dumpAdmins();
