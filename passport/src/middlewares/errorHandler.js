const checkErrors = require("../utils/checkErrors");

const errorHandler = (err, req, res, next) => {
    console.log("Error----------------", err);
    const status = err.statusCode || 500;

    res.json({
        status,
        massage: checkErrors(err)
    })
}

module.exports = errorHandler;