const express = require("express");
const { notfoundHandler, errorHandler } = require("./middlewares/errorHandler");
const { registerVAlidator, loginVAlidator } = require("./validations/auth.validation");
const { checkValidation } = require("./middlewares/checkValidation");
const { paramValidator, queryValidator } = require("./validations/url.validation");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/" ,(req ,res ,next) => {
    res.send("Home route")
})

app.post("/register" ,registerVAlidator()  ,checkValidation ,(req ,res ,next) => {
    res.send("All right")
})

app.post("/login" ,loginVAlidator()  ,checkValidation ,(req ,res ,next) => {
    res.send("All right")
})

app.get("/blogs/:id" ,paramValidator ,checkValidation ,(req ,res ,next) => {
    res.send("All right")
})

app.get("/blogs" ,queryValidator() ,checkValidation ,(req ,res) => {
    res.send("All right")
})

app.use(errorHandler)
app.use(notfoundHandler)

app.listen(port ,() => console.log(`Server ran on http://localhost:${port}`));