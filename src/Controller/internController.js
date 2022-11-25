const internModel= require('../Models/internModel')
const collegeModel = require("../models/collegeModel")
const validation= require("../validator/validation")

const  {isEmpty, isValidName,isValidMobile,isValidEmail} = validation


//..............................Post Api For Internship Application ...........................................................

const applyIntern= async function (req, res){
    try{
        let details= req.body
        if(Object.keys(details).length==0){
            res.status(400).send({status:false,message:"Please enter the details in request."})
        }
        let{name,email,mobile,collegeName}=details
       
        if(!name){
            return res.status(400).send({status:false,message:"name is required"})
        }
        if(!email){
            return res.status(400).send({status:false,message:"email is required"})
        }
        if(!mobile){
            return res.status(400).send({status:false,message:"mobile is required"})
        }
        if(!collegeName){
            return res.status(400).send({status:false,message:"collegeName is required"})
        }
        details.collegeName=collegeName.toLowerCase()
        collegeName=details.collegeName
        
        if(!isEmpty(name)){
            return res.status(400).send({status:false,message:"name can't be empty"})
        }
        if(!isEmpty(email)){
            return res.status(400).send({status:false,message:"eamil  can't be empty"})
        }
        if(!isEmpty(mobile)){
            return res.status(400).send({status:false,message:"mobile can't be empty"})
        }
        if(!isEmpty(collegeName)){
            return res.status(400).send({status:false,message:"collegeName  can't be empty"})
        }
        if(!isValidName(name)){
            return res.status(400).send({status:false,message:"please enter valid name"})
        }
        if(!isValidEmail(email)){
            return res.status(400).send({status:false,message:"please enter valid email"})
        }
        if(!isValidMobile(mobile)){
            return res.status(400).send({status:false,message:"please enter valid mobile"})
        }
        
       let findIntern= await internModel.findOne({$or:[{email:email},{mobile:mobile}]})
       if(findIntern){
        return res.status(400).send({status:false,message:"intern already exist"})
       }
       let findCollege= await collegeModel.findOne({$or:[{name:collegeName},{fullName:collegeName}]},{isDeleted:false})
       if(!findCollege){
        return res.status(404).send({status:false,message:"college not found"})
       }
       
       req.body.collegeId=findCollege._id

       let createdIntern= await internModel.create(details)
       return res.status(201).send({status:true,data:createdIntern})
    }
    catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}



module.exports.applyIntern=applyIntern



