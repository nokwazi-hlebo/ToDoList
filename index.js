var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

// //built in path module, used to resolve paths of relative files
var path = require('path');


// //allows html file to reference stylesheet "style.css" that is stored in ./css directory
app.use(express.static(path.join(__dirname + '/doList')));



app.use(session({secret: 'todotopsecret'}));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(function(req,res,next){
	if (!req.session.todolist) {
       req.session.todolist =  [];
      // console.log( 'we are here'+ req.session)
    }
    next();
});
// for parsing application/json

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array()); 




//POST Add 
app.post('/', urlencodedParser, function(req, res) {
	
	

	if(req.body.to!=""){
		 
		req.session.todolist.push(req.body.to);
		
	}

	res.redirect('/')


});

//Delete Function 
app.get('/delete/:id', urlencodedParser, function(req, res) {

	var id = req.params.id;
	if(id){
		req.session.todolist.splice(id,1);

	};
	
	res.redirect('/');

})

app.get('/', function(req, res){
   res.render('form',{data:req.session.todolist});
  
});

// 

// app.post('/', function(req, res){
//    console.log(req.body);
//    res.send("recieved your request!");
// });
app.listen(process.env.PORT || 3000);