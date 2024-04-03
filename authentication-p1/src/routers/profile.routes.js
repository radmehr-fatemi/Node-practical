const { Router } = require("express");
const { getProfile } = require("../controllers/profile.controller");

const router = Router();

router.get("/" ,getProfile)

module.exports = {
    ProfileRouter: router
}