const { checkValidation } = require("./checkValidation");

const errorHandler = (err, req, res, next) => {
    console.log("Error---------", err);
     return res.json({
        massage: "Internal server error",
        status: err.statusCode || 500,
        error: checkValidation(err)
    })
}

const notfoundHandler = (req, res, next) => {
    return res.status(404).json({
        massage: "Page not found",
        status: res.statusCode
    })
}

module.exports = {
    notfoundHandler,
    errorHandler
}