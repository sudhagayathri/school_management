const express = require('express');
const router = express.Router();
const db = require('../../config/db_config.js');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});
const fileFilter = (req, file, callback)=>{
    //reject filter
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        callback(null, true);
    }
    else{
        callback(null, false);  //in place of null, we can pass msg new Error('msg')
    }
};

//const upload  = multer({dest: 'uploads/'});     First time remove comment.It will make automatically uploads folder
												// Otherwise manually we can make uploads folder
												// then refresh the backend-portal

const upload = multer({                         //comment this for first time, after making folder remove the comment
    storage: storage, 
    limits:{
        fileSize: 1024 *1024 *4
    },
    fileFilter: fileFilter
});


// to get all student url should be "http://localhost:8086/student?name=ani"
// or "http://localhost:8086/student?id=1"
router.get('/', function(req, res) {  
	var student = req.query;
	var query = "select * from StudentDetails ";
	if(typeof student.id !== "undefined")
	{
		query += "WHERE id = "+student.id+" ";
	}
	else if(typeof student.name !== "undefined")
	{
		query += "WHERE name like '%"+student.name+"%' ";
	}
	
	db.selectDB('UserDB');
	db.runQuery(""+query+"", function(rows)
	{
		if (rows.length) {
			res.send(rows);
		} else {
			res.send("No student found !!");
		}
	});
});

//except get request for all request url will be http://localhost:8086/student/1 
router.post('/',upload.single("photo"), function(req, res){
	var registrationId = req.body.registrationId;
	var name = req.body.name;
	var address = req.body.address;
	var dateofBirth = req.body.dateofBirth;
	var contactNumber = req.body.contactNumber;
	var s_class = req.body.s_class;
	var section = req.body.section;
	var parentName = req.body.parentName;
	var photo = req.file.path;
	var classTeacher = req.body.classTeacher;
	db.selectDB('UserDB');
	var query = "INSERT INTO StudentDetails (`registrationId`, `name`, `address`, `dateofBirth`,`contactNumber`, `class`, `section`, `parentName`, `photo`, `classTeacher`) "+
	             "VALUES('"+registrationId+"', '"+name+"', '"+address+"','"+dateofBirth+"', '"+contactNumber+"', '"+s_class+"', '"+section+"', '"+parentName+"', '"+photo+"', '"+classTeacher+"')"
		
	db.runQuery(query, function(rows) {
		if (rows["state"] == "ok") {
			res.send("Query executed successfully!!");
		} else {
			res.send("Not able to create student!!");
		}
	});
});

router.patch('/:studentId', upload.single("photo"), function(req, res){
	var id = req.params.studentId;
	var registrationId = req.body.registrationId;
	var name = req.body.name;
	var address = req.body.address;
	var dateofBirth = req.body.dateofBirth;
	var contactNumber = req.body.contactNumber;
	var s_class = req.body.s_class;
	var section = req.body.section;
	var parentName = req.body.parentName;
	var photo = req.file.path;
	var classTeacher = req.body.classTeacher;
	var query = "UPDATE StudentDetails SET "+
				"`registrationId` = '"+registrationId+"', "+
				"`name` = '"+name+"', "+
				"`address` = '"+address+"', "+
				"`dateofBirth` = '"+dateofBirth+"', "+
				"`contactNumber` = '"+contactNumber+"', "+
				"`class` = '"+s_class+"', "+
				"`section` = '"+section+"', "+
				"`parentName` = '"+parentName+"', "+
				"`photo` = '"+photo+"', "+
				"`classTeacher` = '"+classTeacher+"' "+
				"WHERE id = '"+id+"';";
	
	db.runQuery(query, function(rows) {
		if (rows["state"] == "ok") {
			res.send("Query executed successfully!!");
		} else {
			res.send("Not found student's record!!");
		}
	});
});

router.delete('/:studentId', function(req, res) {
	var id = req.params.studentId;
	db.selectDB('UserDB');
	db.runQuery("DELETE from StudentDetails WHERE id = "+id+"", function(rows) {
		if (rows["state"] == "ok") {
			res.send("Query executed successfully!!");
		} else {
			res.send("No students found !!");
		}
	});
});

module.exports = router;