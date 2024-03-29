const { body } = require("express-validator");

const errors = {
    email: "Invalid email",
    fulName: "Ful name needs to be mor than 3 and less 22 items",
    age: "Age needs to be mor than 18 and les 60",
    isNan: "Age must be numbers",
    password: "Invalid password",
    confirmPassword: "Passwords do not mach",
};

const registerVAlidator = () => [
    body("email").isEmail().withMessage(errors.email),
    body("fulName").isString().isLength({ min: 3, max: 22 }).withMessage(errors.fulName),

    body("age").custom(value => {
        const result = +value >= 18 && +value <= 60;
        if ( isNan(value) ) throw new Error(errors.isNan)
        return result
    }).withMessage(errors.age),

    body("password").isString().isLength({ min: 6 }).withMessage(errors.password),
    
    body("confirmPassword").custom((value, { req }) => {
        const result = value === req.body.confirmPassword;
        return result;
    }).withMessage(errors.confirmPassword)
];

const loginVAlidator = () => [
    body("email").isEmail().withMessage(errors.email),
    body("password").isString().isLength({ min: 6 }).withMessage(errors.password),
];

module.exports = {
    registerVAlidator,
    loginVAlidator
}