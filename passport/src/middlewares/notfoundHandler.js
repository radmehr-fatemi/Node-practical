const notfoundHandler = (req ,res) => {
    res.json({
        massage: "Route not found",
        status: 404
    })
};

module.exports = notfoundHandler;