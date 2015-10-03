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
		if(this.find({email : email})){
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
	find : function(obj) {
		var result;

		$.ajax({
			method : 'POST',
			url : 'email',
			data : obj,
			dataType : 'json',
			success : function(data){
				alert(data.status+ '\n' + data.message);
				return data.status;
			}
		})
		// $.each(users, function(index, user){
		// 	if (user.name === obj) {
		// 		result = user;
		// 		return;
		// 	}
		// });
		// return result;
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
		if(user){
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
