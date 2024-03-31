const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        fs.mkdirSync("public/uploads", { recursive: true });
        const dest = "public/uploads";

        cb(null, dest)
    },
    filename: (req, file, cb) => {
        const formats = [".png", ".web3"];
        const ext = path.extname(file.originalname);

        if (req.url === "/upload-array" &&
            !formats.includes(ext) &&
            file.mimetype.includes("image/jpeg")
        ) cb(new Error("the formats of the image need one of .jpg ,.png ,.web3"))

        const fileName = `${Date.now()}${ext}`
        cb(null, fileName)
    }
})

const _1MB = 1 * 1000 * 1000;

const fileUpload = multer({
    storage,
    limits: {
        fileSize: _1MB
    }
})

module.exports = {
    fileUpload
}