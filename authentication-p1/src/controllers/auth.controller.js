const UserModel = require("../models/user.model");
const { hashPassword, verifyPassword, signToken } = require("../utils/auth.util");

const authRegister = async (req, res, next) => {
    try {
        const { fulName, email, password } = req.body;
        const existing = await UserModel.findOne({ email });

        if (existing) throw { massage: "User has already existed", status: 444 };

        const hashedPassword = hashPassword(password);

        const user = await UserModel.create({
            fulName,
            email,
            password: hashedPassword,
        });
        res.send({
            massage: "Register successfully",
            status: 201,
            user
        })

    } catch (err) {
        next(err)
    }
}

const authLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existing = await UserModel.findOne({email});

        if ( !existing ) throw { massage: "User has not registered yet" ,status: 444 };

        const verify = await verifyPassword(password ,existing.password);

        if ( !verify ) throw { massage: "email or password is incorrect" ,status: 444 };
        
        const payload = { id: existing._id ,email: existing.email };

        const token = signToken(payload)
        
        res.json({
            massage: "Login successfully",
            status: 201,
            token
        })
        
    } catch (err) {
        next(err)
    }

}

module.exports = {
    authRegister,
    authLogin,
}