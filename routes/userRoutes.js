const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const { getProfile, updateStorageQuota, getStorageInfo } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.patch('/users/:id/storage', auth, adminAuth, updateStorageQuota);
router.get('/storage', auth, getStorageInfo);

module.exports = router;