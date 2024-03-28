const express = require("express");
const path = require("path");
const users = require("./users.json");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"))

app.get("/users", (req, res) => {
    res.render("index", {
        title: "I`m a developer",
        link: "http://llocalhost:3000",
        users
    })
})

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Page not found",
        status: res.statusCode
    })
})

app.use((error, req, res, next) => {
    console.log(`Rendered the error : ${error ?? ""}`);

    return res.send({
        status: error.statusCode || 500,
        error
    })
})

app.listen(3000, () => console.log("Server run on http://llocalhost:3000"))