const express = require("express");
const path = require("path");
const users = require("./users.json");

const app = express();

app.use(express.static("public"))
app.set("view engine" ,"ejs");


app.get( "/" ,(req ,res ,next) => {
    res.render("index" ,{
        links: {
            rightelLink:"https://www.rightel.ir",
        }
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
        error: `Internal server error : ${error}`
    })
})

app.listen(3000, () => console.log("Server run on http://llocalhost:3000"))