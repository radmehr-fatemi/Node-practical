const jwt = require("jsonwebtoken");
const fs = require("fs");
const Secret = "vnqewjofneqwgnwk2g k1rf13j j13 rf";
const privateKey = fs.readFileSync("privateKey.key");

const token = jwt.sign({
    email: "aaa@gmail.com",
    password: "1234"
},
    Secret,
    {
        expiresIn: 2,
        algorithm: "HS512"
    }
);

setTimeout(() => {
    const verify = jwt.verify(token, Secret);
    const decode = jwt.decode(token);
}, 1000)

const OPENSSLToken = jwt.sign({
    email: "aaa@gmail.com",
    password: "1234"
},
    privateKey,
    {
        expiresIn: 2,
        algorithm: "RS384"
    }
);

setTimeout(() => {
    const verify = jwt.verify(OPENSSLToken, privateKey);
    const decode = jwt.decode(OPENSSLToken);
}, 1000)
