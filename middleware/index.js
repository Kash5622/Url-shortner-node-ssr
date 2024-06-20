const fs = require("fs")

function createLog(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName, `\n${Date.now()} ${req.path} ${req.method} ${req.ip}`, (err, data) => {
            if (err) {
                return res.status(500).json({ msg: "Something went wrong in log file!" })
            }
            next();
        })
    }

}

module.exports = {createLog}