var express=require("express");
var bodyParser=require("body-parser");
//mongodb://localhost:27017
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/');
//mongoose.connect('mongodb://localhost:27017/usersdb');
mongoose.connect('mongodb+srv://Rashigupta:Rashi123@cluster0.zrpu3ec.mongodb.net/placement?retryWrites=true&w=majority');
  
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var gender = req.body.gender;
	var univid = req.body.univid;
	var email =req.body.email;
	var phone =req.body.phone;
	var cpi = req.body.cpi;
	var attendence = req.body.attendence;
	var backlogs = req.body.backlogs;
	var tech = req.body.tech;
	var myList = req.body.myList;

	var data = {
		"name": name,
		"gender":gender,
		"univid":univid,
		"email":email,
		"phone":phone,
		"cpi":cpi,
		"attendence":attendence,
		"backlogs":backlogs,
		"tech":tech,
		"myList":myList
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('survey_success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
