const checkAuthentication = (req ,res ,next) => {
    if ( !req.isAuthenticated ) return res.redirect("/login") 
    next();
}

const redirectIfIsAuth = (req ,res ,next) => {
    if ( req.isAuthenticated ) return res.redirect("/profile")
    return next()
}

module.exports = {
    checkAuthentication,
    redirectIfIsAuth,
}
