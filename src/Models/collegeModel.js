const mongoose= require('mongoose')
const collegeSchema= new mongoose.Schema({

}, {timestamps:true})


module.exports= mongoose.model('college', collegeSchema)