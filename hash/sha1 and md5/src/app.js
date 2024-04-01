const sha1 = require("sha1");
const md5 = require("md5");

const hash = sha1("password")
console.log(hash);

const hash2 = md5("password")
console.log(hash2);
