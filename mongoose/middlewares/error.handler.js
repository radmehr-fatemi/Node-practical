const errorHandler = async (err ,req ,res ,next) => {
    console.log("Error-------" ,err);
    if (err) return res.send({
        massage: "Internal server error",
        status: err.statusCode || 500,
        error: err
    })
}

const notFoundHandler = async (req ,res ,next) => {
    return res.send({
        massage: "Route not found",
        status:404
    })
}

module.exports = {
    errorHandler,
    notFoundHandler
}