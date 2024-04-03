const UserModel = require("../models/user.model");
const { verifyToken } = require("../utils/auth.util");

const checkAuth = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;

        if (!authorization) throw { massage: "Not found user", status: 401 };

        const [bearer, token] = authorization?.split(" ");
        
        if (!bearer && bearer.toLowerCase() === "bearer") throw { massage: "Not found user", status: 401 };
        
        const verify = verifyToken(token)
        
        if (!verify) throw { massage: "Not found user", status: 401 };
        
        const user = await UserModel.findOne({ email: verify.email });

        if (!user) throw { massage: "Not found user", status: 401 };

        req.isAuthenticated = !!user;
        req.user = {
            fulName: user.fulName,
            email: user.email,
        }

        next()

    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkAuth
}