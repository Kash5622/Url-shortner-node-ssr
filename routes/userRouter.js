const express = require("express")
const { getAllUser, createUser, getParticuarUserData, updateParticularUserData, deleteParticularUserData } = require("../controller/userController")

const router = express.Router();

router.route("/").get(getAllUser)
    
router.route("/:id")
.delete(deleteParticularUserData)
.patch(updateParticularUserData);

router.route("/login").post(getParticuarUserData)
router.route("/signup").post(createUser)


module.exports = router