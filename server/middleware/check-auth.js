const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    //need to see here how to take token from the cookie
    try {
        if (req.cookies['token']) {
            const decoded = jwt.verify(req.cookies['token'], config.secretKey);
            req.userData = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Authentication failed'
            });            
        }
    } catch (e) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }        
}