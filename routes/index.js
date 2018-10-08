var express = require('express');
var router = express.Router();
var courses = require('../dal/courses');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

router.get('/departmentsMain/:departmentShortCode', function(req, res){
  console.log("Inside department short code")
  let deptShortCode = req.params.departmentShortCode;
  res.render('departmentsMain', {deptShortCode: deptShortCode});
})

router.get('/departmentsMainIT', function(req, res){
  console.log("Inside IT Department Route");
  res.render("itDeptMain", {});
});
module.exports = router;
