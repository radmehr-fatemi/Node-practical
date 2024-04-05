const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const flash = require("express-flash");
const session = require("express-session");
//AllRouter
const { AllRouter } = require("./routers/index.routes");
//Middlewares
const errorHandler = require("./middlewares/errorHandler");
const notfoundHandler = require("./middlewares/notfoundHandler");
const { passportInit } = require("./config/passport.config");
const passport = require("passport");

const app = express();
const port = 3000;

//Config Mongoose
require("./config/mongoose.config");

//Install applications
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

//Set Session and Flash
app.use(flash())
app.use(session({
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

//Set All Router
app.use(AllRouter(passport));

//Set view engine ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layout/main.ejs");

//Set passport
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())

//Set Middlewares
app.use(notfoundHandler)
app.use(errorHandler)
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
//Listen Port
app.listen(port, () => {
    console.log(`Server has ran on http://localhost:${port}`);
})

