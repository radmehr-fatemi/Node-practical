const getUser = (req ,res) => {
    res.send("GET User Home Router")
}

const postUser = (req ,res) => {
    res.send("POST User Home Router")
}

const putUser = (req ,res) => {
    res.send("PUT User Home Router")
}

module.exports = {
    getUser,
    postUser,
    putUser,
}