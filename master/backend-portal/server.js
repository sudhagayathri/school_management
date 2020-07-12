const http = require('http');
const app = require('./index');
 
const port = process.env.PORT||8086;    //while running, if it is showing error, then change port number
var server= http.createServer(app);
server.listen(port);
