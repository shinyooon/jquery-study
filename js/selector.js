$(function(){
	//초기에 해야할 일. js파일이 시작
	$('#btnLogin').click(checkEmailAndPassword);
	// $('#btnLogin').click(showEmail);
	$('font').hide();
});

function show(){
	alert("Lgoin");

}
function showEmail(){
	var email = $('#inputEmail').val();
	var password = $('#inputPassword').val('');
	alert(email);
}
/*
jquery에서 선택자 찾기

parent대신 closest
child대신 find

*jquery선택자
- $('#id') //html상에서id값은 유니크해야한다.
- $('.class') //class값을 갖는 요소를 찾을때
- $('tag') //태그요소를 찾을때
*/
function checkIdAndPw(){
	var $inputs = $('.inputs') //제이쿼리 객체로 만든 변수는 $표시를 해놓기!
	var $inputId = $('#inputEmail');
	var $inputPw =$('#inputPassword');
	var $inputPwCheck = $('#inputPwConfirm');
	var idList = ['tom','joe','hong','oh'];
	var txt = '';
	/*
	for(var i=0;i<$inputs.length;i++){
		var input = $inputs[i]

	}
	console.log($input);
	for문과 each문 동일한 문법 성능적으로는 each가 사용하기 좋다
	다른점은 for문안의 변수들은 전역번수로 사용가능하지만 each안의 변수는 each안에서만 사용이 가능하다.

	*/
	var required = true,
		emailChecked = false; //flag변수

	$.each($inputs,function(index,value){
		var $input = $($inputs[index]); //val()이라는 제이쿼리 함수를 사용하기위해서 jquery객체로 만들어준다.

		//빈문자열만 체크
		// if($input.val()===''){
		// }

		//'', null, undefineded, 0, false
		if(!$input.val()){
			required=false;
			txt = '모든 값을 넣어주세요'
		}

	});
	for(var cnt=0;cnt<idList.length;cnt++){
		if($inputId.val()===idList[cnt]){
			emailChecked=true;
			break;
		}
	}
	if(!emailChecked){
		required=false;
		txt = '올바른 아이디 값을 넣어주세요.'
	}
	if($inputPw.val()!==$inputPwCheck.val()){//값을 비교할때에는 비교연산자를 사용한다.
		required=false;
		txt = '동일한 비밀번호를 넣어주세요.'
	}

	if(!required){
		alert(txt);
	}else{
		alert('로그인');
	}

}
function checkEmailAndPassword(){
	var cEmail = checkEmail(),
	      cPassword = checkPassword();
	      cPasswordConfrim = checkPasswordConfirm();
	if(cEmail&&cPassword){
		alert('로그인!');
	}
}
function checkEmail(){
	var $inputEmail = $('#inputEmail');
	var $fontChild = $inputEmail.closest('p').find('font');

	if(!$inputEmail.val()){
		$fontChild.show();
		$inputEmail.addClass('empty');
		return false;
	}else{
		$fontChild.hide();
		$inputEmail.removeClass('empty');
	}
	return true;
}
function checkPassword(){
	var $inputPassword= $('#inputPassword');
	var $fontChild = $inputPassword.closest('p').find('font');

	if(!$inputPassword.val()){
		$fontChild.show();
		$inputPassword.addClass('empty');
		return false;
	}else{
		$fontChild.hide();
		$inputPassword.removeClass('empty');
	}
	return true;
}
function checkPasswordConfirm(){
	var $inputPasswordConfrim= $('#inputPasswordConfrim');
	var $fontChilds = $inputPasswordConfrim.closest('p').find('font');
	//비밀번호 확인 기능추가하기
}
