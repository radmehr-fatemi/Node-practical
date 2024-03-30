const errorHandler = (err, req, res, next) => {
    console.log("Error---------", err);
    if (err) return res.json({
        massage: "Internal server error",
        status: res.statusCode || 500,
        error: err
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