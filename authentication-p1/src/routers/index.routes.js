const { Router } = require("express");
const { AuthRouter } = require("./auth.routes");
const { ProfileRouter } = require("./profile.routes");
const { checkAuth } = require("../middlewares/check.auth");

const router = Router();

router.use("/auth", AuthRouter);
router.use("/profile", checkAuth, ProfileRouter);

module.exports = {
    AllRouter: router
}