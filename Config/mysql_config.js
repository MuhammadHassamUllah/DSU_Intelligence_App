let mySql = require('mysql');

let connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatever123',
    database: 'CBA_LMS_MERGE',
});

connection.connect(function(err){
    if(err){
        console.log("Error: Connection to MySql failed");
        return;
    }
    
    console.log("Connection to MySql successfull");
})

module.exports = connection;