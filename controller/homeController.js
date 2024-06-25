require('dotenv').config()

const Url= require("../model/urlModel")

async function homePage(req, res) {
  console.log(req.body)
  await Url.find({email: req.body?.email}).then((allUrls)=>{
    return res.render("home", {
      base_url: process.env.BASE_URL,
      allUrls: allUrls
    })
  }).catch((err)=>{
    console.log(err)
    return res.render("home", {
      base_url: process.env.BASE_URL,
      errorHome: "No url list found!"
    })
  })
}

async function indexPage(req, res) {
  console.log(process.env.BASE_URL)
    return res.render("index", {
      base_url: process.env.BASE_URL
    })
}

async function loginPage(req, res) {
  console.log(process.env.BASE_URL)
    return res.render("signin", {
      base_url: process.env.BASE_URL
    })
}

async function registerPage(req, res) {
  console.log(process.env.BASE_URL)
    return res.render("signup", {
      base_url: process.env.BASE_URL
    })
}

module.exports = { homePage, loginPage, registerPage,indexPage }