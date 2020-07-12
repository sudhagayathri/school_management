//It loads all environment variables and set inside process.env
require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session'); 
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/db_config.js');
const initializepassport = require('./passport-config');
const bodyParser = require('body-parser');

initializepassport(
		passport,
		email => users.find(user => user.email === email),
		id => users.find(user => user.id === id)
);

//Different routes
const studentRoutes = require('./api/routes/student');
const teacherRoutes = require('./api/routes/teacher');

const users =[]

app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
	secret:"secret",
	resave:false,
	saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, x-Requested-with, content-Type, Accept, Authorization");
  if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next();
});


app.get('/health-check', function(req, res) {
	res.send('Success !!');
});
//views
app.get('/', function(req, res) {
	res.render('index.ejs');
});
app.get('/login', function(req, res) {
	res.render('login.ejs')
});
app.post('/login', passport.authenticate('local',{
	successRedirect  :'/',
	failureRedirect : '/login',
	failureFlash : true
}));
app.get('/register', function(req, res) {
	res.render('register.ejs')
});
app.post('/register',async(req,res)=>{
	try{
		const { email, password } = req.body;
		
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			email:req.body.email,
			password:hashedPassword
		});
		console.log("inside register")
//		db.selectDB('UserDB');
//		var query = "INSERT INTO UserCredentials (`registrationId`, `password`) "+
//		             "VALUES('"+req.body.email+"', '"+hashedPassword+"')"
//			
//		db.runQuery(query, function(rows) {
//			if (rows["state"] == "ok") {
//				res.send("Query executed successfully!!");
//			} else {
//				res.send("Not able to create student!!");
//			}
//		});
//		req.flash('success_msg','You are registered.Now Login!')
		res.redirect('/login');
	}
	catch{
		res.redirect('/register');
	}
});
module.exports = app;