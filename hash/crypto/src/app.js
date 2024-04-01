const crypto = require("crypto");

const hashPassword = (pass) => {
    const salt = crypto.randomBytes(10).toString("hex");
    const hash = crypto.pbkdf2Sync(pass.toString() ,salt ,1000 ,64 ,"sha512").toString("hex");
    const hashResult = `$HS.${salt}.${hash}`;
    return hashResult
}

const verifyPassword = (pass ,hashed) => {
    const salt = hashed.split(".")[1];
    const oldPass = hashed.split(".")[2];
    const hash = crypto.pbkdf2Sync(pass.toString() ,salt ,1000 ,64 ,"sha512").toString("hex");
    return oldPass === hash
}

const myPass = hashPassword("1234");
// console.log( verifyPassword("1234" ,myPass));

const hash = crypto.createHash("sha512" ,{endCoding: "utf-8"}).update("password").digest("hex")
const hash2 = crypto.createHmac("sha512" ,"secret-key").update("password").digest("hex");
console.log(hash2);
