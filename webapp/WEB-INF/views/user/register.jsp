<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<title>FFEE 회원가입</title> 
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script> 
<!-- daum 도로명주소 찾기 api --> 
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<style type="text/css"> 
	td{ border:1px solid #000000; border-collapse:collapse; } 
</style> 
<script type="text/javascript"> 
	//모든 공백 체크 정규식 
	var empJ = /\s/g; 
	//아이디 정규식 
	var idJ = /^[a-z0-9][a-z0-9_\-]{4,19}$/; 
	// 비밀번호 정규식 
	var pwJ = /^[A-Za-z0-9]{4,12}$/; 
	// 닉네임 정규식 
	var nicknameJ = /^[0-9a-zA-Z가-힣]{1,10}$/; 
	// 이름 정규식 
	var nameJ = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; 
	// 이메일 검사 정규식 
	var mailJ = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
	// 휴대폰 번호 정규식 
	var phoneJ = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/; 
	
	var birthJ = false; 
	
	var address = $('#user_dtaddress'); 
	
	$(document).ready(function() { 
		var address = $('#user_dtaddress'); 
		
		//아이디 중복확인 
		$("#user_id").blur(function() {
			if($('#user_id').val()==''){ 
				$('#id_check').text('아이디를 입력하세요.'); 
				$('#id_check').css('color', 'red'); 
			} else if(idJ.test($('#user_id').val())!=true){ 
				$('#id_check').text('4~12자의 영문, 숫자만 사용 가능합니다.'); 
				$('#id_check').css('color', 'red'); 
			} else if($('#user_id').val()!=''){ 
					var user_id=$('#user_id').val(); 
					$.ajax({ 
						async : true,
						url : "/idcheck?user_id=" + user_id,
						type : "GET", 
						contentType: "application/json; charset=UTF-8", 
						success : function(data) { 
								if(data == 1){ 
									$('#id_check').text('중복된 아이디 입니다.'); 
									$('#id_check').css('color', 'red'); 
									$("#usercheck").attr("disabled", true); 
									
								}else {
									if(idJ.test(user_id)){ 
										$('#id_check').text('사용가능한 아이디 입니다.'); 
										$('#id_check').css('color', 'blue'); 
										$("#usercheck").attr("disabled", false); 
										
									} else if(user_id==''){ 
										$('#id_check').text('아이디를 입력해주세요.'); 
										$('#id_check').css('color', 'red'); 
										$("#usercheck").attr("disabled", true); 
										
									} else{ 
										$('#id_check').text("아이디는 소문자와 숫자 4~12자리만 가능합니다."); 
										$('#id_check').css('color', 'red'); 
										$("#usercheck").attr("disabled", true); 
										
									} 
								}
								// (data==1) else
							},
							error:function(request,status,error){
						        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error +"data ="); 
						        // 실패 시 처리
						       }


					}); 
					//ajax
				}//else if 
					
					
			});
				
		
		//blur 
		
		//닉네임 중복확인 
		$("#nickname").blur(function() {
			if($('#nickname').val()==''){ 
				$('#nickname_check').text('닉네임을 입력하세요.'); 
				$('#nickname_check').css('color', 'red'); 
			} else if(nicknameJ.test($('#nickname').val())!=true){ 
				$('#nickname_check').text('2~10자의 한글, 영문, 숫자만 사용할 수 있습니다.'); 
				$('#nickname_check').css('color', 'red'); 
			} else if($('#nickname').val()!=''){ 
					var nickname=$('#nickname').val(); 
					$.ajax({ 
						async : true,
						url : "/nicknamecheck?nickname=" + nickname,
						type : "GET", 
						contentType: "application/json; charset=UTF-8", 
						success : function(data) { 
								if(data == 1){ 
									$('#nickname_check').text('중복된 닉네임 입니다.'); 
									$('#nickname_check').css('color', 'red'); 
									$("#usercheck").attr("disabled", true); 
									
								}else {
									if(nicknameJ.test(nickname)){ 
										$('#nickname_check').text('사용가능한 닉네임 입니다.'); 
										$('#nickname_check').css('color', 'blue'); 
										$("#usercheck").attr("disabled", false); 
										
									} else if(nickname==''){ 
										$('#nickname_check').text('닉네임을 입력해주세요.'); 
										$('#nickname_check').css('color', 'red'); 
										$("#usercheck").attr("disabled", true); 
										
									} else{ 
										$('#nickname_check').text("1~10자의 한글, 영문, 숫자만 사용할 수 있습니다."); 
										$('#nickname_check').css('color', 'red'); 
										$("#usercheck").attr("disabled", true); 
										
									} 
								}
								// (data==1) else
							},
							error:function(request,status,error){
						        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error +"data ="); 
						        // 실패 시 처리
						       }


					}); 
					//ajax
				}//else if 
					
					
			});
				
		
		//blur 
		$('form').on('submit',function(){ 
			var inval_Arr = new Array(8).fill(false); 
			if (idJ.test($('#user_id').val())) { 
				inval_Arr[0] = true; 
				} else { 
					inval_Arr[0] = false; 
					alert('아이디를 확인하세요.'); 
					return false; 
				} 
			// 비밀번호가 같은 경우 && 비밀번호 정규식 
			if (($('#user_pw').val() == ($('#user_pw2').val())) 
					&& pwJ.test($('#user_pw').val())) { 
				inval_Arr[1] = true; 
				
			} else { 
				inval_Arr[1] = false; 
				alert('비밀번호를 확인하세요.'); 
				return false; 
				
			} 
			if (nicknameJ.test($('#nickname').val())) { 
				inval_Arr[2] = true; 
				} else { 
					inval_Arr[2] = false; 
					alert('낙네임을 확인하세요.'); 
					return false; 
				} 
			// 이름 정규식 
			if (nameJ.test($('#user_name').val())) { 
				inval_Arr[3] = true; 
				
			} else { 
				inval_Arr[3] = false; 
				alert('이름을 확인하세요.'); 
				return false; 
				
			} 
			// 생년월일 정규식 
			if (birthJ) { 
				console.log(birthJ); 
				inval_Arr[4] = true; 
				
			} else { 
				inval_Arr[4] = false; 
				alert('생년월일을 확인하세요.'); 
				return false; 
				
			} 
			// 이메일 정규식 
			if (mailJ.test($('#user_email').val())){ 
				console.log(phoneJ.test($('#user_email').val())); 
				inval_Arr[5] = true; 
				
			} else { 
				inval_Arr[5] = false; 
				alert('이메일을 확인하세요.'); 
				return false; 
				
			} 
			// 휴대폰번호 정규식 
			if (phoneJ.test($('#user_phone').val())) { 
				console.log(phoneJ.test($('#user_phone').val())); 
				inval_Arr[6] = true; 
				
			} else { 
				inval_Arr[6] = false; 
				alert('휴대폰 번호를 확인하세요.'); 
				return false; 
				
			} 
			//성별 확인 
			if(member.gender[0].checked==false&&member.gender[1].checked==false){ 
				inval_Arr[7] = false; 
				alert('성별을 확인하세요.'); 
				return false; 
				
			} else{ 
				inval_Arr[7] = true; 
				
			} 
			//주소확인 
			if(address.val() == ''){ 
				inval_Arr[8] = false; 
				alert('주소를 확인하세요.'); 
				return false; 
				
			}else {
				inval_Arr[8] = true;
			}
			//전체 유효성 검사 
			var validAll = true; 
			for(var i = 0; i < inval_Arr.length; i++){ 
				if(inval_Arr[i] == false){ validAll = false; 
				} 
			} 
			if(validAll == true){ // 유효성 모두 통과 
				alert('ffee에 가입되었습니다. 로그인 화면으로 이동합니다.'); 
			} else{ 
				alert('정보를 다시 확인하세요.') 
			} 
		}); 
		
		$('#user_id').blur(function() { 
			if (idJ.test($('#user_id').val())) { 
				console.log('true'); 
				$('#id_check').text(''); 
				} else { 
					console.log('false'); 
					$('#id_check').text('5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'); 
					$('#id_check').css('color', 'red'); 
					
				} 
			}); 
			$('#user_pw').blur(function() { 
				if (pwJ.test($('#user_pw').val())) { 
					console.log('true'); 
					$('#pw_check').text(''); 
				} else { 
					console.log('false'); 
					$('#pw_check').text('4~12자의 숫자 , 문자로만 사용 가능합니다.'); 
					$('#pw_check').css('color', 'red'); 
					
				} 
				
			}); 
			//1~2 패스워드 일치 확인 
			$('#user_pw2').blur(function() { 
				if ($('#user_pw').val() != $(this).val()) { 
					$('#pw2_check').text('비밀번호가 일치하지 않습니다.'); 
					$('#pw2_check').css('color', 'red'); 
				} else { 
					$('#pw2_check').text(''); 
				} 
			}); 
			//닉네임에 특수문자 들어가지 않도록 설정 
			$("#nickname").blur(function() { 
				if (nicknameJ.test($(this).val())) { 
					console.log(nicknameJ.test($(this).val())); 
					$("#nickname_check").text(''); 
				} else { 
					$('#nickname_check').text('1~10자의 한글, 영문, 숫자만 사용할 수 있습니다.'); 
					$('#nickname_check').css('color', 'red'); 
				} 
			}); 
			//이름에 특수문자 들어가지 않도록 설정 
			$("#user_name").blur(function() { 
				if (nameJ.test($(this).val())) { 
					console.log(nameJ.test($(this).val())); 
					$("#name_check").text(''); 
				} else { 
					$('#name_check').text('한글 2~4자 이내로 입력하세요. (특수기호, 공백 사용 불가)'); 
					$('#name_check').css('color', 'red'); 
				} 
			}); 
			$("#user_email").blur(function() { 
				if (mailJ.test($(this).val())) { 
					$("#email_check").text(''); 
				} else { 
					$('#email_check').text('이메일 양식을 확인해주세요.'); 
					$('#email_check').css('color', 'red'); 
				} 
			}); 
			// 생일 유효성 검사 
			var birthJ = false; 
			// 생년월일 birthJ 유효성 검사 
			$('#user_birth').blur(function(){ 
				var dateStr = $(this).val(); 
				var year = Number(dateStr.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
				var month = Number(dateStr.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
				var day = Number(dateStr.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
				var today = new Date(); // 날짜 변수 선언 
				var yearNow = today.getFullYear(); // 올해 연도 가져옴 
				if (dateStr.length <=8) { // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다. 
					if (year > yearNow || year < 1900 ){ 
						$('#birth_check').text('생년월일을 확인해주세요'); 
						$('#birth_check').css('color', 'red'); 
						
					} else if (month < 1 || month > 12) { 
						$('#birth_check').text('생년월일을 확인해주세요 '); 
						$('#birth_check').css('color', 'red'); 
						
					}else if (day < 1 || day > 31) { 
						$('#birth_check').text('생년월일을 확인해주세요 '); 
						$('#birth_check').css('color', 'red'); 
						
					}else if ((month==4 || month==6 || month==9 || month==11) && day==31) { 
						$('#birth_check').text('생년월일을 확인해주세요 '); 
						$('#birth_check').css('color', 'red'); 
						
					}else if (month == 2) { 
						var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
						
						if (day>29 || (day==29 && !isleap)) { 
							$('#birth_check').text('생년월일을 확인해주세요 '); 
							$('#birth_check').css('color', 'red'); 
							
						}else{ 
							$('#birth_check').text(''); 
							birthJ = true; 
							
						} 
						
					}else{ 
						$('#birth_check').text(''); 
						birthJ = true; }//end of if 
						}else{ 
							//1.입력된 생년월일이 8자 초과할때 : auth:false 
							$('#birth_check').text('생년월일을 확인해주세요 '); 
							$('#birth_check').css('color', 'red'); 
							
						} 
				}); 
			//End of method /* 
			
			// 휴대전화 
			$('#user_phone').blur(function(){ 
				if(phoneJ.test($(this).val())){ 
					console.log(nameJ.test($(this).val())); 
					$("#phone_check").text(''); 
					
				} else { 
					$('#phone_check').text('휴대폰번호를 확인해주세요 '); 
					$('#phone_check').css('color', 'red'); 
					
				} 
				
			}); 
	}); //(document).ready
	
	//우편번호 찾기 버튼 클릭시 발생 이벤트 
	function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample6_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("sample6_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode;
                document.getElementById("sample6_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample6_detailAddress").focus();
            }
        }).open();
    
	}
</script>

</head>
<body>
	<article class="container"> 
		<div class="page-header"> 
			<div class="col-md-6 col-md-offset-3"> 
				<h3>회원가입</h3> 
			</div> 
		</div> 
		<div class="col-sm-6 col-md-offset-3"> 
			<form action="/register" method="post" role="form" id="usercheck" name="member"> 
				
				<!-- 선택동의 -->
					<input type="hidden" id="loca_prov" name="loca_prov" value="${vo.loca_prov}"> 
				
				<div class="form-group"> 
					<label for="id">아이디</label> 
					<input type="text" class="form-control" id="user_id" name="user_id" placeholder="ID"> 
					<div class="check_font" id="id_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="pw">비밀번호</label> 
					<input type="password" class="form-control" id="user_pw" name="user_pw" placeholder="PASSWORD"> 
					<div class="eheck_font" id="pw_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="pw2">비밀번호 확인</label> 
					<input type="password" class="form-control" id="user_pw2" name="user_pw2" placeholder="Confirm Password"> 
					<div class="eheck_font" id="pw2_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="nickname">닉네임</label> 
					<input type="text" class="form-control" id="nickname" name="nickname" placeholder="NickName"> 
					<div class="eheck_font" id="nickname_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="user_name">이름</label> 
					<input type="text" class="form-control" id="user_name" name="user_name" placeholder="Name"> 
					<div class="eheck_font" id="name_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="user_birth">생년월일</label> 
					<input type="tel" class="form-control" id="user_birth" name="user_birth" placeholder="ex) 19990101"> 
					<div class="eheck_font" id="birth_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="user_email">이메일 주소</label> 
					<input type="email" class="form-control" id="user_email" name="user_email" placeholder="E-mail"> 
					<div class="eheck_font" id="email_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="user_phone">휴대폰 번호('-'없이 번호만 입력해주세요)</label> 
					<input type="tel" class="form-control" id="user_phone" name="user_phone" placeholder="Phone Number"> 
					<div class="eheck_font" id="phone_check"></div> 
				</div> 
				<div class="form-group"> 
					<label for="gender">성별 </label> 
					<input type="checkbox" id="gender" name="gender" value="남">남 
					<input type="checkbox" id="gender" name="gender" value="여">여 
				</div> 
				
				<div class="form-group"> 
					<input type="text" id="sample6_postcode" name="user_oaddress" placeholder="우편번호">
					<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
					<input type="text" id="sample6_address" name="user_address" placeholder="주소"><br>
					<input type="text" id="sample6_detailAddress" name="user_dtaddress" placeholder="상세주소">
					<input type="text" id="sample6_extraAddress" placeholder="참고항목">
				</div> 
				
				<div class="form-group text-center"> 
					<button type="submit" class="btn btn-primary">회원가입</button> 
				</div> 
			</form> 
		</div> 
	</article>

</body>
</html>