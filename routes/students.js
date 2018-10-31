let express = require('express');
let router = express.Router();
let studentEnrollments = require('../dal/studentsDAL.js');
let studentEnrollBll = require('../bll/studentEnrollmentsBll.js');
let MoodleCourse = require('../moodle_web_services/courses/course.js');

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
    
    let studentEnroll = new studentEnrollBll();
    let departmentShortCode = req.params.departmentShortCode;
    studentEnroll.getAllStdEnrInCbaNotInLms("Fall 2018")
    .then(function(result){
        res.render('students/student_enrollments', {studentEnrollments: result, in: "Cba", notIn: "Lms"});
    })
    .catch(function(err){
        res.render('error', {error: err});
    })
    
})


router.get('/enroll', function(req, res){

    moodleCourse = new MoodleCourse();

    moodleCourse.manualEnrolSingleStdnt(5, 3, 4)
    .then(function(success){
        console.log("Enrollment Successful");
        console.log(success);
        res.render("index");
    }).catch(function(err){
        console.log(err);
        console.log("Enrollment Un Successful");
        res.render("index");
    })
})

    router.get('/multEnroll', function(req, res){
        let enrollments = [];
        
        moodleCourse = new MoodleCourse();

        enrollments.push({
            roleid: 5,
            courseid: 4,
            userid: 3
        });

        console.log("Before course enrollment")
        moodleCourse.manualUnEnrolMultStdnt(enrollments)
        .then(function(success){
            console.log("Enrollment Successful");
            console.log(success);
            res.render("index");
        }).catch(function(err){
            console.log(err);
            console.log("Enrollment Un Successful");
            res.render("index");
        })
    })


module.exports = router;