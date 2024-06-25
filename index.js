const express = require('express');
require('dotenv').config()
const bodyparser = require('body-parser')
const { type } = require('os');
const app = express();
const path = require("path")
const {userAuthValidate}= require("./middleware/userAuth")
const cookieParser= require("cookie-parser")

// Db connection
const connectDatabase = require("./connection")

//Router Import
const userRouter = require("./routes/userRouter")
const homeRouter = require("./routes/homeRouter")
const urlRouter = require("./routes/urlRoute")

// Middleware
const { createLog } = require("./middleware/index")

connectDatabase(process.env.DB_PATH)
    .then(() => { console.log("Connected Mongo DB") })
    .catch((err) => { console.log(err) })

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))

app.use("/views", express.static('views'))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(createLog(process.env.FILE_NAME))

app.use('/', homeRouter)

app.use('/api/users', userRouter);
app.use('/api/urls',userAuthValidate, urlRouter);



app.listen(5001)