const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getSettingByKey } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSettings)
    .put(protect, updateSettings);

router.route('/:key')
    .get(getSettingByKey);

module.exports = router;
