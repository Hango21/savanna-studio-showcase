require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

connectDB();

const importData = async () => {
    try {
        await Admin.deleteMany();

        const hashedPassword = await bcrypt.hash('hm252531', 10);

        const adminUser = {
            username: 'melikaebrahim0@gmail.com',
            password: hashedPassword,
        };

        await Admin.create(adminUser);

        console.log('Admin Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
