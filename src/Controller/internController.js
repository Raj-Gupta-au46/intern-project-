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
            return res.status(400).send({status:false,message:"name is can't be empty"})
        }
        if(!isEmpty(email)){
            return res.status(400).send({status:false,message:"eamil is can't be empty"})
        }
        if(!isEmpty(mobile)){
            return res.status(400).send({status:false,message:"mobile is can't be empty"})
        }
        if(!isEmpty(collegeName)){
            return res.status(400).send({status:false,message:"collegeName is can't be empty"})
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


//................................ Get Api for college details with query params ...........................................................


const collegeDetails= async function (req, res){
    try{
        const filter = req.query
        if(filter.collegeName && Object.keys(filter).length === 1){
            let checkCollege = await collegeModel.findOne ({ name: filter.collegeName.toLowerCase()})
            if (!checkCollege) return res.status(404).send({ status: false, message: "collegeName not found"})

            const { name, fullName, logoLink} = checkCollege

            const interns = await internModel.find({ collegeId: checkCollege._id}).select({name: 1,email: 1 , mobile: 1})

            if(interns.length == 0) return res.status(404).send({status: false, message: "no intern are there"})

            const data ={ name,fullName, logoLink ,interns}
        
            return res.status(200).send({status: true, count: interns.length, data: data})
         }
         return res.status(400).send({status: false, message: "Please provide filter and it should be collegeName only"})

    }
    catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}


module.exports.collegeDetails= collegeDetails
module.exports.applyIntern=applyIntern










//if(details.collegeName=collegeName.toLowerCase()){
//     return res.status(400).send({status:false,message:"collegeName should be in lowercase "})
// }
// collegeName=details.collegeName











