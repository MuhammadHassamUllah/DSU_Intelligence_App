var express = require('express');
var router = express.Router();
var courses = require('../dal/courses');
let MoodleUser = require('../moodle_web_services/users/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let courses = new courses();
  res.send('respond with a resource');
});

router.get('/createUser', function(req, res, next){

  console.log("Inside create user route");
  let moodleUser = new MoodleUser();
  let usersArr = [];

  usersArr.push({
    username: "cs141094",
    password: 1234,
    firstname: "Muhammad",
    lastname: "hassam",
    email: "cs141094@dsu.edu.pk"
  });

  console.log("Before LMS Api");
  moodleUser.manualCreateSingleUser(usersArr)
  .then(function(success){
    console.log("User successfully created in LMS");
  }).catch(function(err){
    console.log("There is error in creating user");
    console.log(err);
  });
})

router.get('/deleteUser', function(req, res){
  
})
module.exports = router;
