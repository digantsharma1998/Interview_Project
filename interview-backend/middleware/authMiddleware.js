const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract the token
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user information to the request
            req.user = decoded;

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
