const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const fileName = "text.tex";
const stream = fs.ReadStream(`src/${fileName}`);
const md5Hash = crypto.createHash("md5");

stream.on("data", (data) => {
    console.log("Hear------------");
    md5Hash.update(data)
})

stream.on("end", () => {
    md5Hash.update("ssssssss")
    const hash = md5Hash.update("222");
    console.log(hash);
    hash.digest("hex");
    const hashPath = path.join(__dirname, "hash.tex");
    fs.writeFileSync(hashPath, hash)
})
