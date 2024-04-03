const { body } = require("express-validator");

const errors = {
    fulName: "fulName needs to be more than 3 and less 32",
    email: "email required",
    password: "password required and needs to be mor than 6",
    confirmPassword: "password are not math",
}

const registerValidator = () => [
    body("fulName").isString().isLength({ min: 3, max: 32 }).withMessage(errors.fulName),
    body("email").isString().isEmail().withMessage(errors.email),
    body("password").isString().isLength({ min: 6 }).withMessage(errors.password),
    body("confirmPassword").custom((value, { req }) => {
        return value === req.body.confirmPassword
    }).withMessage(errors.confirmPassword),
];

const loginValidator = () => [
    body("email").isString().isEmail().withMessage(errors.email),
    body("password").isString().isLength({ min: 6 }).withMessage(errors.password),
];

module.exports = {
    registerValidator,
    loginValidator,
}