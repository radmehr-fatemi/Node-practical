const {Router} = require("express");
const { getUser, postUser, putUser } = require("../controllers/user.controller");

const router = Router();

router.get("/" ,getUser)

router.post("/" ,postUser)

router.put("/" ,putUser)

module.exports = router;