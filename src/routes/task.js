const express = require('express');
const { perSecondLimiter, perMinuteLimiter } = require('../utils/rateLimiter');
const { enqueueTask } = require('../utils/queue');
const task = require('../task');

const router = express.Router();

router.post('/task', perSecondLimiter, perMinuteLimiter, (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    enqueueTask(user_id, () => task(user_id));

    res.status(202).json({ message: 'Task queued' });
});

module.exports = router;
