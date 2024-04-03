const { Router } = require("express");
const { authRegister, authLogin } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../middlewares/validations");
const checkValidationError = require("../middlewares/checkValodationErrors");

const router = Router();

router.post("/register" ,registerValidator() ,checkValidationError ,authRegister);
router.post("/login" ,loginValidator() ,checkValidationError ,authLogin);

module.exports = {
    AuthRouter: router
}