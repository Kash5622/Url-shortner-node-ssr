const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitedHistory: [{
        timeStamp: {
            type: Number
        }
    }]
}, { timestamps: true })

const UrlModel= mongoose.model('url', urlSchema);

module.exports= UrlModel;