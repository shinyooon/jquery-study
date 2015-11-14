var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoskin = require('mongoskin');

var db = mongoskin.db("mongodb://localhost:27017/front", {native_parser:true});
db.bind('users');

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret:'jquery salt',
	resave:false,
	saveUninitalized:true
}));


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/view/login.html'));
})

app.get('/user', function(req, res) {
    db.users.find().toArray(function(err, users){
		if(err){
			console.log('get user list error');
		}
		//db.close();
		res.send(users);
	});
});

app.get('/user/:idx', function(req, res) {
    res.send(users[req.params.idx]);
});

app.post('/user', function(req, res){
	var obj = req.body;
	var result = {
		status : false
	};
	console.log('진입점');

    db.users.findOne({email:obj.email}, function(err, user){
		if(err){
			console.log('user find error in save');
		}
		console.log('find');

		if(!user){
            db.users.save(obj, function(err){
				if(err){
					console.log('user save error');
				}
				console.log('save');
				result.status = true;
                res.send(result);
			});
		}else{
            res.send(result);
        }
	});
	console.log('하이');
});

app.post('/login', function(req, res){
	var obj = req.body;

	var result = {
		status : false
	};

	for(var i=0;i<users.length;i++){
		if(obj.email === users[i].email && obj.password === users[i].password){
			result.status = true;
			req.session.user = users[i];
			break;
		}
	}
	res.send(result);
});

app.get('/session', function(req, res){
	res.send(req.session.user);
});

app.get('/board/list', function(req, res){
	if(!req.session.user){
		res.redirect('/');
	}
	res.sendFile(path.join(__dirname + '/view/board.html'));
});

app.get('/profile', function(req, res){
	var user = {},
		loginUser = req.session.user;

	for(var prop in loginUser ){
		if(loginUser.hasOwnProperty(prop) && prop !== 'password'){
			user[prop] = loginUser[prop];
		}
	}
	res.send(user);
});

app.post('/profile', function(req, res){
	var obj = req.body,
		loginUser = req.session.user;
	var result={};

	if(!loginUser){
		res.redirect('/');
	}

	if(obj.originPassword != loginUser.password){
		console.log('password not matched');
		result.status=false;
		res.send(result);
	}else{
		for(var i=0;i<users.length;i++){
			if(obj.email === users[i].email){
				console.log('success');
				users[i].password = obj.newPassword;
				users[i].job = obj.job;
				users[i].name = obj.name;
				result.user = users[i];
				result.status = true;
				break;
			}
		}
		res.send(result);
	}
});

app.get('/logout', function(req, res){
	req.session.user=null;
	res.send(req.session.user);
});

app.get('/board/list', function(req, res){
	if(!req.session.user){
		res.redirect('/');
	}
	res.sendFile(path.join(__dirname + '/view/board.html'));
});

app.listen(8080);
console.log('Express Listening on port 8080...');
