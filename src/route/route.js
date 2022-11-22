const express = require('express')
const router= express.Router()
const collegeController= require('../Controller/collegeController')
const internController= require('../Controller/internController')


//.......................................... Post Api For College Entry ........................................................


router.post('/functionup/colleges', collegeController.createCollege)


//.......................................... Post Api For Intern Entry ........................................................


router.post('/functionup/interns', internController.applyIntern)


//.......................................... Get Api For College Details ........................................................


router.get('/functionup/collegeDetails', internController.collegeDetails)




module.exports= router