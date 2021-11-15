const jwt = require('jsonwebtoken');
const config = require('../config');

verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, config.TOKEN_JWT);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

module.exports = { verifyToken };
