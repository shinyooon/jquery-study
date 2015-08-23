
$(function(){
	//QA테스트 진행
	member.init();

});

var member = {
	$el : {},
	list : [],
	currentData : {},

	showModal : function(){
		if(!this.currentData.idx){
			this.reset();
		}

		$('#memberModal').modal();
	},

	closeModal : function(){
		$('#memberModal').modal('hide');
	},

	reset : function(){
		this.currentData = {};
		$('#inputEmail').val('');
		$('#inputName').val('');
		$('#inputJob').val('');
	},

	init : function(){
		var that = this;
		this.list = (this.list.length > 0)? this.list : this.generateMembers();
		this.makeTbody(this.list);
		this.$el = $('#memberMain');

		this.$el.on('click', '.member_info', function(){
			var idx = $(this).attr('id').slice(7);
			member.edit(member.find(idx));
			member.showModal();
		});

		// this.$el.find('#btnSubmit').click(
		// 	member.save;//member.save()  소괄호를 사용하면 함수를 무조건 한번은 실행됨
		// );
		this.$el.find('#btnSubmit').click(function(){
			member.save(); //function으로 감쌌으면 이 함수(클릭) 내에서만 즉시 실행됨
		});
		this.$el.find('#btnClose').click(function(){
			member.closeModal();
		});
		this.$el.find('#btnAdd').click(function(){
			member.currentData= {};
			member.showModal();
		});
	},

	generateMembers : function(){
		var members = [
			{
				idx			: 1,
				email 	 	: 'jojoldu@gmail.com',
				name 		: '이동욱',
				job 		: 'web developer',
				joinDate	: '2015-02-12',
				updateDate 	: '2015-07-30'
			},
			{
				idx			: 2,
				email 	 	: 'soultomind930@gmail.com',
				name 		: '이바우',
				job 		: 'web developer',
				joinDate	: '2015-02-12',
				updateDate 	: '2015-07-30'
			},
			{
				idx			: 3,
				email 	 	: 'jusaha1109@gmail.com',
				name 		: '김태영',
				job 		: 'web developer',
				joinDate	: '2015-02-12',
				updateDate 	: '2015-07-30'
			},
			{
				idx			: 4,
				email  		: 'usdrd90@gmail.com',
				name 		: '전옥현',
				job 		: 'web publisher',
				joinDate	: '2015-02-12',
				updateDate 	: '2015-07-30'
			},
			{
				idx			: 5,
				email 	 	: 'talkyfull@gmail.com',
				name 		: '신윤아',
				job 		: 'web publisher',
				joinDate	: '2015-02-12',
				updateDate 	: '2015-07-30'
			}
		];

		return members;
	},

	makeTbody : function(members){
		var $table = $('#tMember'),
			$oldTbody = $table.find('tbody'),
			$tbody = $(document.createElement('tbody'));

		if($oldTbody){
			$oldTbody.remove();
		}
		$.each(members, function(index, member){
			var $tr = $(document.createElement('tr'));
			$tr.addClass('member_info');
			$tr.attr('id', 'member_' + member.idx);

			for(prop in member){
				var $td = $(document.createElement('td'));
				$td.text(member[prop]);
				$tr.append($td);
			}
			$tbody.append($tr);
		});
		$table.append($tbody);
	},

	find : function(idx){
		var members = this.list,
			res = null;

		$.each(members, function(index, member){
			if(member.idx == idx){
				res = member;
				return false;
			}
		});

		return res;
	},

	edit : function(member){
		var member = member,
			$inputEmail = $('#inputEmail'),
			$inputName = $('#inputName'),
			$inputJob = $('#inputJob');

		this.currentData = member;
		$inputEmail.val(member.email);
		$inputName.val(member.name);
		$inputJob.val(member.job);
	},

	save : function(){
		var member = this.currentData,
			$inputEmail = $('#inputEmail'),
			$inputName = $('#inputName'),
			$inputJob = $('#inputJob');

		if(!member.idx){
			member.idx = this.generateIdx();
		}

		member.email = $inputEmail.val();
		member.name = $inputName.val();
		member.job = $inputJob.val();
		if(member.idx>this.list.length){
			member.joinDate = this.dateFormat();
		}
		member.updateDate = this.dateFormat();

		this.send(member);
	},
	send : function(member){
		this.list[member.idx-1] = member;
		this.init();
		this.closeModal();
	},

	generateIdx : function(){
		var lastIdx = this.list[this.list.length-1].idx;
		return lastIdx+1;
	},

	dateFormat : function(date){
		var date = date || new Date(),
			year = date.getFullYear(),
			month = date.getMonth()+1,
			day = date.getDate();
		month = (month <10)? '0'+month : month;
		day = (day<10)?'0'+day:day;
		return year + '-' + (month) + '-' + (day);
	}

}
