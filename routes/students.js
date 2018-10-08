let express = require('express');
let router = express.Router();
let studentEnrollments = require('../dal/studentEnrollmentDAL.js');


router.get('/', function(req, res){
    let studentEnroll = new studentEnrollments();
    studentEnroll.getStdEnrInCbaNotInLms("Fall 2018", function(result){
        res.render('student_enrollments', {studentEnrollments: result});
    })
})

router.get('/enrollments/:departmentShortCode', function(req, res){
    console.log("Inside /students/enrollments/departmentShortCode route");
    let departmentShortCode = req.params.departmentShortCode;
    res.render('students/studentDetails', {departShortCode: departmentShortCode});
})

router.get('/enrollments/inCbaNotInLms/:departmentShortCode', function(req, res){
    console.log("Inside /students/enrollments/departmentShortCode route");
    
    let studentEnroll = new studentEnrollments();
    studentEnroll.getStdEnrInCbaNotInLms("Fall 2018", function(result){
        res.render('students/student_enrollments', {studentEnrollments: result, in: "Cba", notIn: "Lms"});
    })

})

module.exports = router;