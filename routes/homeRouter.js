const express = require("express")
const { homePage, loginPage, registerPage, indexPage } = require("../controller/homeController")
const { redirectUrl } = require("../controller/urlController")
const {userAuthValidate, userAuthValidatehomePage}= require("../middleware/userAuth")

const router = express.Router();

router.route("/")
    .get(userAuthValidatehomePage, indexPage)

router.route("/home")
    .get(userAuthValidate, homePage)

router.route("/login")
    .get(loginPage)

router.route("/register")
    .get(registerPage)
router.route("/faq")
    .get(registerPage)

router.route("/contactus")
    .get(registerPage)

router.route("/aboutus")
    .get(registerPage)

router.route("/:id")
    .get(redirectUrl)

module.exports = router