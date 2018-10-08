var express = require('express');
var router = express.Router();
var courses = require('../dal/courses.js');

/*
router.get('/', function(req, res){
    let course = new courses();
    course.getAllCoursesInCbaNotInLms(function(result){
        console.log('Inside courses route');
        //res.send(result);
        res.render('courses', {courses: result});
    });

});
*/

router.get('/IT',function(req, res){
    console.log("Inside courses/IT route");
    res.render('courses/itCoursesDetails', {});
})

router.get('/inCbaNotInLms/:departmentShortCode', function(req, res){
    let course = new courses();
    let departmentShortCode = req.params.departmentShortCode;

    course.getDeptCoursesInCbaNtLms(departmentShortCode, function(result){
        console.log("Get Dept Courses In CBA Not In LMS Route Executed");
        res.render('courses/courses', {courses: result});
    })
})

router.get('/allInCbaNotInLms', function(req, res){
    let course = new courses();

    course.getAllCoursesInCbaNotInLms(function(result){
        res.render('courses/courses', {courses: result})
    })
})

router.get('/inLmsNotInCba/:departmentShortCode', function(req, res){
    let departmentShortCode = req.params.departmentShortCode;

    course.getDeptCoursesInLmsNotInCba();
})

router.get('/department/:departmentShortCode', function(req, res){
    let departShortCode = req.params.departmentShortCode;

    console.log("\n\n\n\n\n inside course details");
    res.render('courses/coursesDetails', {departShortCode: departShortCode});
})

module.exports = router;