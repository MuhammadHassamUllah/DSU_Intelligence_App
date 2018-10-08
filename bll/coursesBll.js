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

    getAllCoursesInLmsNotInCba(semester){
        var course = new courses();
        
        return new Promise(function(resolve, reject){
            course.getAllCoursesInLmsNotInCba(semester, function(err, result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    }

    getDeptCoursesInLmsNotInCba(departmentTitle, semester){
        let lmsDeptTitle;
        var course = new courses();

        switch(departmentTitle){
            case "CS":
                lmsDeptTitle = "Computer Science"
                break;
            case "ME":
                lmsDeptTitle = "Mechanical Engineering"
                break;
            case "EE":
                lmsDeptTitle = "Electrical Engineering"
                break;    
            case "MS":
                lmsDeptTitle = "Management Sciences"
        }

        return new Promise(function(resolve, reject){
            course.getDeptCoursesInLmsNotInCba(lmsDeptTitle, semester, function(err, result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
    }
}

module.exports = coursesBll;