const Schema = require("validate");

const errors = {
    email: "Invalid email",
    fulName: "Ful name needs to be mor than 3 and less 22 items",
    age: "Age needs to be mor than 18 and les 60",
    isNan: "Age must be numbers",
    password: "Invalid password",
    confirmPassword: "Passwords do not mach",
};

const registerValidationSchema = new Schema({
    email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    fulName: { type: String, length: { min: 3, max: 22 }, required: true },
    age: { type: String, required: true },
    password: { type: String, length: { min: 6 }, required: true },
    confirmPassword: { type: String, length: { min: 6 }, required: true },
})

const loginValidationSchema = new Schema({
    email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, length: { min: 6 }, required: true },
})


module.exports = {
    registerValidationSchema,
    loginValidationSchema
}