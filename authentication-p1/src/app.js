const express = require("express");
const path = require("path");
const dotEnv = require("dotenv");
const serveFavicon = require("serve-favicon");

//AllRouter
const { AllRouter } = require("./routers/index.routes");

//Middlewares
const errorHandler = require("./middlewares/errorHandler");
const notfoundHandler = require("./middlewares/notfoundHandler");

const app = express();
dotEnv.config();
const NodeEnv = process.env.NODE_ENV;
dotEnv.config({
    path: path.join(`${__dirname}/../.env.${NodeEnv}`)
});
require("./config/mongoose.config");

const port = process.env.PORT;

app.use(serveFavicon("src/public/favicon.ico"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AllRouter);

app.use(notfoundHandler)
app.use(errorHandler)

app.listen(port ,() => {
    console.log(`Server has ran on http://localhost:${port}`);
})

