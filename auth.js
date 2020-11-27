const jwt = require("jsonwebtoken");

const authMW = (req, res, next) => {
    try {
        const verified = jwt.verify(req.headers.authorization.split(" ")[1], "smple key");
        req.userData = verified;
        next();
    } catch (error) {
        res.status(404).json({
            message: "Authorzation failed.",
        });
    }

};

module.exports = authMW;