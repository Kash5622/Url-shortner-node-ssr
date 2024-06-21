const UrlModel = require("../model/urlModel")
const shortid= require("shortid")

async function createUrlLink(req, res) {
    const body = req.body;
    const shortId= shortid(process.env.SHORT_ID_LENGTH);
    if (!body.url) return res.status(400).json({ error: "Url not found!" })
    await UrlModel.create({
        shortId: shortId,
        redirectUrl: req.body.url,
    }).then((result) => {
        if (result) {
            return res.status(201).json({ msg: "Url has been created", id: shortId })
        } else {
            return res.status(400).json({ msg: "Something went wrong" })
        }
    }).catch((err) => {
        return res.status(400).json({ msg: "Something went wrong - " + err.message })
    })
    
}


module.exports= {createUrlLink};