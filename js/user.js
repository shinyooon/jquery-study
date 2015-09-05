$(function(){
	user.init();
});

var user  = {
	$el : {},
	init : function(){
		this.$el = $('.container');
		this.$el.find('#btnSignUp').click(function(){
			user.resetModal();
		});

		this.$el.find('#btnClose').click(function(){
			user.closeModal();
		});
	},
	showModal : function(){
		user.showModal();
		this.$el.find('#userModal').modal();
	},
	closeModal : function(){
		this.$el.find('#userModal').modal('hide');
	},
	resetModal : function(){
		this.$el.find('#userModal .signForms').val('');
	}
}
