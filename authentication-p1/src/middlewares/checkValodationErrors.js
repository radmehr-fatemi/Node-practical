const { validationResult } = require("express-validator")

const checkValidationError = (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length === 0) return next();
    
    const errorResult = {};

    errors.map(e => errorResult[e.path] = e.msg)
    next(errorResult)
}

module.exports = checkValidationError