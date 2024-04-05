const { Router } = require("express");
const UserModel = require("../models/UserModel");
const { hashPassword } = require("../utils/auth.util");
const flash = require("express-flash");
const { redirectIfIsAuth, checkAuthentication } = require("../middlewares/redirectAuth");

const router = Router();
const initRouter = (passport) => {

    let resultMassage = "";

    router.get("/", (req, res, next) => {
        res.render("index", {
            massage: resultMassage,
            title: "Auth Project"
        })
    });

    router.get("/register", redirectIfIsAuth, (req, res, next) => {
        res.render("register", {
            massage: resultMassage,
            title: "Sign up",
            massage: resultMassage
        })
    });

    router.get("/login", redirectIfIsAuth, (req, res, next) => {
        res.render("login", {
            massage: resultMassage,
            title: "Sign in"
        })
    });

    router.get("/profile", (req, res, next) => {
        const user = req.user;
        res.render("profile", {
            massage: resultMassage,
            title: "Dashboard",
            userData: user
        })
    });

    router.post("/register", redirectIfIsAuth, async (req, res, next) => {
        try {
            const { username, fulName, password } = req.body;
            const referrer = req.header("referrer") || req.headers.referer;

            if (!username || !fulName || !password) {
                resultMassage = "require fields"
                res.redirect(referrer);
            }

            const user = await UserModel.findOne({ username })

            if (user) {
                resultMassage = "User has already existed";
                res.redirect(referrer)
            }

            const hashedPassword = hashPassword(password);

            const result = await UserModel.create({
                username,
                fulName,
                password: hashedPassword,
            })
            res.redirect("/login")

        } catch (err) {
            next(err)
        }

    })

    router.post("/login", redirectIfIsAuth, passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }), async (req, res, next) => {
        res.redirect("/profile")
    })

    router.get("/logout", checkAuthentication, (req, res) => {
        req.logOut({ keepSessionInfo: false }, (err) => {
            if (err) console.log(err);
        })
        res.redirect("/login")
    })

    return router
}

module.exports = {
    AllRouter: initRouter
}