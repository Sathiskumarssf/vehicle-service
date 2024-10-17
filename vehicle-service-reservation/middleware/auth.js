const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'sathis000';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Split the token from the "Bearer " prefix
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = decoded; // Save the decoded token information (e.g., user ID)
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;