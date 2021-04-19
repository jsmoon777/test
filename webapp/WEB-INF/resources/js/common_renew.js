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

/** ���ڿ� ���� */
String.prototype.contains = function( str ) {
	return ( this.indexOf( str ) > -1 );
};

//��¥ format ����
Date.prototype.format = function( format ){
	if( !this.valueOf() ) return ' ';
	
	var weekName = ['�Ͽ���', '������', 'ȭ����', '������', '�����', '�ݿ���', '�����'];
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
			case 'a/p': return d.getHours() < 12 ? '����' : '����';
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
//���ڸ��� (len - 1) ��ŭ 0 ���̱� ex) '1'.zf(2) = 01
String.prototype.zf = function(len){
	return '0'.string(len - this.length) + this;
}
Number.prototype.zf = function(len){
	return this.toString().zf(len);
}

/**
 * ���� �޸�
 * @param number 
 */
function numberCommas(num){
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * �α��� üũ �� URL �̵�
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
				alert('�α��� üũ�� �� �� �����ϴ�.');
			}
		});
	}
}

/**
 * �α��� üũ ���� �α��� �������� �̵� �� URL �̵�
 * @param url 
 */
function goLoginNoCheckUrl(url){
	var param = '?referer=' + escape(url);
	return_url = "/common/login/login.do" + param ;
	location.href = return_url;
}

/**
 * �α��� üũ �� function ���� �̵�
 * @param sFunc ���� �� ���� function - �α��� ��
 * @param fFunc ���� �� ���� function - �α��� �ȵ�
 * @param eFunc ���� �� ���� function - ����
 */
function goLoginFunction(sFunc, fFunc, eFunc){
	if( !sFunc ){
		alert('function ������ �ʿ��մϴ�.');
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
			else alert('�α��� üũ�� �� �� �����ϴ�.');
		}
	});
}

// �α׾ƿ� �ڵ鷯
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

				// mkch 2016.12.27 ���ð� ���߼����� �����Ҷ��� ���ð� ���߼������� �α׾ƿ� �Ѵ�.
				 if (document.location.href.indexOf("localhost") > -1 || document.location.href.indexOf("65.2.61.124") > -1 || document.location.href.indexOf("65.2.38.124") > -1 || document.location.href.indexOf("65.2.39.58") > -1  || document.location.href.indexOf("65.130.12.13") > -1 ) {
						// Local �� ���߼�����
					 document.location.href = "/main.do";
					 // document.location.reload();
				 } else {

					 // ���
					/* �α����� �ʿ��� ���������� �α׾ƿ� �� ����ȭ������ �̵� */
					url = url.replace("http://", "");
					url = url.replace("https://", "");
					url = url.replace("www.", "");
					url = url.replace("raemian.co.kr", "");

					// �������������� �α׾ƿ� ��
					if(url == "/member/mypage/mypage.do")
					{
						document.location.href = "/main.do";
					}
					// ȸ���������� ���������� �α׾ƿ� ��
					else if(url == "/member/myModify/modifyForm.do" || url == "/member/modify/modifyPassword.do" || url == "/member/modify/modifyMainForm.do")
					{
						document.location.href = "/main.do";
					}
					// �ߵ��� ������ȸ ���������� �α׾ƿ� ��
					else if(url == "/work/middlepay/view.do")
					{
						document.location.href = "/main.do";
					}
					// 1��1 ���� ���������� �α׾ƿ� ��
					else if(url == "/customer/request/list.do")
					{
						document.location.href = "/main.do";
					}
					// 1��1 ���� �۾��� ���������� �α׾ƿ� ��
					else if(url == "/customer/request/form.do?pg=1")
					{
						document.location.href = "/main.do";
					}
					// 1��1 ���� ���� Ȯ�� ���������� �α׾ƿ� ��
					else if(url == "/customer/request/list.do?pg=1&listMode=M")
					{
						document.location.href = "/main.do";
					}
					else if(url.indexOf("/community/realtyMember/list"))
					{
						document.location.href = "/main.do";
					}
					// Ŀ�´�Ƽ Ÿ������ Ž��, Ȩ��Ÿ�ϸ�, �̿����� �󼼺��� ȭ�鿡�� �α׾ƿ� ��
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
					/* �α����� �ʿ��� ���������� �α׾ƿ� �� ����ȭ������ �̵� */

				 }
					// mkch 2016.12.27 ���ð� ���߼����� �����Ҷ��� https ������ �����Ѵ�. ��

			}
			else
			{
				alert('�α׾ƿ� ó���� �� �� �����ϴ�.');
			}
		}
	});
}

/**
 *  ������ �ʴ� �Է°��� ����
 * @param string, this 
 */
function comInputFilter(type, obj){
	/* jsp ��뿹��
	 * 	$( "#user_id" ).bind( "keyup", function( e ) {
		comInputFilter("id", this);
	} );
	*/
	
	var str = $(obj).val();
	if(type == 'id'){
		//���� or ���ڸ� ���
		$(obj).val(str.replace(/[^a-z0-9]/gi,""));
	}else if(type == 'number'){
		//���ڸ� ���
		$(obj).val(str.replace(/[^0-9]/gi,""));
	}else if(type == 'non_spec'){
		//Ư������ �����
		$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,.'"\[\]/]/gi,""));
	}else if(type == 'name'){
		//Ư������, ���� �����
		$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,.'"\[\]/0-9]/gi,""));
	}else if(type == 'email'){
		//Ư������, ���� �����
		$(obj).val(str.replace(/[^a-z0-9.]/gi,""));
		//$(obj).val(str.replace(/[~!@#$%^&*()_+|<>?:;{}`\-\=\\\,'"\[\]/0-9]/gi,""));
	}
}

/**
 *  �˸� ���̾˷α� ����
 * @param string, string, string, string 
 */
function openMsgDialog(msg, type, completeFnc, cancelFnc){
	//msg : �޼���, type : [confirm, warning, success]  ,completeFnc :  �Ϸ� �� �ݹ��Լ�  ,cancelFnc : ��� �� �ݹ��Լ�
	//div : comMsgDialog ��ġ�� [footer.jsp]�� ������
	//EX)  openMsgDialog("�޽������Է��ϼ���", "confirm", "fn_test", "fn_calcel");
	
	//�̺�Ʈ ����
	if( $('a#d_complete').length > 0 ){
		$('a#d_complete').off();
	}
	//�̺�Ʈ ����
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
				str += '		<a href="javascript://" id="d_cancel">���</a>';
			}else{
				str += '		<a href="' + cancelFncStr + '" >���</a>';
			}
		}else{
			str += '		<a href="javascript:closeLayerPopup(\'.dialog_popup\')">���</a>';
		}
		
		if( !!completeFnc ){
			if( typeof completeFnc === 'function' ){
				str += '		<a href="javascript://" id="d_complete" class="success">Ȯ��</a>';
			}else{
				str += '		<a href="' + completeFncStr + '" class="success">Ȯ��</a>';
			}
		}else{
			str += '		<a href="javascript:closeLayerPopup(\'.dialog_popup\')" class="success">Ȯ��</a>';
		}
	}else if("warning" == type){
		if( !!completeFnc ){
			if( typeof completeFnc === 'function' ){
				str += '	<a href="javascript://" id="d_complete" class="warning">Ȯ��</a>';
			}else{
				str += '	<a href="' + completeFncStr + '"  class="warning">Ȯ��</a>';
			}
		}else{
			str += '	<a href="javascript:closeLayerPopup(\'.dialog_popup\')" class="warning">Ȯ��</a>';
		}
	}else if("success" == type){
		if( !!completeFnc ){
			if( typeof completeFnc === 'function' ){
				str += '	<a href="javascript://" id="d_complete" class="success">Ȯ��</a>';
			}else{
				str += '	<a href="' + completeFncStr + '" class="success">Ȯ��</a>';
			}
		}else{
			str += '	<a href="javascript:closeLayerPopup(\'.dialog_popup\')" class="success">Ȯ��</a>';
		}
	}
	
	str += '	</div>';
	//str += '</div>';

	$("#comMsgDialog").html(str);
	
	//�̺�Ʈ ���
	if( $('a#d_complete').length > 0 ){
		$('a#d_complete').click(function(){
			closeLayerPopup('.dialog_popup');
			completeFnc();
		});
	}
	//�̺�Ʈ ���
	if( $('a#d_cancel').length > 0 ){
		$('a#d_cancel').click(function(){
			closeLayerPopup('.dialog_popup');
			cancelFnc();
		});
	}
	
	openLayerPopup("#comMsgDialog","");
}

/**
 *  ����(���̾�α�) ����
 * @param string, string, string
 */
function doError(msg, id, frm){
	//msg:[�޽���], id[input�ʵ��], frm[form��]
	
	openMsgDialog(msg, "warning", "", "");
	$("#"+frm+" #"+id).focus();
}

/**
 *  ����(����) ����
 * @param string, string
 */
function doErrorWrite(msg, sId){
	$("#"+sId).html(msg);
	$("#"+sId).show();
}

/**
 *  �̸���üũ
 * @param string
 */
function CheckEmail(email)
{
	/* email check ����ǥ���� */
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
 *  ���� Ȯ���� üũ
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
 *  ���� Ȯ���� üũ
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
 *  ���� �뷮 üũ
 * @param object(type=file), int
 * size�� MB ����
 */
function checkFileSize(obj, maxSize){
	var check = false;
	var sizeInByte;
	
	if( !!window.ActiveXObject ){
		//IE ����
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var filePath = obj[0].value;
		var thefile = fso.getFile(filePath);
		sizeInByte = thefile.size;
	}else{
		//�׿� ������
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
 *  ���� �뷮 ���ϱ�
 * @param object(type=file)
 * size�� MB ����
 */
function getFileSize(obj){
	var check = false;
	var sizeInByte;
	
	if( !!window.ActiveXObject ){
		//IE ����
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var filePath = obj[0].value;
		var thefile = fso.getFile(filePath);
		sizeInByte = thefile.size;
	}else{
		//�׿� ������
		sizeInByte = obj[0].files[0].size;
	}
	
	var checkSize = sizeInByte;
	for( var i = 0; i < 3; i++ ){
		checkSize /= 1024;
	}
	
	return checkSize;
}


/**
 *  �̹��� Ȯ���� üũ
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
 * ���ɴ��� ��� �˾� ȣ�� 
 * @param pjtCd : ������Ʈ �ڵ� / loginYn : �α��� ����
*/
function fn_favorite(pjtCd, loginYn){
	
	/*console.log("pjtCd>>>>"+pjtCd);
	console.log("loginYn>>>>"+loginYn);*/
	//ȣ���� ������ ���� �Ʒ� �±� �����ֱ�
	/*<div class="layer_popup " tabindex="0" id="concern_pop"></div>*/
	var objId = '#concern_pop';		
	var tPopup = $(objId);
	var loadUrl = '';
	if(loginYn == "Y"){	//ȸ��
		loadUrl = '/popup/favoritDanji.do?pjt_cd=' + pjtCd;
		$(objId).load(loadUrl, function(){openLayerPopup(objId, "");fn_resizeLpContent(tPopup);});
	} else {	//��ȸ��		
		openMsgDialog("��ȸ������ ���ɴ�������� �Ͻðڽ��ϱ�?",
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
 * ���ɴ��� ��� �˾� ������ ���� ���� ������ 
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
 * �н����� �븮���̼� üũ
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
		var alertMsg = validator.substring( 0, tolerence ) + "�� ���� ���� ���ڳ� ������ ��������(4ȸ �̻�) �ݺ� �� Ű���� ������ ���ӹ��� ����Ͻ� �� �����ϴ�.";

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
 * �н����� �븮���̼� üũ���� ȣ��
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
 * SNS �����ϱ�
*/
function shareSns( title, type ){
	var href = location.href;
	var encodeTitle = encodeURIComponent(title);//Ư�����ڱ���
	
	if( type == 'kakao' ) {
		//īī����
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
			buttonTitle:"�̵��ϱ�"
		});
	} else if( type == 'copy' ) {
		//url �����ϱ�
		$('#copyUrl').val( href );
		var obCopyUrl = document.getElementById('copyUrl');
		$('#copyUrl').show();
		obCopyUrl.select();
		document.execCommand('copy');
		obCopyUrl.blur();
		$('#copyUrl').hide();
		
		alert('URL�� Ŭ�����忡 ����Ǿ����ϴ�.');
	} else if( type == 'twitter' ) {
		//Ʈ����
		var url = "https://twitter.com/intent/tweet?text=" + encodeTitle + "&url=" + encodeURIComponent(href);
		var win = window.open(url, 'twitter', '');
	} else if( type == 'facebook' ) {
		//���̽� ��
		$('meta[property="og:title"]').attr( 'content', title );
		$('meta[property="og:description"]').attr( 'content', title );
		$('meta[property="og:url"]').attr( 'content', href );
		
		var url = "http://www.facebook.com/sharer.php?u=" + href;
		var win = window.open(url, 'facebook', '');
	}
	
}

/**
 * �о���� ���� ���丮�� set
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
 * �о���� ���� ���丮�� get
*/
function fn_getItem(){		
	if(JSON.parse(localStorage.getItem("danjiList")) != null){
		_dataList = JSON.parse(localStorage.getItem("danjiList"));	
	}		
}

/**
 * �о���� ���� max data 
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
 * �о���� �ֱ�����  
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
				openMsgDialog('�α����� �ʿ��� ���� �Դϴ�.','warning',"/common/login/login.do?referer=/member/mypage/mypage.do","");
			}
		},
		error : function() {
			alert('�α��� üũ�� �� �� �����ϴ�.');
		}
	});
	
}

//���ִ������
function fn_openEnterForm(){
	$.ajax({
		url : '/popup/moveInMember.do',
		type : 'POST',
		data : {},
		error : function(){
			openMsgDialog('ó������ ������ �߻��Ǿ����ϴ�.','warning',"","");
			return;
		},
		success : function(res){
			$("#regist_resident_member").html(res);
			openLayerPopup('#regist_resident_member');
		}
	});
}





