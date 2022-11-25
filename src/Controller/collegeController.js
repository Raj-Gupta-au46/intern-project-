const validation= require("../validator/validation")
const collegeModel = require("../models/collegeModel")
const internModel= require('../Models/internModel')

const  {isEmpty, isValidName}= validation


//.....................................Post Api For College  ........................................


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
   data.name=name.toLowerCase()
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
    let findCollege= await collegeModel.findOne({name:name})
    if(findCollege){  
      return res.status(400).send({status:false,message:"college is already present "})
    }
   
   let collegeCreated= await collegeModel.create(data)
   return res.status(201).send({status:true,data:collegeCreated})

}
catch(error){
    res.status(500).send({status:false,message:error.message})
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

           if(interns.length==0) return res.status(404).send({status: false, message: "no intern are there"})

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
module.exports.createCollege=createCollege


 