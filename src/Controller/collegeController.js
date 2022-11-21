const collegeModel= require('../Models/collegeModel')


const createCollege= async function (req, res){
    try{

    }
    catch(error){
        res.status(500).send({status:false, message: error.message})
    }
}


module.exports.createCollege=createCollege
































