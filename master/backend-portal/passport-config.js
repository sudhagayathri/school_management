const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('./config/db_config.js');

function initialize(passport, getUserByEmail, getUserById) {
	var data = null
	const authenticateUser = async (email, password, done) => {
	//for register serialize
	var user = getUserByEmail(email);
	var id = getUserById(id);
	db.selectDB('UserDB');
	if(typeof email !== "undefined")
	{
		var query = "select * from UserCredentials WHERE registrationId = '"+email+"' ";
		const y = await db.runQuery(""+query+"", async function(rows)
		{
			if (rows.length) {
				var string=JSON.stringify(rows);
				data = JSON.parse(string);
				var correctpasswd =  data[0].password
				 try {
					 const iscorrectpwd = await bcrypt.compare(password, correctpasswd);
					if (iscorrectpwd) {
			    	  return done(null, user)
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
  passport.serializeUser(function(user, done){
	  done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
	  return done(null, id)
  })
}

module.exports = initialize