const {Router} = require("express");
const userRouter = require("./user.router");
const cookieRouter = require("./cookie.router");

const router = Router();

router.use("/user" ,userRouter)
router.use("/cookie" ,cookieRouter)

module.exports = router