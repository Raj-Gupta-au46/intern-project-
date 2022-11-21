const validation= require("../validator/validation")
const collegeModel = require("../models/collegeModel")
const  {isEmpty, isValidName,}= validation


//....................................................... Post Api For College Details ...........................................................


const createCollege= async function(req,res){
    try{
   let data= req.body
   if(Object.keys(data).length==0){
   return res.status(400).send({status:false,message:"data is not present"})
   }
   const{name,fullName,logoLink}=data
   if(!name){
   return res.status(400).send({status:false,message:"name is required"})
   }
   if(!fullName){
   return res.status(400).send({status:false,message:"fullName is required"})
   }
   if(!logoLink){
   return res.status(400).send({status:false,message:"logoLink is required"})
   }
   if(!isEmpty(name)){
       return res.status(400).send({status:false,message:"name can't be empty"})
    }
    if(!isValidName(name)){
         return res.status(400).send({status:false,message:"please enter valid name"})
        }
     if(!isEmpty(fullName)){
        return res.status(400).send({status:false,message:"fullName can't be empty"})
     }   
     
   
   let collegeCreated= await collegeModel.create(data)
   return res.status(201).send({status:true,data:collegeCreated})

}
catch(error){
    res.status(500).send({status:false,message:error.message})
}
}


module.exports.createCollege=createCollege





























