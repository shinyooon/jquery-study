$(function(){
	user.init();
});

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

		//빈칸 체크
		var $signInputs = this.$el.find('#userModal .signForms');
		var required = true;
		$signInputs.each(function(){
			if(!$(this).val()){
				$(this).addClass('empty');
				required = false;

			}else{
				$(this).removeClass('empty');
			}
		});
		if(!required){
			alert('빈칸을 채워주세요.');
		}
	}
	// password, passwordConfrim체크
	// 이미등록된 사용자 체크
	//위 검증이 끝나면 회원가입
}
