//includes router for /getTeachers

const express = require('express');
const db = require('./../../config/db_config.js');

const router = express.Router();
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

//to get all Teacher url should be "http://localhost:8086/teacher?name=ani"
//or "http://localhost:8086/teacher?id=1"
router.get('/', function(req, res) {  
	var teacher = req.query;
	var query = "select * from TeacherDetails ";
	if(typeof teacher.id !== "undefined")
	{
		query += "WHERE id = "+teacher.id+" ";
	}
	else if(typeof teacher.name !== "undefined")
	{
		query += "WHERE name like '%"+teacher.name+"%' ";
	}
	
	db.selectDB('UserDB');
	db.runQuery(""+query+"", function(rows)
	{
		if (rows.length) {
			res.send(rows);
		} else {
			res.send("No teacher found !!");
		}
	});
});

////except get request for all request url will be http://localhost:8086/teacher/1
router.post('/',upload.single("photo"), function(req, res){
	console.log(req.file);
	var registrationId = req.body.registrationId;
	var name = req.body.name;
	var address = req.body.address;
	var dateofBirth = req.body.dateofBirth;
	var contactNumber = req.body.contactNumber;
	var designation = req.body.designation;
	var qualification = req.body.qualification;
	var specialisedSubject = req.body.specialisedSubject;
	var photo = req.file.path;
	var TeacherDetailscol = req.body.TeacherDetailscol;
	var type = req.body.type;
	
	db.selectDB('UserDB');
	var query = "INSERT INTO TeacherDetails (`registrationId`, `name`,dateOfBirth, `address`,`contactNumber`, `designation`, `qualification`, `specialisedSubject`, `type`, `TeacherDetailscol`) "+
	             "VALUES('"+registrationId+"', '"+name+"','1996-05-05', '"+address+"', '"+contactNumber+"', '"+designation+"', '"+qualification+"', '"+specialisedSubject+"', '"+type+"', '"+TeacherDetailscol+"')"

	db.runQuery(query, function(rows) {
		if (rows["state"] == "ok") {
			res.send("Query executed successfully!!");
		} else {
			res.send("Not able to create teacher !!");
		}
	});
});


module.exports=router;