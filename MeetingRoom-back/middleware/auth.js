const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token, "test authorize");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findOne({ _id: decoded.id});

        if (!user) {
            throw new Error();
        }
        if (user.role !== 'Admin') {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Access Denied' });
    }
};

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
        const user = await User.findOne({ _id: decoded.id});

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = { authorize, auth };