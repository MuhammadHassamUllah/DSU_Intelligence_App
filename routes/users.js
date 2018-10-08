var express = require('express');
var router = express.Router();
var courses = require('../dal/courses');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let courses = new courses();
  res.send('respond with a resource');
});

module.exports = router;
