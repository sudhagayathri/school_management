const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('./config/db_config.js');

function initialize(passport, getUserByEmail, getUserById) {
	var data = null
  const authenticateUser = async(email, password, done) => {
	console.log(email)
	db.selectDB('UserDB');
	if(typeof email !== "undefined")
	{
		var query = "select * from UserCredentials WHERE registrationId = '"+email+"' ";
		console.log("query=")
		console.log(query)
		db.runQuery(""+query+"", function(rows)
		{
			if (rows.length) {
				console.log("registrationi id")
				console.log(typeof rows)
				console.log(rows)
				var string=JSON.stringify(rows);
				data = JSON.parse(string);
				var correctpasswd =  data[0].password
				console.log(data[0].registrationId)
				 try {
			      if (bcrypt.compare(password, correctpasswd)) {
			    	  console.log("inisde correct")
			        return done(null, data)
			      } 
			      else {
			        return done(null, false, { message: 'Password incorrect' })
			      }
			      
			    } catch (e) {
			      return done(e)
			    }
			} else {
				return done(null, false, { message: 'No user with that email' })
			}
		});
	}
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  if(data != null){
	  var user = data[0]
	  passport.serializeUser((user, done) => done(null, user.id))
	  passport.deserializeUser((id, done) => {
	    return done(null, getUserById(id))
	  })
  }
}

module.exports = initialize