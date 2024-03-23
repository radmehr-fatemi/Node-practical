function errorHandler(res) {
    const response = {massage: "Page not found" ,status:404};

    res.writeHead(404 ,{"Content-type": "Application/json"}),
    res.write(JSON.stringify(response)),
    res.end()
}

const ErrorHandlerController = {
    errorHandler
};

module.exports = ErrorHandlerController;