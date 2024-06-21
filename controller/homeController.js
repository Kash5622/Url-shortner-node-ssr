require('dotenv').config()

async function homePage(req, res) {
  console.log(process.env.BASE_URL)
    return res.render("index", {
      base_url: process.env.BASE_URL
    })
}

async function loginPage(req, res) {
  console.log(process.env.BASE_URL)
    return res.render("index", {
      base_url: process.env.BASE_URL
    })
}

async function registerPage(req, res) {
  console.log(process.env.BASE_URL)
    return res.render("index", {
      base_url: process.env.BASE_URL
    })
}

module.exports = { homePage, loginPage, registerPage }