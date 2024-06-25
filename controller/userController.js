const { default: mongoose } = require('mongoose');
const User = require('../model/userModel');
const {getUser, setUser}= require("../services/auth")
const {v4: uuidV4}= require("uuid")


async function getAllUser(req, res) {
    const result = await User.find({})
    if (result) {
        const userData = [];
        result.forEach((data) => {
            userData.push({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                jobTitle: data.jobTitle,
                gender: data.gender
            })
        })

        return res.status(200).json(userData);
    } else {
        return res.status(200).json({ msg: "No data found" })
    }
}

async function createUser(req, res) {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.password) {
        return res.redirect("/register");
    }

    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        password: body.password
    }).then((result) => {
        if (result) {
            return res.redirect("/login");
        } else {
            return res.redirect("/signup", { msg: "Something went wrong!" });
        }
    }).catch((err) => {
        return res.redirect("/signup", { msg: "Something went wrong!" });
    })
}

async function getParticuarUserData(req, res) {
    const result = await User.findOne({ email: req.body?.email, password: req.body?.password });
    if (result) {
        const sessionId = uuidV4()
        setUser(sessionId, result);
        res.cookie('uid', sessionId)
        return res.redirect("/home");
    } else {
        return res.redirect("/signin")
    }
}

async function updateParticularUserData(req, res) {
    const body = req.body;
    const result = await User.findOne({ email: req.params?.id });
    if (result) {
        const userUpdate = await User.updateOne({ ...req.body })
        console.log(userUpdate)
    }
    return res.status(200).json({ msg: "User has been updated." })
}

async function deleteParticularUserData(req, res) {
    const body = req.body;
    const result = await User.findOne({ email: req.params?.id });
    if (result) {
        const deleteUser = await User.deleteOne({ email: req.params?.id })
        console.log(deleteUser)
    }
    return res.status(200).json({ msg: "User has been deleted." })
}


module.exports = { getAllUser, createUser, getParticuarUserData, updateParticularUserData, deleteParticularUserData }