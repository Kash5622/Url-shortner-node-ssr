const express = require("express")
const { homePage } = require("../controller/homeController")

const router = express.Router();

router.route("/")
    .get(homePage)

module.exports = router