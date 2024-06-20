const User = require('../model/userModel');


async function getAllUser(req, res){
    const result = await User.find({})
    if (result) {
        console.log(result)
        // const userData = `<ul>
        //         ${result.map((data) => { return '<li>'+data.firstName+" "+data.lastName+"  "+data.email+" "+'</li>' })}
        //     </ul>`
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

async function createUser(req, res){
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    }).then(() => {
        if (result) {
            return res.status(201).json({ msg: "Users has been created" })
        } else {
            return res.status(400).json({ msg: "Something went wrong" })
        }
    }).catch((err) => {
        return res.status(400).json({ msg: "Something went wrong - " + err.message })
    })
}

async function getParticuarUserData(req, res){
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

async function updateParticularUserData(req, res){
    return res.status(200).send("Working on it.")
}

async function deleteParticularUserData(req, res){
    return res.status(200).send("Working on it.")
}


module.exports= {getAllUser, createUser, getParticuarUserData, updateParticularUserData, deleteParticularUserData}