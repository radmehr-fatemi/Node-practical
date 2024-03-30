const express = require("express");
const { notfoundHandler, errorHandler } = require("./middlewares/errorHandler");
const { registerValidation, loginValidation } = require("./validations/auth.validation");
const { validate } = require("express-validation");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("Home route")
})

app.post("/register" ,validate(registerValidation) , (req, res, next) => {
    res.send("All right")
})

app.post("/login" ,validate(loginValidation)  , (req, res, next) => {
    res.send("All right")
})

// app.get("/blogs/:id", paramValidator, checkValidation, (req, res, next) => {
//     res.send("All right")
// })

// app.get("/blogs", queryValidator(), checkValidation, (req, res) => {
//     res.send("All right")
// })

app.use(errorHandler)
app.use(notfoundHandler)

app.listen(port, () => console.log(`Server ran on http://localhost:${port}`));