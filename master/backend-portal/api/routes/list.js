const express = require('express');
const router = express.Router();
const db = require('../../config/db_config.js');

router.get('/student', function(req, res) {  
	var student = req.query;
	var query = "select registrationId, name, contactNumber, class, section from StudentDetails ORDER BY id desc LIMIT 50";
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

router.get('/teacher', function(req, res) {  
	var student = req.query;
	var query = "select registrationId, name, contactNumber,specialisedSubject, class from TeacherDetails ORDER BY id desc LIMIT 50";
	db.selectDB('UserDB');
	db.runQuery(""+query+"", function(rows)
	{
		if (rows.length) {
			res.send(rows);
		} else {
			res.send("No Teacher found !!");
		}
	});
});

module.exports = router;