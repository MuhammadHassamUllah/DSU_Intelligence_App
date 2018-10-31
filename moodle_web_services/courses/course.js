let moodle_client = require("/home/sony/DSU_Intelligence_App/Config/moodle_config.js"); //Npm module to interact with moodle web services

class MoodleCourses {
    constructor(){
    }

    /*
        This function will enroll a student to a 
        particular course with specified role
        
    */
    manualEnrolSingleStdnt(roleId, userId, courseId){
        console.log("Inside manual enrollments");
        return new Promise(function(resolve, reject){
            //Call moodle manual student enrollment web service
            moodle_client.call({
                wsfunction: "enrol_manual_enrol_users",
                arguments: {
                    enrolments: [
                        {
                            roleid: roleId,
                            userid: userId,
                            courseid: courseId
                        }
                    ] 
                },
                settings: {
                    method: "POST"
                }
            }, function(error, data){
                if(error){
                    //Return error 
                    reject(error);
                }else{
                    //return successful enrollment message
                    resolve(data);
                }
            })
        })
        
    }// end enrolStdntsManual


    /*
        This function will enroll multiple students to a 
        particular course with specified role
        
    */
    manualEnrolMultStdnt(enrollmentsArr){
        return new Promise(function(resolve, reject){
            //Call moodle manual student enrollment web service 
            moodle_client.call({
                wsfunction: "enrol_manual_enrol_users",
                arguments: {
                    enrolments: enrollmentsArr //Pass enrollment data array
                },
                settings: {
                    method: "POST"
                }
            }, function(error, data){
                if(error){
                    //Return error 
                    reject(error);
                }else{
                    //return successful enrollment message
                    resolve(data);
                }
            })
        });
    } //end manualEnrolMultStdnt


    /*
        This function will un enroll single student from a 
        particular course with specified role
        
    */
   manualUnEnrolSingleStdnt(roleId, userId, courseId){
    console.log("Inside manual enrollments");
    return new Promise(function(resolve, reject){
        //Call moodle manual student enrollment web service
        moodle_client.call({
            wsfunction: "enrol_manual_unenrol_users",
            arguments: {
                enrolments: [
                    {
                        roleid: roleId,
                        courseid: courseId,
                        userid: userId
                    }
                ] 
            },
            settings: {
                method: "POST"
            }
        }, function(error, data){
            if(error){
                //Return error 
                reject(error);
            }else{
                //return successful Un enrollment message
                resolve(data);
            }
        })
    })
   } //end manualUnEnrolSingleStdnt

   manualUnEnrolMultStdnt(unEnrollmentArr){
    console.log("Inside manual enrollments");
    return new Promise(function(resolve, reject){
        //Call moodle manual student un enrollment web service
        moodle_client.call({
            wsfunction: "enrol_manual_unenrol_users",
            arguments: {
                enrolments: unEnrollmentArr
            },
            settings: {
                method: "POST"
            }
        }, function(error, data){
            if(error){
                //Return error 
                reject(error);
            }else{
                //return successful Un enrollment message
                resolve(data);
            }
        })
    })
   }//end manualUnEnrolMultStdnt


   createCourse(coursesArr){
        console.log("Inside course creation");
        return new Promise(function(resolve, reject){
            //Call moodle manual student enrollment web service
            console.log("Inside moodle promise");
            moodle_client.call({
                wsfunction: "core_course_create_courses",
                arguments: {
                    courses: [
                        {
                            fullname: "Fruit Chat",
                            shortname: "FC-F18",
                            categoryid: 4
                        }
                    ] 
                },
                settings: {
                    method: "POST"
                }
            }, function(err, data){
                if(err){
                    reject(err);
                }else{
                    //return successful course creation message
                    resolve(data);
                }
            })
        })
     }//end createCourse
} 

module.exports = MoodleCourses;