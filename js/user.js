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
		if(this.find(email)){
			alert('이메일이 중복됩니다.')
			return;
		}
		// 4. 위 검증이 끝나면 회원 가입
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
		var result = false; //false값을 넣지 않으면 undefined이고 javascript 는 undifined를 false.
		for(var i = 0;i<users.length;i++){
			if(users[i].email===email){
				result  = true;
				break;
			}
		}
		/*
		//성능을 따지면 for문이 성능면에서는 훨씬 좋긴하지만
		변수 scope를 잘 활용하기 위해서는 each를 사용하는게 편하다.
		$.each(users,function(index, value){
			if(users[index].email===email){
				result  = true;
			}
		})
		*/
		return result;
	}


}
