const { default: mongoose } = require('mongoose');
const User = require('../model/userModel');


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
    if (!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    }).then((result) => {
        if (result) {
            return res.status(201).json({ msg: "Users has been created" })
        } else {
            return res.status(400).json({ msg: "Something went wrong" })
        }
    }).catch((err) => {
        return res.status(400).json({ msg: "Something went wrong - " + err.message })
    })
}

async function getParticuarUserData(req, res) {
    console.log(req.params.id)
    const result = await User.findOne({ email: req.params?.id });
    if (result) {
        const userData = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            jobTitle: result.jobTitle,
            gender: result.gender
        }

        return res.status(200).json(userData);
    } else {
        return res.status(200).json({ msg: "No data found" })
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