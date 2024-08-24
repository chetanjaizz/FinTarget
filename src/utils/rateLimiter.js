const rateLimit = require('express-rate-limit');

const userIdExtractor = (req) => req.body.user_id;

const perSecondLimiter = rateLimit({
    windowMs: 1000,
    max: 1,
    keyGenerator: userIdExtractor,
    handler: (req, res) => {
        res.status(429).json({ error: 'Rate limit exceeded: 1 task per second' });
    }
});

const perMinuteLimiter = rateLimit({
    windowMs: 60000,
    max: 20,
    keyGenerator: userIdExtractor,
    handler: (req, res) => {
        res.status(429).json({ error: 'Rate limit exceeded: 20 tasks per minute' });
    }
});

module.exports = { perSecondLimiter, perMinuteLimiter };
