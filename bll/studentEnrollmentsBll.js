var students = require('../dal/studentsDAL.js');

class studentEnrollmentsBll{
    constructor(){}
    
    getAllStdEnrInCbaNotInLms(semester){
        let student = new students();

        return new Promise(function(resolve, reject){
            student.getAllStdEnrInCbaNotInLms(semester, function(err, result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    }
}

module.exports = studentEnrollmentsBll;