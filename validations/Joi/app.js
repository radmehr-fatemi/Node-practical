const express = require("express");
const { notfoundHandler, errorHandler } = require("./middlewares/errorHandler");
const { registerValidation, loginValidation } = require("./validations/auth.validation");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("Home route")
})

app.post("/register", (req, res, next) => {
    try {
        const {error} = registerValidation.validate(req.body)
        if (error) throw {error}
    } catch (err) { next(err) }
    res.send("All right")
})

app.post("/login" ,(req, res, next) => {
    try {
        const {error} = loginValidation.validate(req.body)
        if (error) throw {error}
    } catch (err) { next(err) }

    res.send("All right")
})


app.use(errorHandler)
app.use(notfoundHandler)

app.listen(port, () => console.log(`Server ran on http://localhost:${port}`));