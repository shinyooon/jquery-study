$(function(){
	//초기에 해야할 일
	$('#btnLogin').click(show);
	$('#btnLogin').click(showEmail);
});

function show(){
	alert("안녕하세요");

}
function showEmail(){
	var email = $('#inputEmail').val();
	var password = $('#inputPassword').val('');
	alert(email);
}