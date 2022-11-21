const internModel= require('../Models/internModel')
const validation = require('../Validator/validation')



const applyIntern= async function (req, res){
    try{
        let details= req.body
        let enter
        if(Object.keys(details).length==0){
            return res.status(400).send({status:false,message:"Please enter the body in request."})
        }
        let{name, email, mobile, collegeId, isDeleted}= details
        if(!name){
            return res.status(400).send({status:false, message: "Please provide name in the body"})
        }
        if(!email){
            res.status(400).send({status:false, message: "Please provide email in the body"})
        }
        if(!mobile){
            return res.status(400).send({status:false, message: "Please provide mobile number in the body"})
        }
        if(!collegeId){
            return res.status(400).send({status:false, message: "Please provide collegeId in the body"})
        }
        
        

        

        if(!validation.isValidEmail(email)){
            return res.status(400).send({status:false, message:"Please provide a valid email in the request body eg. pass@123."})
        }
        if(!validation.isValidMobile(mobile)){
            return res.status(400).send({status:false, message:"Please provide a valid mobile number in the request body eg. 9987654987."})
        }
        if(isDeleted==true){
            return res.status(400).send({status:false, message:"you can not delete a document at the time of creation."})
        }

        
        
            
            
            
        
         enter= await internModel.create({name:name, email:email, mobile:mobile, collegeId: collegeId})
         console.log(enter)
        if(Object.keys(enter).length==0){
            return res.status(400).send({status:false, message:"can not create this document."})
        }
    else{
        return res.status(201).send({status:true, data:enter})
    }


    }
    catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}




const getInternDetails= async function (req, res){
    try{

    }
    catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}


module.exports.getInternDetails= getInternDetails
module.exports.applyIntern=applyIntern






















