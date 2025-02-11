const User = require('./models/User');

const getProfile = async (req, res) => {
    res.send(req.user);
};

const updateStorageQuota = async (req, res) => {
    try {
        const { maxSpace } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        user.storage.maxSpace = maxSpace;
        await user.save();
        
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getStorageInfo = async (req, res) => {
    const storage = {
        used: req.user.storage.usedSpace,
        max: req.user.storage.maxSpace,
        available: req.user.storage.maxSpace - req.user.storage.usedSpace
    };
    res.send(storage);
};

module.exports = { getProfile, updateStorageQuota, getStorageInfo };