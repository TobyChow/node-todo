var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');

// use ES6 Promises instead of mongoose's deprecated promise
mongoose.Promise = global.Promise;

// Schema
var todoSchema = new mongoose.Schema({
	item:String
})
// Model
var Todo = mongoose.model('Todo', todoSchema)

// connect to db
let uri = "mongodb://chat:chat@ds117821.mlab.com:17821/chat";
mongoose.connect(uri)
mongoose.connection.once('open',() => {
  console.log('clearing db');
  mongoose.connection.collections.todos.drop()
  console.log('adding default items');
  var itemOne = Todo({item:'poop'}).save();
})

module.exports = (app) => {

  app.get('/todo', (req, res) => {
  	// get data from db and pass it to view
  	// .find get all items if no param is provided
  	Todo.find({}, (err, data) => {
  	  if(err) throw err;
  	  res.render('todo', {todo:data});
  	}) 
  })
  // req.body is the data obj sent (ex: {item:"walk dog"} )
  app.post('/todo', urlencodedParser, (req, res) => {
  	var newTodo = Todo(req.body).save((err, data) => {
  	  res.json(data) // returns data to 'success' of ajax request
  	});	
  })
  app.delete('/todo/:item', (req, res) => {
  	// replace hyphens with space, 
  	Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
  	  if (err) throw err;
  	  res.json(data);
  	});
  })
}
