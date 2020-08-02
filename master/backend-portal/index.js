//It loads all environment variables and set inside process.env
require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/db_config.js');
const initializepassport = require('./passport-config');
const router = require('./router');

const bodyParser = require('body-parser');

initializepassport(
		passport,
		email => users.find(user => user.email === email),
		id => users.find(user => user.id === id)
);

//Different routes
const studentRoutes = require('./api/routes/student');
const teacherRoutes = require('./api/routes/teacher');
const listRoutes 	= require('./api/routes/list');

const users =[]
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/list', listRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/',router );

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
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
app.get('/', checkAuthenticated, function(req, res) {
	res.render('index.ejs');
});
app.get('/login', function(req, res) {
	res.render('login.ejs')
});

app.post('/login', function(req, res, next){ //Testing callback.
	const { email, password } = req.body;
	const hashedPassword = bcrypt.hash(req.body.password, 10);
	users.push({
		id: Date.now().toString(),
		email:req.body.email,
		password:hashedPassword
	});
	passport.authenticate('local',function(err, user,info){
		if (!user) return res.send(info)
		else if(err) return res.send(err)
		else{
	      req.login(user, function (err) {  //req.login is called to establish session if custom callback is used
	    	  if(err) {
	            console.log(err);
	            return;
	          }
	          return res.send(user)
	      });
		}
	})(req,res,next)
});

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
		//put this after query run
		db.selectDB('UserDB');
		var query = "SELECT id FROM UserCredentials WHERE registrationId = '"+req.body.email+"' ";
		const x= await db.runQuery(""+query+"",function(rows)
		{
			if (rows.length) {
				return res.send("You have already registered. <a href='/login'>Login here</a>")
			}
			var query = "INSERT INTO UserCredentials (`registrationId`, `password`) "+
			             "VALUES('"+req.body.email+"', '"+hashedPassword+"')"

			db.runQuery(query, function(rows) {
				if (rows["state"] == "ok") {
					//res.send("Query executed successfully!!");
				} else {
					res.send("Not able to create student!!");
				}
			});
			req.flash('success_msg','You are registered.Now Login!')
			res.redirect('/login');
		})
	}
	catch{
		res.redirect('/register');
	}
});

app.get('/logout', async (req, res) => {
  await req.logOut();
  return res.send('Success !!');
})

app.get('/authenticate', function(req,res){
	if(req["user"]){
		res.send(true)
	}
	else{
		res.send(false)
	}
})
function checkAuthenticated(req, res, next){
	if(req.isAuthenticated()){ //passport js inbuilt fn
		return next();
	}
	res.redirect('/login')
}
module.exports = app;
