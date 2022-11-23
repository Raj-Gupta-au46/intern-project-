const mongoose  = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const route = require('./src/route/route.js')

const app = express();

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://anjulika:3456789@grou2.xeiaskq.mongodb.net/test",{
    useNewUrlParser: true}
)

.then(()=> console.log("MongoDB is connected, Goodluck for the project2!!!"))
.catch(err => console.log(err))


app.use("/",route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

/**
 * const express= require("express")
 * 
 * 
 * 
 * 
 * 
 */