 const jwt = require("jsonwebtoken");

const VerifyToken =(req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message: "No Token Provided",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({
            message: "Expired or Invalid Token", 
            success: false,
        });
    }
};

module.exports = VerifyToken;