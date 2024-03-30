const { Joi } = require("express-validation");

const errors = {
    email: "Invalid email",
    fulName: "Ful name needs to be mor than 3 and less 22 items",
    age: "Age needs to be mor than 18 and les 60",
    isNan: "Age must be numbers",
    password: "Invalid password",
    confirmPassword: "Passwords do not mach",
};

const registerValidation = {
    body: Joi.object({
        email: Joi.string().email().message(errors.email).required(),
        fulName: Joi.string().required().min(3).max(22).message(errors.fulName),
        age: Joi.number().required().integer().min(18).max(60).message(errors.age),
        password: Joi.string().required().min(6).message(errors.password),
        confirmPassword: Joi.ref("password"),
    })
}
const loginValidation = {
    body: Joi.object({
        email: Joi.string().email().message(errors.email).required(),
        password: Joi.string().required().min(6).message(errors.password),
    })
}

module.exports = {
    registerValidation,
    loginValidation,
}