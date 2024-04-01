const express = require("express");
const path = require("path");
const serveFavicon = require("serve-favicon");
const allRouters = require("./routers");
const { notfoundHandler, errorHandler } = require("./middlewares/errorHandler");
const exp = require("constants");
const serveIndex = require("serve-index");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
const hashed = "54a3018c1f20b78c5d6f918c69e01017";

app.use(serveFavicon(path.join(__dirname, "public", "favicon.ico")))
app.use("/ftp", express.static("src/public/ftp"));
app.use("/ftp", serveIndex("src/public/ftp" ,{stylesheet:"src/public/styles/ftp.css"}));
app.use(cookieParser(hashed));
app.use(allRouters);

app.use(notfoundHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`Server has ran on http://localhost:${port}`));