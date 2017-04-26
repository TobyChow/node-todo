var express = require('express')
var todoController = require('./controllers/todoController');

var app = express();

//set view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'))

//fire controllers (pass app to controllers, so we can use things like app.get)
todoController(app);

//listen to port
app.listen(3000);
console.log(`listening to port 3000`);