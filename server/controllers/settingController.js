const Setting = require('../models/Setting');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        const settings = await Setting.find();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update multiple settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        const { settings } = req.body; // Array of { key, value }

        const updatePromises = settings.map(item =>
            Setting.findOneAndUpdate(
                { key: item.key },
                { value: item.value, updatedAt: Date.now() },
                { new: true, upsert: true }
            )
        );

        await Promise.all(updatePromises);
        const updatedSettings = await Setting.find();
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get setting by key
// @route   GET /api/settings/:key
// @access  Public
const getSettingByKey = async (req, res) => {
    try {
        const setting = await Setting.findOne({ key: req.params.key });
        if (!setting) return res.status(404).json({ message: 'Setting not found' });
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getSettings,
    updateSettings,
    getSettingByKey,
};
