const {getUser} = require("../services/auth")

async function userAuthValidate(req, res, next){
    const sessionId= req.cookies?.uid;
    console.log(req.cookies)
    if(!sessionId) return res.redirect("/login")

    const user= getUser(sessionId);
    if(!user) return res.redirect("/login")
    req.user=user;
    next();
}

async function userAuthValidatehomePage(req, res, next){
    const sessionId= req.cookies?.uid;
    if(sessionId){
        const user= getUser(sessionId);
        if(user){
            return res.redirect("/home")
        }else{
            next()
        }
    }
    next()
}

module.exports= {userAuthValidate, userAuthValidatehomePage}