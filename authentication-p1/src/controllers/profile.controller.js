const getProfile = (req, res, next) => {
    res.send(req.user || "Not yet")
}

module.exports = {
    getProfile
}