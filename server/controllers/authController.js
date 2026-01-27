const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    // Frontend sends 'email', backend expects 'username'. Support both.
    const loginId = username || email;

    try {
        // Check for admin
        const admin = await Admin.findOne({ username: loginId });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin.id,
                username: admin.username,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    loginAdmin,
};
