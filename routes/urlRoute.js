const express = require("express")
const {createUrlLink}= require("../controller/urlController")
const router = express.Router();

router.route("/").post(createUrlLink)


module.exports = router