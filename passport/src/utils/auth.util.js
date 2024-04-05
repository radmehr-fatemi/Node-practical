const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "2b$10$o2Af2JzARRi9/VDSJddnoutKAJvFSHwWkDN0EbRVNZ7.xoe47emBG";

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const verifyPassword = async (password, hashed) => {
    const compared = await bcrypt.compare(password, hashed);
    return compared
}

const signToken = (payload) => {
    const token = jwt.sign(payload, secret)
    return token
}

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, secret);
        return verify
    } catch (err) {
        throw { massage: err, status: 401 }
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    signToken,
    verifyToken,
}