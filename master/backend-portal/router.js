var express = require('express');
var router = express.Router();

//Different routes
const studentRoutes = require('./api/routes/student');
const teacherRoutes = require('./api/routes/teacher');

router.use('/student', studentRoutes);
router.use('/teacher', teacherRoutes);

module.exports = router;