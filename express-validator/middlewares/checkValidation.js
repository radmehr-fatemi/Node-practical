const { validationResult } = require("express-validator")

const checkValidation = (req, res, next) => {
    const { errors } = validationResult(req);
    console.log(errors);
    const errorResult = errors.map(err => {
        return { [err.path] : { massage: err.msg, value: err.path }
    }
    })

    if (Object(errorResult).length) return res.status(444).json({ status:444 ,error:errorResult})
    next()
}

module.exports = {
    checkValidation
}