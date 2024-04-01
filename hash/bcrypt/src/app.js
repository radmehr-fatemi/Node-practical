const bcrypt = require("bcrypt");

const hashPassword = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass.toString() ,salt ,(err) => {
        if (err) return console.log("Error-----" ,err)
    } );
return hash
}

const verifyPassword = (pass ,hashed) => {
    const verify = bcrypt.compareSync(pass ,hashed);
    return verify
}

const myPass = hashPassword("1234");

console.log(verifyPassword("1234" ,myPass));