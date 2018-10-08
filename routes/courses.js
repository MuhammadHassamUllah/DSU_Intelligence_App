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
        res.render('courses/courses', {courses: result, in: "Cba", notIn: "Lms"});
    })
    .catch(function(err){
        res.render('error', {error: err});
    })
})

router.get('/allInCbaNotInLms', function(req, res){
    let courseBll = new coursesBll();

    courseBll.getAllCoursesInCbaNotInLms("Fall 2018")
    .then((result) => {
        res.render('courses/courses', {courses: result,  in: "Cba", notIn: "Lms"})
    })
    .catch((err) => {
        console.log(err);
        res.render('error', {error: err})
    })

})

router.get('/allInLmsNotInCba', function(req, res){
    let courseBll = new coursesBll();

    courseBll.getAllCoursesInLmsNotInCba("Fall 2018")
    .then(function(result){
        res.render('courses/courses', {courses: result,  in: "Lms", notIn: "Cba"})
    })
})

router.get('/inLmsNotInCba/:departmentShortCode', function(req, res){
    console.log("\n\n\n inside lms not in CBA");
    let departmentShortCode = req.params.departmentShortCode;
    
    console.log("\n\n\n\n\n", departmentShortCode);
    let courseBll = new coursesBll();
    
    courseBll.getDeptCoursesInLmsNotInCba(departmentShortCode, "Fall 2018")
    .then(function(result){
        res.render('courses/courses', {courses: result, in: "Lms", notIn: "Cba"});
    })
    .catch(function(err){
        res.render('error', {error: err});
    })
})

router.get('/department/:departmentShortCode', function(req, res){
    let departShortCode = req.params.departmentShortCode;
    
    res.render('courses/coursesDetails', {departShortCode: departShortCode});
})

module.exports = router;