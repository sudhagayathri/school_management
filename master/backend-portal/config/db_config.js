const mysql = require('mysql');
const port = 3306;

var connection = mysql.createConnection({
	  host: 'localhost',
	  port: 3306,
	  user: 'root',
	  password: '#Welcome@123',
	  database: 'UserDB',
	  insecureAuth : true
});
connection.connect(function(err) {
	if (err) {
        throw err;
    }
	console.log("Connection established !!");
});
var selectDB = function(dbName){
	connection.changeUser({database : dbName}, function(err) {
		  if (err) throw err;
	});
}
var runQuery = function(query, callback){
	connection.query(query, function(err, rows){
		if (err) throw err;
		rows["state"] = "ok";
		callback(rows);
	});
}
module.exports = {
	connection: connection,
	selectDB: selectDB,
	runQuery: runQuery
}
