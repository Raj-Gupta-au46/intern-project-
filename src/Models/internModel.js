const mongoose= require('mongoose')
const internSchema= new mongoose.Schema({
    name:{type:String,
        required:true,
        trim:true},

    email:{type:String,
        required:true,
        unique:true,
        trim:true},

    mobile:{type:Number,
        required:true,
        unique:true,
        trim:true},

    collegeId:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"College"},

    isDeleted:{type:Boolean,
        default:false}

}, {timestamps:true})


module.exports= mongoose.model('Intern', internSchema)