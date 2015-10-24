//메인 자바스크립트 파일
//모든 외부호출을 여기서 관리
var express = require('express');
var app = express();
var path  = require('path');
var bodyParser = require('body-parser');

//DB연동시 삭제될 부분
var currentTime = new Date();
var users = [{
	email : '1',
	password : '1',
	name : '1',
	job : '1',
	joinDate : currentTime,
	updateDate : currentTime
}, {
	email : '2',
	password : '2',
	name : '2',
	job : '2',
	joinDate : currentTime,
	updateDate : currentTime
}];
app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/view/login.html')); //http://localhost:8080/ 이 연결되었을때 http://localhost:8080/view/login.html이 실행됨
});

app.get('/user', function(req, res){
	res.send(users);
});
app.get('/user/:idx',function(req, res){
	res.send(users[req.params.idx]);
});

app.post('/email',function(req,res){
	var email = req.body.email;
	var result = {
		status : false
	};
	for(var i =0;i<users.length;i++){
		console.log(email);
		console.log(users[i]);

		if(email === users[i].email){
			console.log(i);
			result.status = true;
			result.message = '중복된 사용자 입니다.';
			break;
		}
	}
	res.send(result);
})
app.listen(8080);
console.log('Express Listening on port 8080...');
