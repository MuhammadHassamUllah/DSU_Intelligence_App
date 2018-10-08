var express = require('express');
var router = express.Router();
var courses = require('../dal/courses.js');
var coursesBll = require('../bll/coursesBll.js');


router.get('/IT',function(req, res){
    console.log("Inside courses/IT route");
    res.render('courses/itCoursesDetails', {});
})

router.get('/inCbaNotInLms/:departmentShortCode', function(req, res){
    let course = new coursesBll();
    let departmentShortCode = req.params.departmentShortCode;

    course.getDeptCoursesInCbaNtInLms(departmentShortCode, "Fall 2018")
    .then(function(result){
        res.render('courses/courses', {courses: result});
    })
    .catch(function(err){
        res.render('error', {error: err});
    })
    /*
    course.getDeptCoursesInCbaNtLms(departmentShortCode, function(result){
        console.log("Get Dept Courses In CBA Not In LMS Route Executed");
        res.render('courses/courses', {courses: result});
    })*/
})

router.get('/allInCbaNotInLms', function(req, res){
    let courseBll = new coursesBll();

    courseBll.getAllCoursesInCbaNotInLms("Fall 2018")
    .then((result) => {
        res.render('courses/courses', {courses: result})
    })
    .catch((err) => {
        console.log(err);
        res.render('error', {error: err})
    })

})

router.get('/inLmsNotInCba/:departmentShortCode', function(req, res){
    let departmentShortCode = req.params.departmentShortCode;

    course.getDeptCoursesInLmsNotInCba();
})

router.get('/department/:departmentShortCode', function(req, res){
    let departShortCode = req.params.departmentShortCode;
    
    res.render('courses/coursesDetails', {departShortCode: departShortCode});
})

module.exports = router;