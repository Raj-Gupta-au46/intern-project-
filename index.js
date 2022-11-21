const { default: mongoose } = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const route = require('./src/route/route.js')

const app = express();

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Anshika16:group@11@project2.qv2ymn6.mongodb.net/group11Databae"
,{
    useNewUrlParser: true}
)

.then(()=> console.log("MongoDB is connected, Goodluck for the project2!!!"))
.catch(err => console.log(err))


app.use("/",route)

app.listen(process.env.PORT || 2200, function () {
    console.log('Express app running on port ' + (process.env.PORT || 2200))
});


