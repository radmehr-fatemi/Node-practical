const express = require("express");
const { errorHandler, notfoundHandler } = require("./middlewares/errorHandler");
const { fileUpload } = require("./config/multer.config");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("<h1>Home route</h1>")
})

app.post("/upload-single" ,fileUpload.single("image") ,(req ,res) => {
    res.send(req.file)
})

app.post("/upload-array" ,fileUpload.array("image" ,3) ,(req ,res) => {
    res.send(req.files)
})

app.post("/upload-field" ,fileUpload.fields([
    {name: "image" ,maxCount:2},
    {name: "file" ,maxCount:1}
]) ,(req ,res) => {
    res.send(req.files)
})

app.post("/upload-any" ,fileUpload.any() ,(req ,res) => {
    res.send(req.files)
})


app.use(notfoundHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`Server ran on http://localhost:${port}`));