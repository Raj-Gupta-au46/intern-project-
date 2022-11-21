const internModel= require('../Models/internModel')


const applyIntern= async function (req, res){
    try{

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






















