let courses = require('../dal/courses.js');

class coursesBll {
    constructor(){
        this.getAllCoursesInCbaNotInLms = this.getAllCoursesInCbaNotInLms.bind(this);
    }

    getAllCoursesInCbaNotInLms(semester){
        var course = new courses();
        return new Promise(function(resolve, reject){
            console.log("\n\n\n\n inside Promise");
            course.getAllCoursesInCbaNotInLms(semester, function(err, result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    }
    
    getDeptCoursesInCbaNtInLms(departmentTitle, semester){
        var course = new courses();
        return new Promise(function(resolve, reject){
            course.getDeptCoursesInCbaNtLms(departmentTitle, semester, function(err, result){
                if(err){
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = coursesBll;