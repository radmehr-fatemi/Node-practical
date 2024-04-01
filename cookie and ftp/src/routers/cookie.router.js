const {Router} = require("express");
const { setCookie, deleteCookie, getCookie, getCookieById } = require("../controllers/cookie.controller");

const router = Router();

router.get("/set/:id" ,(req, res) => {
    const cookieName = req.params.id;

    res.cookie(cookieName, "CookieValue" ,{
        maxAge: 5000,
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "lax"
    })
console.log(req.cookies);
    res.send(`Cookie has set : ${cookieName}`)
} )

router.get("/get" ,getCookie )
router.get("/:id" ,getCookieById )
router.delete("/:id" ,deleteCookie )

module.exports = router;
