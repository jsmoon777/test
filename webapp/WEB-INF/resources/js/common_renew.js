//ltrim
String.prototype.ltrim = function(){
	return this.replace(/^\s+/, '');
}
//rtrim
String.prototype.rtrim = function(){
	return this.replace(/\s+$/, '');
}
//ltrim
String.prototype.remove_first_alinea = function(){
	return this.replace(/^\n+/, '').replace(/^\r+/, '');
}
//rtrim
String.prototype.remove_last_alinea = function(){
	return this.replace(/\n+$/, '').replace(/\r+$/, '');
}
//replaceAll
String.prototype.replaceAll = function(searchStr, replaceStr){
	if( !this ) return str;
	return this.split(searchStr).join(replaceStr);
}

/** 문자열 포함 */
String.prototype.contains = function( str ) {
	return ( this.indexOf( str ) > -1 );
};

//날짜 format 변경
Date.prototype.format = function( format ){
	if( !this.valueOf() ) return ' ';
	
	var weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
	var d = this;
	
	return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function(s){
		switch (s) {
			case 'yyyy': return d.getFullYear();
			case 'yy': return (d.getFullYear() % 1000).zf(2);
			case 'MM': return (d.getMonth() + 1).zf(2);
			case 'dd': return d.getDate().zf(2);
			case 'E': return weekName[d.getDay];
			case 'HH': return d.getHours().zf(2);
			case 'hh': return ( (h = d.getHours() % 12) ? h : 12 ).zf(2);
			case 'mm': return d.getMinutes().zf(2);
			case 'ss': return d.getSeconds().zf(2);
			case 'a/p': return d.getHours() < 12 ? '오전' : '오후';
			default: return s;
			
		}
	});
}

String.prototype.string = function(len){
	var s = '', i = 0;
	while (i++ < len){
		s += this;
	}
	return s;
}
//앞자리에 (len - 1) 만큼 0 붙이기 ex) '1'.zf(2) = 01
String.prototype.zf = function(len){
	return '0'.string(len - this.length) + this;
}
Number.prototype.zf = function(len){
	return this.toString().zf(len);
}

/**
 * 숫자 콤마
 * @param number 
 */
function numberCommas(num){
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 로그인 체크 후 URL 이동
 * @param url 
 */
function goLoginUrl(url){
	if(url != ''){
		$.ajax({
			url : '/common/login/loginCheck.do',
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				var anchor_forLogin = document.createElement("a") ;
				var return_url = "" ;

				if(data.result == 'true')
					return_url = url;
				else{
					var param = '?referer=' + escape(url);
					return_url = "/common/login/login.do" + param ;
				}

				location.href = return_url;
			},
			error : function() {
				alert('로그인 체크를 할 수 없습니다.');
			}
		});
	}
}

/**
 * 로그인 체크 없이 로그인 페이지로 이동 후 URL 이동
 * @param url 
 */
function goLoginNoCheckUrl(url){
	var param = '?referer=' + escape(url);
	return_url = "/common/login/login.do" + param ;
	location.href = return_url;
}

/**
 * 로그인 체크 후 function 실행 이동
 * @param sFunc 성공 후 실행 function - 로그인 됨
 * @param fFunc 실패 후 실행 function - 로그인 안됨
 * @param eFunc 에러 후 실행 function - 에러
 */
function goLoginFunction(sFunc, fFunc, eFunc){
	if( !sFunc ){
		alert('function 선언이 필요합니다.');
	}
	
	$.ajax({
		url : '/loginCheck.do',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.result == 'true') sFunc();
			else if( !!fFunc ) fFunc();
		},
		error : function() {
			if( !!eFunc ) eFunc();
			else alert('로그인 체크를 할 수 없습니다.');
		}
	});
}

// 로그아웃 핸들러
function logoutHandle()
{
	$.ajax({
		url : '/logout.do',
		type : 'POST',
		dataType : 'json',
		success : function(data){
			if(data.result == 'true')
			{
				var url = document.location.href;

				// mkch 2016.12.27 로컬과 개발서버에 접속할때는 로컬과 개발서버에서 로그아웃 한다.
				 if (document.location.href.indexOf("localhost") > -1 || document.location.href.indexOf("65.2.61.124") > -1 || document.location.href.indexOf("65.2.38.124") > -1 || document.location.href.indexOf("65.2.39.58") > -1  || document.location.href.indexOf("65.130.12.13") > -1 ) {
						// Local 및 개발서버용
					 document.location.href = "/main.do";
					 // document.location.reload();
				 } else {

					 // 운영용
					/* 로그인이 필요한 페이지에서 로그아웃 시 메인화면으로 이동 */
					url = url.replace("http://", "");
					url = url.replace("https://", "");
					url = url.replace("www.", "");
					url = url.replace("raemian.co.kr", "");

					// 마이페이지에서 로그아웃 시
					if(url == "/member/mypage/mypage.do")
					{
						document.location.href = "/main.do";
					}
					// 회원정보수정 페이지에서 로그아웃 시
					else if(url == "/member/myModify/modifyForm.do" || url == "/member/modify/modifyPassword.do" || url == "/member/modify/modifyMainForm.do")
					{
						document.location.href = "/main.do";
					}
					// 중도금 납입조회 페이지에서 로그아웃 시
					else if(url == "/work/middlepay/view.do")
					{
						document.location.href = "/main.do";
					}
					// 1대1 문의 페이지에서 로그아웃 시
					else if(url == "/customer/request/list.do")
					{
						document.location.href = "/main.do";
					}
					// 1대1 문의 글쓰기 페이지에서 로그아웃 시
					else if(url == "/customer/request/form.do?pg=1")
					{
						document.location.href = "/main.do";
					}
					// 1대1 문의 내역 확인 페이지에서 로그아웃 시
					else if(url == "/customer/request/list.do?pg=1&listMode=M")
					{
						document.location.href = "/main.do";
					}
					else if(url.indexOf("/community/realtyMember/list"))
					{
						document.location.href = "/main.do";
					}
					// 커뮤니티 타임즈의 탐방, 홈스타일링, 이웃사촌 상세보기 화면에서 로그아웃 시
					else if(
							  url.indexOf('/community/times/raemianVisit/view.do') > -1
							  || url.indexOf('/community/times/raemianHomeStyling/view.do') > -1
							  || url.indexOf('/community/times/raemianGoodNeighbor/view.do') > -1
							)
					{
						document.location.href = "/main.do";
					}
					else
					{
						document.location.reload();
					}
					/* 로그인이 필요한 페이지에서 로그아웃 시 메인화면으로 이동 */

				 }
					// mkch 2016.12.27 로컬과 개발서버에 접속할때는 https 접속을 제외한다. 끝

			}
			else
			{
				alert('로그아웃 처리를 할 수 없습니다.');
			}
		}
	});
}

/**
 *  허용되지 않는 입력값을 제외
 * @param string, this 
 */
function comInputFilter(type, obj){
	/* jsp 사용예제
	 * 	$( "#user_id" ).bind( "keyup", function( e ) {
		comInputFilter("id", this);
	} );
	*/
	
	var str = $(obj).val();
	if(type == 'id'){
		//영문 or 숫자만 허용
		$(obj).val(str.replace(/[^a-z0-9]/gi,""));
	}else if(type == 'number'){
		//숫자만 허용
		$(obj).val(str.replace(/[^0-9]/gi,""));
	}else if(type == 'non_spec'){
		//특수문자 비허용
		$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,.'"\[\]/]/gi,""));
	}else if(type == 'name'){
		//특수문자, 숫자 비허용
		$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,.'"\[\]/0-9]/gi,""));
	}else if(type == 'email'){
		//특수문자, 숫자 비허용
		$(obj).val(str.replace(/[^a-z0-9.]/gi,""));
		//$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,'"\[\]/0-9]/gi,""));
	}
}

/**
 *  알림 다이알로그 설정
 * @param string, string, string, string 
 */
function openMsgDialog(msg, type, completeFnc, cancelFnc){
	//msg : 메세지, type : [confirm, warning, success]  ,completeFnc :  완료 시 콜백함수  ,cancelFnc : 취소 시 콜백함수
	//div : comMsgDialog 위치는 [footer.jsp]에 설정됨
	//EX)  openMsgDialog("메시지를입력하세요", "confirm", "fn_test", "fn_calcel");
	
	//이벤트 제거
	if( $('a#d_complete').length > 0 ){
		$('a#d_complete').off();
	}
	//이벤트 제거
	if( $('a#d_cancel').length > 0 ){
		$('a#d_cancel').off();
	}
	
	var completeFncStr = '';
	var cancelFncStr = '';
	var str = '	<div class="msg">';
	
	if( !!completeFnc ){
		if( !(typeof completeFnc === 'function') ){
			if( completeFnc.indexOf('location.') > -1 || completeFnc.indexOf('history.') > -1 ){
				completeFncStr = 'javascript:' + completeFnc;
			}else if(completeFnc.indexOf('.do') > -1){
				completeFncStr = '' + completeFnc;
			}else if( !!completeFnc ){
				completeFncStr = 'javascript:' + completeFnc + '()';
			}
		}
	}
	
	if( !!cancelFnc ){
		if( !(typeof cancelFnc === 'function') ){
			if(cancelFnc.indexOf('location.') > -1 || cancelFnc.indexOf('history.') > -1 ){
				cancelFncStr = 'javascript:' + cancelFnc;
			}else if(cancelFnc.indexOf('.do') > -1){
				cancelFncStr = '' + cancelFnc;
			}else if( !!cancelFnc ){
				cancelFncStr = 'javascript:' + cancelFnc + '()';
			}
		}
	}
	
	if( type == 'warning' ){
		str += '<div class="ico"><img src="/assets/front/inc/images/template/ico_dialog_warning.png" alt=""></div>';
	}else if( type == 'success' ){
		str += '<div class="ico"><img src="/assets/front/inc/images/template/ico_dialog_success.png" alt=""></div>';
	}
	
	str += '		<p class="txt">' + msg + '</p>';
	str += '	</div>';
	str += '	<div class="btn_dp_set">';
	
	if( type == 'confirm' ){
		if( !!cancelFnc ){
			if( typeof cancelFnc === 'function' ){
				str += '		<a href="javascript://" id="d_cancel">취소</a>';
			}else{
				str += '		<a href="' + cancelFncStr + '" >취소</a>';
			}
		}else{
			str += '		<a href="javascript:closeLayerPopup(\'.dialog_popup\')">취소</a>';
		}
		
		if( !!completeFnc ){
			if( typeof completeFnc === 'function' ){
				str += '		<a href="javascript://" id="d_complete" class="success">확인</a>';
			}else{
				str += '		<a href="' + completeFncStr + '" class="success">확인</a>';
			}
		}else{
			str += '		<a href="javascript:closeLayerPopup(\'.dialog_popup\')" class="success">확인</a>';
		}
	}else if("warning" == type){
		if( !!completeFnc ){
			if( typeof completeFnc === 'function' ){
				str += '	<a href="javascript://" id="d_complete" class="warning">확인</a>';
			}else{
				str += '	<a href="' + completeFncStr + '"  class="warning">확인</a>';
			}
		}else{
			str += '	<a href="javascript:closeLayerPopup(\'.dialog_popup\')" class="warning">확인</a>';
		}
	}else if("success" == type){
		if( !!completeFnc ){
			if( typeof completeFnc === 'function' ){
				str += '	<a href="javascript://" id="d_complete" class="success">확인</a>';
			}else{
				str += '	<a href="' + completeFncStr + '" class="success">확인</a>';
			}
		}else{
			str += '	<a href="javascript:closeLayerPopup(\'.dialog_popup\')" class="success">확인</a>';
		}
	}
	
	str += '	</div>';
	//str += '</div>';

	$("#comMsgDialog").html(str);
	
	//이벤트 등록
	if( $('a#d_complete').length > 0 ){
		$('a#d_complete').click(function(){
			closeLayerPopup('.dialog_popup');
			completeFnc();
		});
	}
	//이벤트 등록
	if( $('a#d_cancel').length > 0 ){
		$('a#d_cancel').click(function(){
			closeLayerPopup('.dialog_popup');
			cancelFnc();
		});
	}
	
	openLayerPopup("#comMsgDialog","");
}

/**
 *  에러(다이얼로그) 설정
 * @param string, string, string
 */
function doError(msg, id, frm){
	//msg:[메시지], id[input필드명], frm[form명]
	
	openMsgDialog(msg, "warning", "", "");
	$("#"+frm+" #"+id).focus();
}

/**
 *  에러(쓰기) 설정
 * @param string, string
 */
function doErrorWrite(msg, sId){
	$("#"+sId).html(msg);
	$("#"+sId).show();
}

/**
 *  이메일체크
 * @param string
 */
function CheckEmail(email)
{
	/* email check 정규표현식 */
	var regMail =/^[._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+\.[a-zA-Z]+$/;

	/* email check */
	if(email != ""){
		var temp_email = email;
		if (!regMail.test(temp_email))
			return false;
		else
			return true;
	}
	else
		return false;
}

/**
 *  파일 확장자 체크
 * @param object(type=file), string
 */
function checkExt(obj, ext){
	var check = false;
	var extName = $(obj).val().substring( $(obj).val().lastIndexOf('.') + 1 ).toUpperCase();
	var str = ext.split(',');
	
	if( !!extName ){
		for( var i = 0; i < str.length; i++ ){
			if( extName == str[i] ){
				check = true;
				break;
			}
		}
	}
	
	return check;
}

/**
 *  파일 확장자 체크
 * @param string, string
 */
function checkExtByFileName(fileName, ext){
	var check = false;
	var extName = fileName.substring( fileName.lastIndexOf('.') + 1 ).toUpperCase();
	var str = ext.split(',');
	
	if( !!extName ){
		for( var i = 0; i < str.length; i++ ){
			if( extName == str[i] ){
				check = true;
				break;
			}
		}
	}
	
	return check;
}

/**
 *  파일 용량 체크
 * @param object(type=file), int
 * size는 MB 단위
 */
function checkFileSize(obj, maxSize){
	var check = false;
	var sizeInByte;
	
	if( !!window.ActiveXObject ){
		//IE 전용
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var filePath = obj[0].value;
		var thefile = fso.getFile(filePath);
		sizeInByte = thefile.size;
	}else{
		//그외 브라우저
		sizeInByte = obj[0].files[0].size;
	}
	
	var checkSize = sizeInByte;
	for( var i = 0; i < 3; i++ ){
		checkSize /= 1024;
	}
	
	if( maxSize > checkSize ){
		check = true;
	}
	
	return check;
}

/**
 *  파일 용량 구하기
 * @param object(type=file)
 * size는 MB 단위
 */
function getFileSize(obj){
	var check = false;
	var sizeInByte;
	
	if( !!window.ActiveXObject ){
		//IE 전용
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var filePath = obj[0].value;
		var thefile = fso.getFile(filePath);
		sizeInByte = thefile.size;
	}else{
		//그외 브라우저
		sizeInByte = obj[0].files[0].size;
	}
	
	var checkSize = sizeInByte;
	for( var i = 0; i < 3; i++ ){
		checkSize /= 1024;
	}
	
	return checkSize;
}


/**
 *  이미지 확장자 체크
 * @param object(type=file)
 */
var imgExt = 'jpg,jpeg,gif,png,bmp,JPG,JPEG,GIF,PNG,BMP';
function checkExtByImg(obj){
	return checkExt(obj, imgExt);
}

/**
 * ajax Call
*/
function fn_callAjax( url, data, noScrollMove, successCallBack, failCallBack ) {
	$.ajax( {
		url : url,
		type : 'post',
		data : data,
		dataType : 'json',
		success : function( data ) {
			successCallBack( data, noScrollMove );
		},
		error : function() {
			failCallBack();
		}
	} );
}

/**
 * 관심단지 등록 팝업 호출 
 * @param pjtCd : 프로젝트 코드 / loginYn : 로그인 여부
*/
function fn_favorite(pjtCd, loginYn){
	
	/*console.log("pjtCd>>>>"+pjtCd);
	console.log("loginYn>>>>"+loginYn);*/
	//호출할 페이지 내에 아래 태그 붙혀넣기
	/*<div class="layer_popup " tabindex="0" id="concern_pop"></div>*/
	var objId = '#concern_pop';		
	var tPopup = $(objId);
	var loadUrl = '';
	if(loginYn == "Y"){	//회원
		loadUrl = '/popup/favoritDanji.do?pjt_cd=' + pjtCd;
		$(objId).load(loadUrl, function(){openLayerPopup(objId, "");fn_resizeLpContent(tPopup);});
	} else {	//비회원		
		openMsgDialog("비회원으로 관심단지등록을 하시겠습니까?",
				"confirm",
				function(){
					loadUrl = '/popup/simpleFavorite/simpleFavoriteReg.do?PJT_CD=' + pjtCd;	
					$(objId).load(loadUrl, function(){openLayerPopup(objId, "");fn_resizeLpContent(tPopup);});
				},
				function(){
					return;
				}
		);		
	}		
}

/**
 * 관심단지 등록 팝업 컨텐츠 영역 높이 재조절 
*/
function fn_resizeLpContent(tPopup){	
	var winHeight = $(window).height();
	var lpPadding = parseInt(tPopup.css("paddingTop"))+parseInt(tPopup.css("paddingBottom"));
	var headerHeight = tPopup.find(">h3").outerHeight();
	var btnSetHeight = tPopup.find(">.btn_lp_set").outerHeight();	
	headerHeight = 45;
	btnSetHeight = 45;
	tPopup.find(".lp_content").css(
		"maxHeight", parseInt(winHeight-headerHeight-btnSetHeight-lpPadding-80)+"px"
	);
}

/**
 * 패스워드 밸리데이션 체크
 */
function pwdValidation( txtPwd ) {

	var tolerence = 4;

	var validatorList = new Array();

	validatorList.push( "abcdefghijklmnopqrstuvwxyz" );
	validatorList.push( "ABCDEFGHIJKLMNOPQRSTUVWXYZ" );
	validatorList.push( "1234567890" );

	validatorList = validatorList.concat( buildValidatorSeqList( validatorList, tolerence ) );

	validatorList.push( "qwertyuiop" );
	validatorList.push( "asdfghjkl" );
	validatorList.push( "zxcvbnm" );
	validatorList.push( "QWERTYUIOP" );
	validatorList.push( "ASDFGHJKL" );
	validatorList.push( "ZXCVBNM" );

	for( var i = 0 ; i<validatorList.length ; i++ ) {

		var validator = validatorList[i];
		var alertMsg = validator.substring( 0, tolerence ) + "와 같이 동일 숫자나 문자의 연속적인(4회 이상) 반복 및 키보드 자판의 연속문자 사용하실 수 없습니다.";

		for( var j = 0 ; j<=validator.length - tolerence ; j++ ) {

			if( txtPwd.contains( validatorList[i].substring( j, j + tolerence ) ) ) {

				openMsgDialog(alertMsg,'warning',"","");
				return false;
			}
		}

	}

	return true;
}

/**
 * 패스워드 밸리데이션 체크에서 호출
 */
function buildValidatorSeqList( validatorList, tolerence ) {

	var validatorSeqList = new Array();

	for( var i = 0 ; i<validatorList.length ; i++ ) {

		var validator = validatorList[i];

		for( var j = 0 ; j<validator.length ; j++ ) {

			var validatorSeq = "";

			for( var k = 0 ; k<tolerence ; k++ ) {

				validatorSeq += validator[j];
			}

			validatorSeqList.push( validatorSeq );
		}

	}

	return validatorSeqList;

}

/**
 * SNS 공유하기
*/
function shareSns( title, type ){
	var href = location.href;
	var encodeTitle = encodeURIComponent(title);//특수문자까지
	
	if( type == 'kakao' ) {
		//카카오톡
		thumbnail = "http://" +document.domain + "/assets/resource/images/sns/snsimg.gif";
		
		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: title ,
				imageUrl : thumbnail,
				link:{
					mobileWebUrl : href
				},
				description: description,
				imageWidth : 560,
				imageHeight : 292
			},
			installTalk:true,
			buttonTitle:"이동하기"
		});
	} else if( type == 'copy' ) {
		//url 복사하기
		$('#copyUrl').val( href );
		var obCopyUrl = document.getElementById('copyUrl');
		$('#copyUrl').show();
		obCopyUrl.select();
		document.execCommand('copy');
		obCopyUrl.blur();
		$('#copyUrl').hide();
		
		alert('URL이 클립보드에 복사되었습니다.');
	} else if( type == 'twitter' ) {
		//트위터
		var url = "https://twitter.com/intent/tweet?text=" + encodeTitle + "&url=" + encodeURIComponent(href);
		var win = window.open(url, 'twitter', '');
	} else if( type == 'facebook' ) {
		//페이스 북
		$('meta[property="og:title"]').attr( 'content', title );
		$('meta[property="og:description"]').attr( 'content', title );
		$('meta[property="og:url"]').attr( 'content', href );
		
		var url = "http://www.facebook.com/sharer.php?u=" + href;
		var win = window.open(url, 'facebook', '');
	}
	
}

/**
 * 분양단지 접속 스토리지 set
*/
var _dataList = new Array();
var _selIdx = -1;
function fn_setItem(pjtCd, pjtDanjiNm, urlLink){
		
	var getDt = new Date();
	var getMonth = getDt.getMonth()+1;
	var getDay = getDt.getDate();
	var getYyear = getDt.getFullYear();
	var getHours = getDt.getHours();	
	var getMinutes = getDt.getMinutes();	
	var getSeconds = getDt.getSeconds();	
	if(getMonth < 10){
		getMonth = "0"+getMonth;
	}
	if(getDay < 10){
		getDay = "0"+getDay;
	}
	if(getHours < 10){
		getHours = "0"+getHours;
	}
	if(getMinutes < 10){
		getMinutes = "0"+getMinutes;
	}
	if(getSeconds < 10){
		getSeconds = "0"+getSeconds;
	}
	var nowDateTop = getYyear.toString()+getMonth+getDay+getHours+getMinutes+getSeconds;
	
	fn_getItem();
	if(_dataList.length > 0){			
		for(var i=0; i<_dataList.length; i++){				
			if(_dataList[i].PJT_CD == pjtCd){					
				_selIdx = i;
			}
		}
	}		
	if(_selIdx != -1){
		var currentCnt = parseInt(_dataList[_selIdx].CNT);
		currentCnt += 1;
		_dataList[_selIdx].CNT = currentCnt		
		_dataList[_selIdx].JOIN_DATE = nowDateTop;		
	} else {
		var data = new Object();
		data.PJT_CD = pjtCd;
		data.PJT_DANJI_NM = pjtDanjiNm;
		data.URL_LINK = urlLink;
		data.CNT = 1;		
		data.JOIN_DATE = nowDateTop;
		
		_dataList.push(data);
	}
	localStorage.setItem("danjiList",JSON.stringify(_dataList));		
	_selIdx = -1;
	
}

/**
 * 분양단지 접속 스토리지 get
*/
function fn_getItem(){		
	if(JSON.parse(localStorage.getItem("danjiList")) != null){
		_dataList = JSON.parse(localStorage.getItem("danjiList"));	
	}		
}

/**
 * 분양단지 접속 max data 
*/
function fn_getMaxAccessDanji(){
	if(JSON.parse(localStorage.getItem("danjiList")) != null){
		var danjiList = JSON.parse(localStorage.getItem("danjiList"));
		var item;
		for(var i=0; i<danjiList.length; i++){
			if(item == null || parseInt(danjiList[i]["CNT"]) > parseInt(item["CNT"]) ){
				item = danjiList[i];
			}
		}
		return item;
	}		
}

/**
 * 분양단지 최근접속  
*/
function fn_getLastAccessDanji(){
	if(JSON.parse(localStorage.getItem("danjiList")) != null){
		var danjiList = JSON.parse(localStorage.getItem("danjiList"));
		var item;
		for(var i=0; i<danjiList.length; i++){
			if(item == null || parseInt(danjiList[i]["JOIN_DATE"]) > parseInt(item["JOIN_DATE"]) ){
				item = danjiList[i];
			}
		}
		return item;
	}		
}

function goLoginScript(fnc){
		$.ajax({
		url : '/loginCheck.do',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.result == 'true')
				eval(fnc);
			else{
				openMsgDialog('로그인이 필요한 서비스 입니다.','warning',"/common/login/login.do?referer=/member/mypage/mypage.do","");
			}
		},
		error : function() {
			alert('로그인 체크를 할 수 없습니다.');
		}
	});
	
}

//입주단지등록
function fn_openEnterForm(){
	$.ajax({
		url : '/popup/moveInMember.do',
		type : 'POST',
		data : {},
		error : function(){
			openMsgDialog('처리도중 에러가 발생되었습니다.','warning',"","");
			return;
		},
		success : function(res){
			$("#regist_resident_member").html(res);
			openLayerPopup('#regist_resident_member');
		}
	});
}





