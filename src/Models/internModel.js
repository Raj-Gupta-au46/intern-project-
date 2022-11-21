const mongoose= require('mongoose')
const internSchema= new mongoose.Schema({

}, {timestamps:true})


module.exports= mongoose.model('intern', internSchema)