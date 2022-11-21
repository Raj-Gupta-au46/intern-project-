const internModel= require('../Models/internModel')


const applyIntern= async function (req, res){
    try{
        let details= req.body
        if(Object.keys(details).length==0){
            res.status(400).send({status:false,message:"Please enter the body in request."})
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






















