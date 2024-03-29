const { param, query } = require("express-validator");

const errors = {
    id: "Invalid Object id",
    query: "Invalid query",
}

const paramValidator = param("id").isMongoId().withMessage(errors.param);

const queryValidator = (req, res) => [
    query("title").isString().matches(/[a-z]/).withMessage(errors.query),
    query("sort").matches(/ASC | DESC/)
]

module.exports = {
    paramValidator,
    queryValidator,
}