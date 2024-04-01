const setCookie = (req, res) => {
    const cookieName = req.params.id;
    res.cookie(cookieName, "CookieValue" ,{
        maxAge: 5000,

    })

    res.send(`Cookie has set : ${cookieName}`)
}

const getCookie = (req, res) => {
    const cookies = req.cookies;
    res.send({ "Cookie": cookies })
}

const getCookieById = (req, res) => {
    const cookieName = req.params.id;
    const cookie = req.cookies[cookieName];
    res.send({ "Cookie": { [cookieName]: cookie } })
}

const deleteCookie = (req, res) => {
    const cookieName = req.params.id;
    res.clearCookie(cookieName)
    res.send(`Cookie deleted : ${cookieName}`)
}

module.exports = {
    setCookie,
    getCookie,
    getCookieById,
    deleteCookie,
}