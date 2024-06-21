const UrlModel = require("../model/urlModel")
const shortid = require("shortid")
require('dotenv').config()

async function createUrlLink(req, res) {
    const body = req.body;
    const shortId = shortid(process.env.SHORT_ID_LENGTH);
    if (!body.url) return res.status(400).json({ error: "Url not found!" })
    await UrlModel.create({
        shortId: shortId,
        redirectUrl: req.body.url,
    }).then((result) => {
        if (result) {
            return res.render('index',{id: shortId, base_url: process.env.BASE_URL })
        } else {
            return res.status(400).json({ msg: "Something went wrong" })
        }
    }).catch((err) => {
        return res.status(400).json({ msg: "Something went wrong - " + err.message })
    })

}

async function redirectUrl(req, res) {
    const id = req.params.id
    console.log(id)
    if (id != "favicon.ico") {
        await UrlModel.findOne({ shortId: id }).then((result) => {
            console.log(result)
            if (result) {
                return res.redirect(result.redirectUrl)
            } else {
                return res.status(400).json({ msg: "No data found!" })
            }
        }).catch((err) => {
            return res.status(400).json({ msg: "Something went wrong - " + err.message })
        })
    }
}


module.exports = { createUrlLink, redirectUrl };