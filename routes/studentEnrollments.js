let express = require('express');
let router = express.Router();
let studentEnrollments = require('../dal/studentEnrollmentDAL.js');

router.get('/', function(req, res){
    let studentEnroll = new studentEnrollments();
    studentEnroll.getStdEnrInCbaNotInLms("Fall 2018", function(result){
        res.render('student_enrollments', {studentEnrollments: result});
    })
})

module.exports = router;