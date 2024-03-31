const express = require("express");
const path = require("path");
const fs = require("fs");
const { errorHandler, notfoundHandler } = require("./middlewares/errorHandler");
const fileUpload = require("express-fileupload");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.send("<h1>Home route</h1>")
})

app.post("/upload-buffer", (req, res) => {
    const data = req.files.image.data;
    const buffer = Buffer.from(data);
    const ext = path.extname(req.files.image.name);
    const destPath = path.join("public/uploads", Date.now() + ext);

    fs.writeFileSync(destPath, buffer)
    res.send(req.files)
})

app.post("/upload-mv", async (req, res, next) => {
    const files = req?.files;
    fs.mkdirSync("public/uploads", { recursive: true });

    if (!files || !Object.keys(files).length) next(new Error("No file uploaded"));

    for (const key in files) {
    const file = files[key];

    const result = await new Promise((res, rej) => {
        const ext = path.extname(file.name);
        const destPath = path.join("public/uploads", Date.now() + ext);
        file.mv(destPath, err => {
            if (err) rej(err)
            else res(true)
        })
    })
    }

    res.send(req.files)
})

app.use(notfoundHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`Server ran on http://localhost:${port}`));