var moodleClient = require("moodle-client");
var winston = require("winston");

class MoodleStudent{
    constructor(){

    }

    enrollStudentInLms(){
        return new Promise(function(resolve, reject){
            console.log("Lms promise started");

            //Instantiate the winston logger
            var logger = winston.createLogger({
                level: "debug",
                format: winston.format.simple(),
                transports: [
                    new winston.transports.Console()
                ]
            });

            let init = moodleClient.init({
                logger: logger,
                wwwroot: "http://localhost:8080/moodle",
                token: "169189634f2338ef8244a3d428c28219",
                service: "enroll_student"
            });
            
            init.then(function(client){
                //Perform all the operations after successful connection
                console.log(client.error);
                return client.call({
                    wsfunction: "enrol_manual_enrol_users",
                    method: "POST",
                    args: {
                        roleid: 3,
                        userid: 3,
                        courseid: 4
                    }
                }).then(function(enrollSuccess){
                    console.log("Student Enrolled Successfully" + enrollSuccess);
                    resolve("Student Enrolled Successfully" + enrollSuccess);
                })
            })
            .catch(function(err){
                console.log(err);
                reject(err);
            })        
        });
    }
}

module.exports = MoodleStudent;