const mongoose= require('mongoose')
const collegeSchema= new mongoose.Schema({

    name:{type:String,
        required:true,
        trim:true},

     fullName:{type:String,
        required:true,
        trim:true}, 

     logoLink:{type:String,
        required:true}, 
        
     isDleted:{type:Boolean,
        default:false}

}, {timestamps:true})


module.exports= mongoose.model('college', collegeSchema)