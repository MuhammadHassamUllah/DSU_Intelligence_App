let moodle_client = require("/home/sony/DSU_Intelligence_App/Config/moodle_config.js");

class MoodleUser{
    constructor(){}

    manualCreateSingleUser(usersArr){
        console.log("Inside user creation");
        return new Promise(function(resolve, reject){
            //Call moodle manual student enrollment web service
            moodle_client.call({
                wsfunction: "core_user_create_users",
                arguments: {
                    users: usersArr
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
    }//end manualCreateSingleUser
}

module.exports = MoodleUser;