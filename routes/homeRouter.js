const express = require("express")
const { homePage } = require("../controller/homeController")
const { redirectUrl } = require("../controller/urlController")

const router = express.Router();

router.route("/")
    .get(homePage)

router.route("/:id")
    .get(redirectUrl)

module.exports = router