const express = require('express');
const fs = require('fs')
const bodyparser = require('body-parser')
const mongoose = require("mongoose");
const { type } = require('os');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tutorial-1')
    .then(() => { console.log("Connected Mongo DB") })
    .catch((err) => { console.log(err) })


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    }
},
    { timestamps: true }
)

const User = mongoose.model('user', userSchema);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()} ${req.path} ${req.method} ${req.ip}`, (err, data) => {
        if (err) {
            return res.status(500).json({ msg: "Something went wrong in log file!" })
        }
        next();
    })
})

app.route('/').get((req, res) => {
    return res.status(200).send("<h1>Home page</h1>")
})

app.route('/api/users').get(async (req, res) => {
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

}).post(async (req, res) => {
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
})


app.route("/api/users/:id").get(async (req, res) => {
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
}).patch((req, res)=>{
    res.send("pending...")
}).delete((req, res)=>{
    res.send("pending...")
})



app.listen(5001)