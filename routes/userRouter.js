const express = require("express")
const { getAllUser, createUser, getParticuarUserData, updateParticularUserData, deleteParticularUserData } = require("../controller/userController")

const router = express.Router();

router.route("/")
    .get(getAllUser)
    .post(createUser);


router.route("/:id")
    .get(getParticuarUserData)
    .delete(deleteParticularUserData)
    .patch(updateParticularUserData);

module.exports = router