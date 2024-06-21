const express = require("express")
const { homePage, loginPage, registerPage } = require("../controller/homeController")
const { redirectUrl } = require("../controller/urlController")

const router = express.Router();

router.route("/")
    .get(homePage)

router.route("/login")
    .get(loginPage)

router.route("/register")
    .get(registerPage)

router.route("/:id")
    .get(redirectUrl)

module.exports = router