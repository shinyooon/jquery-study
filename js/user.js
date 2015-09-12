$(function(){
	user.init();
});
//db연동시 삭제
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


var user  = {
	$el : {},
	init : function(){
		this.$el = $('.container');
		this.$el.find('#btnSignUp').click(function(){
			user.showModal();
		});

		this.$el.find('#btnClose').click(function(){
			user.closeModal();
		});
		this.$el.find('#btnSubmit').click(function(){
			user.signUp();
		});
		this.$el.find('#btnLogin').click(function(){
			user.login();
		});
	},
	showModal : function(){
		user.resetModal();
		this.$el.find('#userModal').modal();
	},
	closeModal : function(){
		this.$el.find('#userModal').modal('hide');
	},
	resetModal : function(){
		this.$el.find('#userModal .signForms').val('');
		this.$el.find('#userModal .signForms').removeClass('empty');
	},
	signUp : function(){
		var email = this.$el.find('#inputEmail').val(),
			password = this.$el.find('#inputPassword').val(),
			passwordConfirm = this.$el.find('#inputPasswordConfirm').val(),
			name = this.$el.find('#inputName').val(),
			job = this.$el.find('#inputJob').val();


		// 1. 입력창에서 빈칸은 없는가?
		if(!this.validate()){
			alert('필수값을 모두 채워주세요');
			return;
		}
		// 2. password와 passwordConfirm이 같은가?
		if(password !==passwordConfirm){
			alert('패스워드가 일치하지 않습니다.');
			return ;
		}

		// 3. 이미 등록된 사용자가 아닌가?
		if(this.find(email)[0]){
			alert('이메일이 중복됩니다.')
			return;
		}
		// 4. 위 검증이 끝나면 회원 가입
		var currentTime = new Date();
		this.save({
			email : email,
			password : password,
			name : name,
			job : job,
			joinDate : currentTime,
			updateDate : currentTime
		});
	},

	validate : function(){
		var $signForms = this.$el.find('.signForms'),
			result = true;

		$.each($signForms, function(index, signForm){
			var $signForm = $(signForm);

			if(!$signForm.val()){
				$signForm.addClass('empty');
				result = false;
			}else{
				$signForm.removeClass('empty');
			}
		});

		return result;
	},
	find : function(email){
		//email중복되는지 체크하고 같은 이메일이 있다면 true 없다면 false;
		var i = 0;
		var result = null; //false값을 넣지 않으면 undefined이고 javascript 는 undifined를 false.

		for(i = 0;i<users.length;i++){
			if(users[i].email===email){
				result  = users[i];
				break;
			}else{
				result = null;
			}
		}
		/*
		//성능을 따지면 for문이 성능면에서는 훨씬 좋긴하지만
		변수 scope를 잘 활용하기 위해서는 each를 사용하는게 편하다.
		$.each(users,function(index, value){
			if(users[index].email===email){
				result  = true;
				return;
			}
		})
		*/
		return result;
	},
	save : function(obj){
		users.push(obj);
		alert('등록되었습니다.');
		this.closeModal();
	},
	login:function(){
		//입력창에 입력된 email과 password를 검사해서 일치하면 로그인  아니면 email & password 확인 alert
		var email = this.$el.find('#loginEmail').val(),
			password = this.$el.find('#loginPassword').val();
			result = true;
		var user = this.find(email);
		if(this.find(email)){
			if(user.password === password){
				result=true;
			}else{
				result=false;
			}
		}else{
			result=false;
		}

		if(result){
			alert('로그인')
		}else{
			alert('아이디와 비밀번호를 확인해주세요.');
		}
	}


}
