$(document).ready(function() {
	$("body").addClass("load_complete");
})

//래미안 조경의 진화
function initLandscapeEvolution() {
	var btnRleMore = $("button#btn_rle_more");
	var popupLandscapeEvolution = $(".raemian_landscape_evolution");
	var rleTit = popupLandscapeEvolution.find("h3")
	var rleTab = popupLandscapeEvolution.find("nav.rle_tab");
	var rleTabOfsTop = parseInt(rleTab.css("top"));
	var rleTabFixed = false;
	var btnTermMove = popupLandscapeEvolution.find(".btn_term_move button");
	var btnClose = popupLandscapeEvolution.find("button.btn_close");

	
	//조경팝업 열기
	btnRleMore.on("click",function() {
		$("html,body").css({
			"overflow":"hidden"
		})
		popupLandscapeEvolution.show();
		initRleCont(0); //래미안 조경의 진화 컨텐츠 인터렉션 최초 실행
	})
	
	//조경팝업 스크롤시
	popupLandscapeEvolution.on("load scroll",function() {
		if($(this).scrollTop() >= rleTabOfsTop && rleTabFixed == false) {
			rleTab.css({
				"position":"fixed",
				"top": "0px",
				"margin-left":"-"+($(window).width()-rleTit.outerWidth())/2+"px"
			})
			rleTabFixed = true
		} else if($(this).scrollTop() < rleTabOfsTop && rleTabFixed == true) {
			rleTab.css({
				"position":"",
				"top": "",
				"margin-left":""
			})
			rleTabFixed = false
		}
	})

	//탭 클릭시
	rleTab.find("ul>li>a").on("click",function() {
		popupLandscapeEvolution.scrollTop(0);
		tIndex = $(this).parent().index();
		initRleCont(tIndex); //래미안 조경의 진화 컨텐츠 인터렉션
		//console.log(tIndex)
	})

	//하단 년도 이동 버튼 클릭시
	btnTermMove.on("click",function() {
		tIndex = parseInt($(this).attr("data-rle-index"));
		rleTab.find("ul>li:eq("+(tIndex-1)+")>a").click();
	})
	
	//조경팝업 닫기
	btnClose.on("click",function() {
		popupLandscapeEvolution.hide();
		$("html,body").css({
			"overflow":""
		})
	})
}

//래미안 조경의 진화 컨텐츠 인터렉션
function initRleCont(wrapIdx) {
	var popupLandscapeEvolution = $(".raemian_landscape_evolution");
	var rleTab = popupLandscapeEvolution.find("nav.rle_tab");
	var rleTabheight = rleTab.outerHeight();
	var rleContent = popupLandscapeEvolution.find(".rle_content");
		rleContent.find(".product_intro .pi_cont").removeClass("view");
		rleContent.find(".adjacent_area_intro figure.aai_cont").removeClass("view");
	var piOfsTop = [];
	var piView = [];
	var aaiOfsTop = [];
	var aaiView = [];
	
	
	//console.log(rleContent.eq(wrapIdx).attr("id"))
	//console.log(rleContent.eq(wrapIdx).find(".product_intro").position().top)

	//컨텐츠 위치 구하기
	function posSetting() {
		piOfsTop = []
		piView = []
		rleContent.eq(wrapIdx).find(".product_intro").each(function(h) {
			rleContent.eq(wrapIdx).find(".product_intro").eq(h).find(".pi_cont").each(function(i) {
				piOfsTop.push(rleContent.eq(wrapIdx).find(".product_intro").eq(h).find(".pi_cont").eq(i).position().top + rleContent.eq(wrapIdx).find(".product_intro").eq(h).position().top - $(window).height()/2);
				piView.push(false);
			})
		})
		//console.log(piOfsTop)

		aaiOfsTop = [];
		aaiView = [];
		rleContent.eq(wrapIdx).find(".adjacent_area_intro").each(function(a) {
			rleContent.eq(wrapIdx).find(".adjacent_area_intro").eq(a).find("figure.aai_cont").each(function(b) {
				aaiOfsTop.push(rleContent.eq(wrapIdx).find(".adjacent_area_intro").eq(a).find("figure.aai_cont").eq(b).position().top - $(window).height()/1.8);
				aaiView.push(false);
			})
		})
	}
	setTimeout(function() {
		posSetting()
	},300)

	//스크롤 시 컨텐츠 인터렉션
	popupLandscapeEvolution.on("scroll",function() {
		//console.log(popupLandscapeEvolution.scrollTop()+" , "+aaiOfsTop)
		rleContent.eq(wrapIdx).find(".pi_cont").each(function(k) {
			if(popupLandscapeEvolution.scrollTop() >= piOfsTop[k] && piView[k] == false) {
				rleContent.eq(wrapIdx).find(".pi_cont").eq(k).addClass("view");
				piView[k] = true;
			}
		})
		
		rleContent.eq(wrapIdx).find("figure.aai_cont").each(function(c) {
			if(popupLandscapeEvolution.scrollTop() >= aaiOfsTop[c] && aaiView[c] == false) {
				rleContent.eq(wrapIdx).find("figure.aai_cont").eq(c).addClass("view");
				aaiView[c] = true;
			}
		})
	})
}


//유튜브 영상 팝업 스크립트
function initYoutubePopup(videoPopupID,videoID) {
	var layerPopup = $("#"+videoPopupID);
	var video = $("#"+videoID);
	var player;
	var tag;
	var firstScriptTag;
	var btnClose = layerPopup.find(".btn_lp_set a.btn_close_youtube,button.btn_close");

	function youtube_play_api(){
		tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// 영상이 준비되면 실행되는 함수
		window.onYouTubeIframeAPIReady = function() {
			player = new YT.Player(videoID, {});
		};
	}
	youtube_play_api();
	
	btnClose.click(function(){
		player.stopVideo();
		closeLayerPopup("#"+videoPopupID);
	}); 
}

//브랜드
function initBranhistroy() {
	var raemianArea = $(".raemian_area");
	var historyList = raemianArea.find(".history_list");
	var histListOfsTop = historyList.offset().top;
	var apgListHeight = historyList.height();
	var historyItem = historyList.find(">ol>li");
	var gaugeBar = historyList.find(".gauge_bar");
	var hisItemOfsTop = new Array();
	var hisItemHeight = new Array();
	var hisItemIsView = new Array();
	var activeListOfsTop = new Array();
	var activeListIsView = new Array();

	historyItem.each(function(i) {
		hisItemOfsTop[i] = historyItem.eq(i).offset().top;
		hisItemHeight[i] = historyItem.eq(i).outerHeight();
		hisItemIsView[i] = false;

		activeListOfsTop[i] = historyItem.eq(i).find(">h3, .dot").offset().top;
		activeListIsView[i] = false;
	})

	$(window).on("load resize scroll",function() {
		historyItem.each(function(k) {
			if($(window).scrollTop() >= Math.ceil((hisItemOfsTop[k])-(parseInt($(window).height()-(hisItemHeight[k]/1.6)))) && hisItemIsView[k] == false) {
				historyItem.eq(k).addClass("view")
				hisItemIsView[k] = true;
			}

			if($(window).scrollTop() >= Math.ceil((activeListOfsTop[k])-(parseInt($(window).height()-(hisItemHeight[k]/1.4)))) && activeListIsView[k] == false) {
				historyItem.eq(k).addClass("active")
				activeListIsView[k] = true;
			} else if($(window).scrollTop() < Math.ceil((activeListOfsTop[k])-(parseInt($(window).height()-(hisItemHeight[k]/1.4)))) && activeListIsView[k] == true) {
				historyItem.eq(k).removeClass("active")
				activeListIsView[k] = false;
			}

			if($(window).scrollTop() >= histListOfsTop-($(window).height()/1.6)) {
				gaugeBar.css({
					"height": $(window).scrollTop() - histListOfsTop + ($(window).height()/1.6)+"px"
				})
			} else if($(window).scrollTop() < histListOfsTop-($(window).height()/1.6)) {
				gaugeBar.css({
					"height":"0px"
				})
			}
		})
	})
}

//인테리어 갤러리
function initIneriorGallery() {
	var ineriorGallery = $(".inerior_gallery");
	var screenshot = ineriorGallery.find(".screenshot");
	var galleryList = ineriorGallery.find(".gallery_list");
	var slides = galleryList.find(".list_slider ul.slides");
	var sItem = slides.find("li");
		sItem.eq(0).find("a").addClass("active");
	var sItemWidth = 0;
	var sLen = sItem.length;
	var restLen = sLen;
	var viewLen = 4;
	var totalCount = Math.ceil(sLen/viewLen)
	var current = 1
	var btnPrev = galleryList.find(".btn_guide_set button.prev");
	var btnNext = galleryList.find(".btn_guide_set button.next");
	var sInfoHeight = new Array();

	//보여줘야 하는 갯수보다 실제 갯수가 적을 때
	if(sLen <= viewLen) {
		btnPrev.hide();
		btnNext.hide();
	}

	//레이아웃 세팅
	function slideLayout() {
		sItemWidth = sItem.width()+35
		slides.css({
			"width": sItemWidth*sLen+"px"
		})
	}
	slideLayout();

	//스크린 샷 세팅
	function viewScreenshot() {
		imgSrc = sItem.find("a.active").attr("href");
		screenshot.find("img").attr("src",imgSrc);

		if(screenshot.hasClass("load") == false) {
			screenshot.addClass("load")
		}
	}
	viewScreenshot();

	//이전
	btnPrev.off().on("click",function() {
		btnPrev.prop("disabled",true);
		current--;
		restLen = restLen+viewLen;
		var movement = 0;
		if (restLen  == sLen) {
			restLen = sLen
			movement = 0;
		} else if (restLen == sLen+viewLen) {
			current = totalCount;
			restLen = sLen%viewLen;
			movement = -(sItemWidth*(sLen-viewLen))
		} else {
			movement = "+="+sItemWidth*viewLen;
		}
		slides.animate({
			"marginLeft":movement+"px"
		},300,function() {
			btnPrev.prop("disabled",false);
		})
	})

	//다음
	btnNext.off().on("click",function() {
		btnNext.prop("disabled",true);
		current++;
		restLen = restLen-viewLen;
		var movement = 0;
		if (restLen < viewLen && restLen > 0) {
			movement = -sItemWidth*(sLen-viewLen);
		} else if(restLen < viewLen) {
			current = 1;
			restLen = sLen;
			movement = 0
		} else {
			movement = "-="+sItemWidth*viewLen;
		}
		slides.animate({
			"marginLeft":movement+"px"
		},300,function() {
			btnNext.prop("disabled",false);
		})
	})
	
	//아이템 클릭시 스크린샷 변경
	sItem.find("a").on("click",function() {
		tSrc = $(this).attr("href");
		sItem.find("a").removeClass("active");
		$(this).addClass("active")

		screenshot.find("img").attr("src",tSrc);

		return false;
	})
}

//견본주택 슬라이드 목록
function initSampleHouseList() {
	var sampleHouseList = $(".sample_house_list");
	var slideScroll = sampleHouseList.find(".slide_scroll");
	var slideList = slideScroll.find("ul.slides");
	var btnPrev = sampleHouseList.find(".btn_guide_set button.prev");
	var btnNext = sampleHouseList.find(".btn_guide_set button.next");
	var wrapWidth;
	var listWidth;
	var moving;

	$(window).on("load resize",function() {
		wrapWidth = slideScroll.width();
		moving = slideScroll.width();
		listWidth = slideList.width();
		btnSetting();
	})

	//이전 클릭시
	btnPrev.on("click",function() {
		btnPrev.prop("disabled",true);
		moving = moving - (wrapWidth/2);
		slideScroll.animate({
			"scrollLeft": "-="+(wrapWidth/2)
		},500,function() {
			btnPrev.prop("disabled",false)
		})
		btnSetting();
	})

	//다음 클릭시
	btnNext.on("click",function() {
		btnNext.prop("disabled",true);
		moving = moving + (wrapWidth/2);
		slideScroll.animate({
			"scrollLeft": "+="+(wrapWidth/2)
		},500,function() {
			btnNext.prop("disabled",false)
		})
		btnSetting();
	})

	//버튼 세팅
	function btnSetting() {
		if(moving >= listWidth && wrapWidth <= listWidth) {
			btnPrev.addClass("on");
			btnNext.removeClass("on");
		} else if(moving <= wrapWidth && wrapWidth <= listWidth) {
			btnPrev.removeClass("on");
			btnNext.addClass("on");
		} else if(wrapWidth > listWidth) {
			btnPrev.removeClass("on");
			btnNext.removeClass("on");
		} else {
			btnPrev.addClass("on");
			btnNext.addClass("on");
		}
	}
}

//헤스티아 서비스
function initHestia() {
	var serviceContents = $("#contents");
	var sCont = serviceContents.find(".service_content");
	var sOfsTop = new Array();
	var sHeight = new Array();
	var sIsView = new Array();

	sCont.each(function(i) {
		sOfsTop[i] = sCont.eq(i).offset().top;
		sHeight[i] = sCont.eq(i).outerHeight();
		sIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		sCont.each(function(k) {
			if($(window).scrollTop() >= Math.ceil(sOfsTop[k]-($(window).height()/1.8)) && sIsView[k] == false) {
				sCont.eq(k).addClass("view")
				sIsView[k] = true;
			}
		})
	})
}

//AS 신청절차
function initAsProcess() {
	var asProcessGuide = $(".as_process_guide");
	var apgList = asProcessGuide.find(".apg_list");
	var apgListOfsTop = apgList.offset().top;
	var apgListHeight = apgList.height();
	var apgItem = apgList.find(">ol>li");
	var gaugeBar = apgList.find(".gauge_bar");
	var apgItemOfsTop = new Array();
	var apgItemHeight = new Array();
	var apgItemIsView = new Array();
	var activeItemOfsTop = new Array();
	var activeItemIsView = new Array();

	apgItem.each(function(i) {
		apgItemOfsTop[i] = apgItem.eq(i).offset().top;
		apgItemHeight[i] = apgItem.eq(i).outerHeight();
		apgItemIsView[i] = false;

		activeItemOfsTop[i] = apgItem.eq(i).find(">h3").offset().top;
		activeItemIsView[i] = false;
	})

	$(window).on("load resize scroll",function() {
		apgItem.each(function(k) {
			if($(window).scrollTop() >= Math.ceil((apgItemOfsTop[k])-(parseInt($(window).height()-(apgItemHeight[k]/1.6)))) && apgItemIsView[k] == false) {
				apgItem.eq(k).addClass("view")
				apgItemIsView[k] = true;
			}

			if($(window).scrollTop() >= Math.ceil((activeItemOfsTop[k])-(parseInt($(window).height()-(apgItemHeight[k]/1.06)))) && activeItemIsView[k] == false) {
				apgItem.eq(k).addClass("active")
				activeItemIsView[k] = true;
			} else if($(window).scrollTop() < Math.ceil((activeItemOfsTop[k])-(parseInt($(window).height()-(apgItemHeight[k]/1.06)))) && activeItemIsView[k] == true) {
				apgItem.eq(k).removeClass("active")
				activeItemIsView[k] = false;
			}

			if($(window).scrollTop() >= apgListOfsTop-($(window).height()/1.6)) {
				gaugeBar.css({
					"height": $(window).scrollTop() - apgListOfsTop + ($(window).height()/1.6)+"px"
				})
			} else if($(window).scrollTop() < apgListOfsTop-($(window).height()/1.6)) {
				gaugeBar.css({
					"height":"0px"
				})
			}
		})
	})
}

//입주 전 서비스
function occupancyBeforeService() {
	var serviceContents = $("#contents");
	var sCont = serviceContents.find(".service_content");
	var sOfsTop = new Array();
	var sHeight = new Array();
	var sIsView = new Array();

	sCont.each(function(i) {
		sOfsTop[i] = sCont.eq(i).offset().top;
		sHeight[i] = sCont.eq(i).outerHeight();
		sIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		sCont.each(function(k) {
			//console.log(Math.ceil((sOfsTop[k])-parseInt($(window).height()/3) ))
			if($(window).scrollTop() >= Math.ceil((sOfsTop[k])-(parseInt($(window).height()-(sHeight[k]/2.2)))) && sIsView[k] == false) {
				sCont.eq(k).addClass("view")
				sIsView[k] = true;
			}
		})
	})
}

//입주절차 원형 그래프
function initOccupancyProcess() {
	var el, c1;
	var occupancyProcess = document.getElementById("occupancy_process");
	var opItem = occupancyProcess.getElementsByTagName("li");
	var gaugeColor = ["rgba(30,190,192,0.3)","rgba(30,190,192,0.5)","rgba(30,190,192,0.7)","rgba(30,190,192,0.9)","rgba(27,156,158,1)"]

	for(var i=0; i<opItem.length; i++) {
		el = opItem[i].getElementsByClassName("gauge")[0];
		//console.log(el.length)
		$(el).text((100/opItem.length)*(i+1)+"%")
		c1 = new CircleChart(el, {
			stroke: 10,
			maxVal: 100,
			trackColour: '#ECECEC',
			fill: gaugeColor[i],
			animationSpeed: 1000+(i*200),
		});
	}
}

//입주안내문 다운로드
function initOccupancyGuide() {
	var occupancyGuide = $(".occupancy_guide");
	var ogList = occupancyGuide.find("ul.og_list");
	var ogItem = ogList.find("li");

	$(window).on("load resize",function(i) {
		ogItem.each(function() {
			ogThis = $(this);
			period = ogThis.find("p.period");
			pdName = ogThis.find("p.name");
			guide = ogThis.find("p.guide");
			photo = ogThis.find(".photo");
			btnPDF = ogThis.find(".btn_pdf");
			
			console.log(photo.length)
			photo.css({
				"height": ogThis.height()-period.outerHeight()-pdName.outerHeight()-guide.outerHeight()-btnPDF.outerHeight()+"px"
			},200)
		})
	})
}

//마이페이지 동*호수 변경
function changeDongHoo() {
	var registAptNumber = $("#regist_apt_number")
	var dongNumber = $("select#dong_number");
	var aptHosuResult = $(".apt_hosu_result");
	var hosuList = aptHosuResult.find("table.hosu_list");
	var hosuLabel = hosuList.find("label");
	var hosuRadio = hosuLabel.find("input[name='hosu_number']");
	var dongHosuView = aptHosuResult.find("p.dong_hosu_view");
	var dongHosuResult = dongHosuView.find("span#dong_hosu_result");
	var viewDong = dongHosuResult.find("strong#dhr_dong");
	var inputDong = dongHosuView.find("input#dong");
	var viewHosu = dongHosuResult.find("strong#dhr_hosu");
	var inputHosu = dongHosuView.find("input#hosu");
	var btnSubmit = registAptNumber.find(".btn_lp_set a.submit")
		console.log(btnSubmit.length)

	hosuRadio.on("change",function() {
		dnValue = dongNumber.val();
		//console.log(parseInt(dnValue))
		hsValue = $(this).val();

		if(parseInt(dnValue) > 0) {
			dongHosuResult.show()

			hosuLabel.removeClass("active");
			$(this).parent().addClass("active");

			viewDong.text(dnValue);
			inputDong.val(dnValue);
			viewHosu.text(hsValue);
			inputHosu.val(hsValue);

			//console.log(registAptNumber.find(".lp_content").prop('scrollHeight'))

			registAptNumber.find(".lp_content").animate({
				"scrollTop": parseInt(registAptNumber.find(".lp_content").prop('scrollHeight') - registAptNumber.find(".lp_content").height())
			},200)
			
			btnSubmit.removeClass("disabled")
		}
	})
}

//마이페이지 공사진행현황 갤러리
function mypageConstructionProgress(mcpID) {
	var constructionProgress = $(mcpID);
		if(constructionProgress.hasClass("construction_progress") == false) return false;
	var screenshot = constructionProgress.find(".screenshot");
	var galleryList = constructionProgress.find(".gallery_list");
	var slides = galleryList.find(".list_slider ul.slides");
	var sItem = slides.find("li");
		sItem.eq(0).find("a").addClass("active");
	var sItemWidth = 0;
	var sLen = sItem.length;
	var restLen = sLen;
	var viewLen = 4;
	var totalCount = Math.ceil(sLen/viewLen)
	var current = 1
	var btnPrev = galleryList.find(".btn_guide_set button.prev");
	var btnNext = galleryList.find(".btn_guide_set button.next");
	var sInfoHeight = new Array();

	//보여줘야 하는 갯수보다 실제 갯수가 적을 때
	if(sLen <= viewLen) {
		btnPrev.hide();
		btnNext.hide();
	}

	//레이아웃 세팅
	function slideLayout() {
		sItemWidth = sItem.width()+20
		slides.css({
			"width": sItemWidth*sLen+"px"
		})
	}
	slideLayout();

	//스크린 샷 세팅
	function viewScreenshot() {
		imgSrc = sItem.find("a.active").attr("href");
		screenshot.find("img").attr("src",imgSrc);

		if(screenshot.hasClass("load") == false) {
			screenshot.addClass("load")
		}
	}
	viewScreenshot();

	//이전
	btnPrev.off().on("click",function() {
		btnPrev.prop("disabled",true);
		current--;
		restLen = restLen+viewLen;
		//console.log(restLen)
		var movement = 0;
		if (restLen  == sLen) {
			//console.log("a");
			restLen = sLen
			movement = 0;
		} else if (restLen == sLen+viewLen) {
			//console.log("b");
			current = totalCount;
			restLen = sLen%viewLen;
			movement = -(sItemWidth*(sLen-viewLen))
		} else {
			//console.log("c");
			movement = "+="+sItemWidth*viewLen;
		}
		slides.animate({
			"marginLeft":movement+"px"
		},300,function() {
			btnPrev.prop("disabled",false);
		})
	})

	//다음
	btnNext.off().on("click",function() {
		btnNext.prop("disabled",true);
		current++;
		restLen = restLen-viewLen;
		//console.log(restLen)
		var movement = 0;
		if (restLen < viewLen && restLen > 0) {
			//console.log("d");
			movement = -sItemWidth*(sLen-viewLen);
		} else if(restLen < viewLen) {
			//console.log("e");
			current = 1;
			restLen = sLen;
			movement = 0
		} else {
			//console.log("f");
			movement = "-="+sItemWidth*viewLen;
		}
		slides.animate({
			"marginLeft":movement+"px"
		},300,function() {
			btnNext.prop("disabled",false);
		})
	})
	
	//아이템 클릭시 스크린샷 변경
	sItem.find("a").on("click",function() {
		tSrc = $(this).attr("href");
		sItem.find("a").removeClass("active");
		$(this).addClass("active")

		screenshot.find("img").attr("src",tSrc);

		return false;
	})
}

function mainScrollInt() {
	var mainContainer = $("#container");
	var mainVisuial = mainContainer.find("#main_visual");
	var mainCont = mainContainer.find("section.main_content>article, >section.main_content>aside");
	var msOfsTop = new Array();
	var msHeight = new Array();
	var msIsView = new Array();

	mainCont.each(function(i) {
		msOfsTop[i] = mainCont.eq(i).offset().top;
		msHeight[i] = mainCont.eq(i).outerHeight();
		msIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		mainCont.each(function(k) {
			//console.log(Math.ceil((msOfsTop[k])-parseInt($(window).height()/3) ))
			if($(window).scrollTop() >= Math.ceil((msOfsTop[k])-(parseInt($(window).height()-(msHeight[k]/2.2)))) && msIsView[k] == false) {
				mainCont.eq(k).addClass("view")
				msIsView[k] = true;
			}
		})
	})
}

function gallScrollInt() {
	var galContainer = $("#gallery_container");
	var galCont = galContainer.find(">div");
	var galOfsTop = new Array();
	var galHeight = new Array();
	var galIsView = new Array();
	var galleryBrochure = $("section#gallery_brochure");
	var gbIView = false;

	galCont.each(function(i) {
		galOfsTop[i] = galCont.eq(i).offset().top;
		galHeight[i] = galCont.eq(i).outerHeight();
		galIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		galCont.each(function(k) {
			if($(window).scrollTop() >= Math.ceil((galOfsTop[k])-(parseInt($(window).height()-(galHeight[k]/2.2)))) && galIsView[k] == false) {
				galCont.eq(k).addClass("view")
				galIsView[k] = true;
			}
		})

		if($(window).scrollTop() >= galleryBrochure.offset().top-($(window).height()/1.2) && gbIView == false) {
			galleryBrochure.find(".brochure").addClass("view");
			gbIView = true
		}
	})
}

function mainVisualSlide(autoIs) {
	var mainVisual = $("section#main_visual");
	var mvSlider = mainVisual.find(".mv_slider");
	var mvsList = mvSlider.find("ul.slides");
	var mvsItem = mvsList.find(">li");
	var mvsTotal = mvsItem.length;
	var mvsCurrent = 1;
	var mvsItemFirst = mvsList.find(">li:first-child").clone(true);
	var mvsItemLast = mvsList.find(">li:last-child").clone(true);
	var btnPrev = mainVisual.find(".btn_guide_set button.prev");
	var btnNext = mainVisual.find(".btn_guide_set button.next");
	var btnNavi = mainVisual.find(".btn_navi ol");
	var btnPlayer = mainVisual.find(".btn_navi .btn_player button");
	var autoslide;
	var restWidth = null;
	var tTerms = parseInt(mvsItem.eq(mvsCurrent-1).attr("data-timer"));
	
	$(window).on("load",function() {
		mvSlider.stop().animate({
			"opacity": 1
		},500,function() {
			if(mvsItem.eq(mvsCurrent-1).find("video").length > 0) {
				mvsItem.eq(mvsCurrent-1).find("video").get(0).play();
			}
		})
	})

	//메인비주얼이 1개일 때 처리
	if(mvsTotal == 1) {
		btnPrev.hide();
		btnNext.hide();
		btnNavi.hide();
		btnPlayer.hide();

		return false;
	}

	btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
	btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
		"width":"100%"
	},tTerms,"linear")
	var playCurent = autoIs;
	if(playCurent == true) {
		autoMove();
		btnPlayer.addClass("pause")
	}
	mvsList.append(mvsItemFirst);
	mvsList.prepend(mvsItemLast);

	function slideSetting() {
		mvsList.find(">li").css({
			"width": mvSlider.width()+"px",
		})
		mvsList.css({
			"width": mvSlider.width()*(mvsTotal+2)+"px",
			"marginLeft": "-"+mvSlider.width()*mvsCurrent+"px"
		})
	}
	$(window).on("load resize",slideSetting);

	btnNext.on("click",function() {
		btnNavi.find("li a span.gauge").stop();
		if(playCurent == true) {
			clearTimeout(autoslide)
		}
		tTerms = 0;
		restWidth = null;
		if(mvsItem.find("video").length > 0) {
			mvsItem.find("video").each(function(a) {
				mvsItem.find("video").get(a).currentTime = 0;
				mvsItem.find("video").get(a).pause();
			})
		}
		thisBtn = $(this);
		thisBtn.prop("disabled",true);
		mvsCurrent++;
		mvsList.animate({
			"marginLeft": "-="+mvSlider.width()+"px"
		},function() {
			if(mvsCurrent > mvsTotal) {
				mvsList.css({
					"marginLeft": "-"+mvSlider.width()+"px"
				})
				mvsCurrent = 1;
			}
			tTerms = parseInt(mvsItem.eq(mvsCurrent-1).attr("data-timer"));
			btnNavi.find("li a").removeClass("active");
			btnNavi.find("li a span.gauge").fadeOut(300,function() {
				btnNavi.find("li a span.gauge").removeAttr("style")
			})
			btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
			if(playCurent == true) {
				btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
					"width":"100%"
				},parseInt(tTerms-50),"linear")
			}
			if(mvsItem.eq(mvsCurrent-1).find("video").length > 0) {
				mvsItem.eq(mvsCurrent-1).find("video").get(0).play();
			}
			setTimeout(function() {
				thisBtn.prop("disabled",false);
			},500)
			
			if(playCurent == true) {
				autoMove()
			}
		})
	})

	btnPrev.off().on("click",function() {
		btnNavi.find("li a span.gauge").stop();
		if(playCurent == true) {
			clearTimeout(autoslide)
		}
		tTerms = 0;
		restWidth = null;
		if(mvsItem.find("video").length > 0) {
			mvsItem.find("video").each(function(b) {
				mvsItem.find("video").get(b).pause();
			})
		}
		thisBtn = $(this);
		thisBtn.prop("disabled",true);
		mvsCurrent--;
		mvsList.stop().animate({
			"marginLeft": "+="+mvSlider.width()+"px"
		},function() {
			if(mvsCurrent < 1) {
				mvsList.css({
					"marginLeft": "-"+mvSlider.width()*(mvsTotal)+"px"
				})
				mvsCurrent = mvsTotal;
			}
			tTerms = parseInt(mvsItem.eq(mvsCurrent-1).attr("data-timer"));
			btnNavi.find("li a").removeClass("active");
			btnNavi.find("li a span.gauge").fadeOut(300,function() {
				btnNavi.find("li a span.gauge").removeAttr("style")
			})
			btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
			if(playCurent == true) {
				btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
					"width":"100%"
				},parseInt(tTerms-50),"linear")
			}
			if(mvsItem.eq(mvsCurrent-1).find("video").length > 0) {
				mvsItem.eq(mvsCurrent-1).find("video").get(0).currentTime = 0;
				mvsItem.eq(mvsCurrent-1).find("video").get(0).play();
			}
			setTimeout(function() {
				thisBtn.prop("disabled",false);
			},500)
			
			if(playCurent == true) {
				autoMove()
			}
		})
	})

	btnNavi.off().find(">li>a").on("click",function() {
		tIndex = $(this).parent().index()+1;
		if(mvsItem.find("video").length > 0) {
			mvsItem.find("video").each(function(c) {
				mvsItem.find("video").get(c).pause();
			})
		}
		mvsCurrent = tIndex;
		mvsList.stop().animate({
			"marginLeft": "-"+mvSlider.width()*(mvsCurrent)+"px"
		},function() {
			if(mvsItem.eq(mvsCurrent-1).find("video").length > 0) {
				mvsItem.eq(mvsCurrent-1).find("video").get(0).currentTime = 0;
				mvsItem.eq(mvsCurrent-1).find("video").get(0).play();
			}
		})
		btnNavi.find("li a").removeClass("active");
		btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
		
		if(playCurent == true) {
			btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
				"width":"100%"
			},parseInt(tTerms-50),"linear")
			clearTimeout(autoslide)
			autoMove()
		}
	})

	btnPlayer.on("click",function() {
		if(playCurent == true) {
			playCurent = false;
			btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").stop();
			restWidth = 100 - Number(btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").width());
			btnPlayer.removeClass("pause")
			clearTimeout(autoslide)
		} else if(playCurent == false) {
			playCurent = true;
			tTerms = tTerms*(restWidth/100)
			btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
				"width":"+="+restWidth+"%"
			},tTerms,"linear",function() {
				console.log(mvsTotal+" , "+mvsCurrent)
				if(mvsTotal == mvsCurrent) {
					btnNext.click();
				}
			})
			if(tTerms == 0) {
				ty = parseInt(mvsItem.eq(mvsCurrent-1).attr("data-timer"));
				btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
					"width":"100%"
				},parseInt(ty-50),"linear",function() {
					autoMove()
				})
			} else {
				autoMove()
			}
			
			btnPlayer.addClass("pause")
		}
	})

	//자동 롤링
	function autoMove() {
		autoslide = setTimeout(function() {
			if(playCurent == true) {
				btnNavi.find("li a span.gauge").stop();
				if(mvsItem.find("video").length > 0) {
					mvsItem.find("video").each(function(d) {
						mvsItem.find("video").get(d).pause();
					})
				}
				if(mvsTotal > mvsCurrent) {
					mvsCurrent++;
					mvsList.stop().animate({
						"marginLeft": "-="+mvSlider.width()+"px"
					},function() {
						tTerms = parseInt(mvsItem.eq(mvsCurrent-1).attr("data-timer"));
						btnNavi.find("li a").removeClass("active");
						btnNavi.find("li a span.gauge").fadeOut(300,function() {
							btnNavi.find("li a span.gauge").removeAttr("style")
						})
						btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
						btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
							"width":"100%"
						},parseInt(tTerms-50),"linear")
						
						if(mvsItem.eq(mvsCurrent-1).find("video").length > 0) {
							mvsItem.eq(mvsCurrent-1).find("video").get(0).currentTime = 0;
							mvsItem.eq(mvsCurrent-1).find("video").get(0).play();
						}
						
						clearTimeout(this)
						autoMove()
					})
				} else {
					btnPlayer.click();
				}
			}
		},tTerms)
	}
}

function mainPreSale() {
	var saleList = $("#main_pre_sale .sale_list");
	var slides = saleList.find(".list_slider ul.slides");
	var sItem = slides.find("li");
	var sItemWidth = 0;
	var sLen = sItem.length;
	var restLen = sLen;
	var viewLen = 3;
	var totalCount = Math.ceil(sLen/viewLen)
	var current = 1
	var btnPrev = saleList.find(".btn_guide_set button.prev");
	var btnNext = saleList.find(".btn_guide_set button.next");
	var btnInd = saleList.find(".btn_guide_set .btn_navi ol");
	var sInfoHeight = new Array();

	if(sLen <= viewLen) {
		btnPrev.hide();
		btnNext.hide()
		btnInd.hide();
	}

	//화면 리사이즈에 따른 레이아웃 변경
	function slideLayout() {
		if($(this).width() >= 1416) {
			sItemWidth = sItem.width()+45
			slides.css({
				"width": sItemWidth*sLen+"px"
			})
		} else if($(this).width() < 1416) {
			sItemWidth = sItem.width()+31
			slides.css({
				"width": sItemWidth*sLen+"px"
			})
		}
	
		//아이템 영역에 마우스 오버 시
		sItem.find(".desc .info").css({
			"paddingTop": "",
			"height": ""
		})
		sItem.each(function(i) {
			sInfoHeight[i] = sItem.eq(i).find(".desc .info").height();
			sItem.eq(i).find(".desc .info").css({
				"paddingTop": "0px",
				"height": "0px"
			});
		})
	}
	slideLayout();
	$(window).on("resize",slideLayout)

	//슬라이드 아이템 겟수 체크하여 뿌리기
	for(var s=0; s<totalCount; s++) {
		btnInd.append("<li><a href='javascript:void(0)'>"+(s+1)+"</a></li>")
	}
	btnInd.find("li:nth-child("+current+") a").addClass("active");
	//이전
	btnPrev.off().on("click",function() {
		btnPrev.prop("disabled",true);
		current--;
		btnInd.find("li a").removeClass("active");
		btnInd.find("li:nth-child("+current+") a").addClass("active");
		restLen = restLen+viewLen;
		//console.log(restLen)
		var movement = 0;
		if (restLen  == sLen) {
			//console.log("a");
			restLen = sLen
			movement = 0;
		} else if (restLen == sLen+viewLen) {
			//console.log("b");
			current = totalCount;
			restLen = sLen%viewLen;
			movement = -(sItemWidth*(sLen-viewLen))
			btnInd.find("li:nth-child("+current+") a").addClass("active");
		} else {
			//console.log("c");
			movement = "+="+sItemWidth*viewLen;
		}
		slides.animate({
			"marginLeft":movement+"px"
		},300,function() {
			btnPrev.prop("disabled",false);
		})
	})

	//다음
	btnNext.off().on("click",function() {
		btnNext.prop("disabled",true);
		current++;
		btnInd.find("li a").removeClass("active");
		btnInd.find("li:nth-child("+current+") a").addClass("active");
		restLen = restLen-viewLen;
		//console.log(restLen)
		var movement = 0;
		if (restLen < viewLen && restLen > 0) {
			//console.log("d");
			movement = -sItemWidth*(sLen-viewLen);
		} else if(restLen < viewLen) {
			//console.log("e");
			current = 1;
			restLen = sLen;
			movement = 0
			btnInd.find("li:nth-child("+current+") a").addClass("active");
		} else {
			//console.log("f");
			movement = "-="+sItemWidth*viewLen;
		}
		slides.animate({
			"marginLeft":movement+"px"
		},300,function() {
			btnNext.prop("disabled",false);
		})
	})

	//인디케이터 클릭시
	btnInd.find(">li>a").off().on("click",function() {
		var indexNum = $(this).parent().index()+1;
		btnInd.find("li a").removeClass("active");
		btnInd.find("li:nth-child("+indexNum+") a").addClass("active");
		current = indexNum
		restLen = sLen-(((indexNum-1)*viewLen));
		//console.log(restLen)
		if(indexNum == 1) {
			slides.animate({
				"marginLeft":"0px"
			})
		} else if(indexNum == totalCount) {
			slides.animate({
				"marginLeft":"-"+sItemWidth*(sLen-viewLen)+"px"
			})
		} else {
			slides.animate({
				"marginLeft":"-"+sItemWidth*(viewLen*(indexNum-1))+"px"
			})
		}
	})

	sItem.on("mouseenter",function() {
		tIndex = $(this).index();
		tpaddingTop = function() {
			if($(window).width() <= 1440) {
				return 12
			} else {
				return 24
			}
		}

		$(this).find(".desc .info").css({
			"paddingTop": tpaddingTop()+"px",
			"height": sInfoHeight[tIndex]+"px"
		});
	})

	sItem.on("mouseleave",function() {
		$(this).find(".desc .info").css({
			"paddingTop": "0px",
			"height": "0px"
		});
	})
}

function mainTimesList() {
	var mainTimes = $("article#main_times,#mypage_times");
	var mtList = mainTimes.find("ul.times_list");
	var mtItem = mtList.find("li");

	mtItem.find(">a").on("mouseenter focusin",function() {
		mtItem.find(">a").removeClass("active")
		$(this).addClass("active")
	})

	mtList.on("mouseleave",function() {
		mtItem.find(">a").removeClass("active");
	})
}

function mainNewsList() {
	var mainNews = $("article#main_news");
	var newsList = mainNews.find("ul.news_list");
	var nItem = newsList.find("li");
	var nHeight = nItem.outerHeight();
	var nLen = nItem.length;
	var nCurrent = 1;
	var cloneFirst = nItem.first().clone(true);
	var cloneLast = nItem.last().clone(true);
	var btnPrev = mainNews.find(".btn_guide_set button.prev");
	var btnNext = mainNews.find(".btn_guide_set button.next");
	var autoIs = false;
	var mouseOver = false;

	if(nLen <= 1) {
		btnPrev.css({"opacity": "0.15","cursor":"default"})
		btnNext.css({"opacity": "0.15","cursor":"default"})
		return false;
	}
	
	newsList.prepend(cloneLast);
	newsList.append(cloneFirst);
	newsList.css({
		"marginTop":"-"+nHeight+"px"
	})

	btnPrev.on("click",function() {
		nCurrent--;
		newsList.animate({
			"marginTop":"+="+nHeight+"px"
		},300,function() {
			if(nCurrent == 0) {
				nCurrent = nLen;
				newsList.css({
					"marginTop":"-"+nHeight*nLen+"px"
				})
			}
		})
	})
	btnNext.on("click",function() {
		nCurrent++;
		newsList.animate({
			"marginTop":"-="+nHeight+"px"
		},300,function() {
			if(nCurrent == nLen+1) {
				nCurrent = 1;
				newsList.css({
					"marginTop":"-"+nHeight+"px"
				})
			}
		})
	})

	mainNews.find(".btn_guide_set button").on("mouseenter",function() {
		mouseOver = true
	})
	mainNews.find(".btn_guide_set button").on("mouseleave",function() {
		mouseOver = false
	})

	setInterval(function() {
		if(mainNews.hasClass("view") && autoIs == false) {
			autoIs = true
		}

		if(autoIs == true && mouseOver == false) {
			nCurrent++;
			newsList.animate({
				"marginTop":"-="+nHeight+"px"
			},300,function() {
				if(nCurrent == nLen+1) {
					nCurrent = 1;
					newsList.css({
						"marginTop":"-"+nHeight+"px"
					})
				}
			})
		}
	},3000)
}

function mainGallery() {
	var mainGallery = $("section#main_gallery");
	var galleryList = $("ul.gallery_list");
	var gItem = galleryList.find("li");

	gItem.find("a.btn").on("mouseenter focusin",function() {
		gItem.find(".photo").removeClass("on");
		$(this).parent().find(".photo").addClass("on");
	})

	gItem.find("a.btn").on("mouseleave focusout",function() {
		gItem.find(".photo").removeClass("on");
	})
}

function mainStoragePopup() {
	if($(".main_storage_popup").length == 0) return false;

	var mainStoragePopup = $(".main_storage_popup");
    var fHeight;
	var btnClose = mainStoragePopup.find("button.btn_close")

    $(window).on("resize scroll",function() {
		fHeight = $("#footer_wrap").height();

		if($(this).scrollTop() < $(window).height()/2) {
			mainStoragePopup.css({
				"right": "20px"
			})
		} else {
			mainStoragePopup.css({
				"right": "110px"
			})
		}

        if($(this).scrollTop() >= document.documentElement.scrollHeight-fHeight-$(this).height()) {
            mainStoragePopup.css({
                "position": "absolute",
                "bottom": "auto",
                "top": document.documentElement.scrollHeight-fHeight-mainStoragePopup.height()-48+"px"
            })
        } else {
            mainStoragePopup.css({
                "position": "fixed",
                "bottom": "22px",
                "top": "auto"
            })
        }
    })

	btnClose.on("click",function() {
		mainStoragePopup.fadeOut(200)
	})
}

function topBannerClose() {
	var topBanner = $("#top_banner_wrap");
	topBanner.slideUp(200);
}

function initHeader() {
	if($("#container").length == 0) return false;

	var topBannerWrap = $("#top_banner_wrap");
	if(topBannerWrap.length > 0) {
		var tbHeight = topBannerWrap.outerHeight();
		var btnTbClose = topBannerWrap.find("button.btn_close");
	}
	var headerWrap = $("#header_wrap2");
	var hwOffsetTop = headerWrap.offset().top;
	var hwIsFixed = false;
	var container = $("#container");
	var lnb = container.find(".contain_header");
	var lOfsTop;
	if(lnb.length > 0) {
		lOfsTop = lnb.offset().top
	}
	var footer = $("footer#footer");
	var fHeight;
	if(footer.length > 0) {
		fHeight = footer.outerHeight();
	} else {
		fHeight = 0;
	}
	var lIsFixed = false;
	var oldScrollTop = 0;
	var newScrollTop = 0;

	$(window).on("load resize",function() {
		oldScrollTop = $(this).scrollTop();
		newScrollTop = $(this).scrollTop();
	})

	$(window).on("load scroll",function() {
		newScrollTop = $(this).scrollTop();
		if($(this).scrollTop() > hwOffsetTop && lnb.length == 0 && hwIsFixed == false) {
			headerWrap.css({
				"position":"fixed",
				"top": "0px"
			})
			container.css({
				"marginTop": headerWrap.height()+"px"
			})
			hwIsFixed = true
		} else if($(this).scrollTop() <= hwOffsetTop && lnb.length == 0 && hwIsFixed == true) {
			headerWrap.css({
				"position":"relative",
				"top": "0px"
			})
			container.css({
				"marginTop": ""
			})
			hwIsFixed = false
		}

		if($(this).scrollTop() > lOfsTop && lnb.length > 0 && lIsFixed == false) {
			lnb.css({
				"position":"fixed",
				"top": "0px",
				"transition": ""
			})
			container.css({
				"paddingTop": headerWrap.height()+lnb.height()+"px"
			})
			lIsFixed = true
		} else if($(this).scrollTop() <= hwOffsetTop && lnb.length > 0 && lIsFixed == true) {
			headerWrap.css({
				"position":"relative",
				"top": "0px",
				"transition": "0s ease top"
			})
			lnb.css({
				"position":"relative",
				"top": "0px",
				"transition": "0s ease top"
			})
			container.css({
				"paddingTop": ""
			})
			lIsFixed = false
		}

		if($(window).scrollTop() >= document.documentElement.scrollHeight-$(window).height()-fHeight && $("#sitemap").is(":hidden") && lIsFixed == true || oldScrollTop > newScrollTop+2 && $("#sitemap").is(":hidden") && lIsFixed == true) {
			headerWrap.css({
				"position":"fixed",
				"top": "0px",
				"transition": ""
			})
			lnb.css({
				"position":"fixed",
				"top": headerWrap.height()+"px"
			})
			
		} else if(oldScrollTop+2 <= newScrollTop && $("#sitemap").is(":hidden") && lIsFixed == true) {
			headerWrap.css({
				"position":"fixed",
				"top": "-"+headerWrap.height()+"px"
			})
			lnb.css({
				"position":"fixed",
				"top": "0px"
			})
		}
		oldScrollTop = newScrollTop;
	})

	//탑배너 닫을 시 헤더 Offset Top 재설정
	if(topBannerWrap.length > 0) {
		btnTbClose.on("click",function() {
			hwOffsetTop-=tbHeight
		})
	}
}

function initGnb() {
	var header = $("header#header");
	var gnb = header.find("nav#gnb");
	var gitem = gnb.find(">ul>li");
	var gOrgIndex = gitem.find(">a.active").parent().index();
		//console.log(gOrgIndex)
	var eventPromotion = header.find(".event_promotion")
	var bgGnb = $("#header_wrap2 .bg_gnb");
	var barGnb = $("#header_wrap2 .bar_gnb");
	var bgModal = $("#bg_modal");
	var isOpen = false;

	gitem.find(">a").on("mouseenter focusin",function() {
		var tLink = $(this);
		gitem.find(">a").removeClass("active");
		if(isOpen == false) {
			setTimeout(function() {
				bgModal.addClass("gnb");
				gitem.find(">a").removeClass("active");
				tLink.addClass("active");
				gnbBar(tLink);
				barGnb.stop().fadeIn(300);
				isOpen = true;
			},100)
		} else {
			tLink.addClass("active");
			gnbBar(tLink)
			
		}

		setTimeout(function() {
			bgGnb.stop().slideDown(300);
			gitem.find(">ul").stop().slideDown(300);
			if($(window).width() > 1440) {
				eventPromotion.stop().slideDown(300);
			}
		},100)
	})

	gitem.find(">ul.deps2>li").on("mouseover",function(e) {
		gitem.find(">a").removeClass("active");
		gnbBar($(this).parents("ul.deps2").prev())
		$(this).parents("ul.deps2").prev().addClass("active");
	})
	
	$("body").on("mouseleave",function() {
		gnbClose();
	})

	$("#top_banner_wrap, #container, header#header button,#bg_modal,aside.mymenu").on("mouseover",function(e) {
		gnbClose();
	})

	$("header#header button").on("focusin",function(e) {
		gnbClose();
	})

	function gnbClose() {
		setTimeout(function() {
			gitem.find(">a").removeClass("active");
			eventPromotion.stop().slideUp(150);
			barGnb.stop().fadeOut(300);
			gitem.find(">ul").stop().slideUp(300);
			bgGnb.stop().slideUp(300);
			if(gOrgIndex > -1) {
				gitem.find(">a").eq(gOrgIndex).addClass("active")
			}
			if(bgModal.hasClass("gnb")) {
				bgModal.removeClass("gnb");
			}
			isOpen = false;
		},100);
	}

	function gnbBar(tLink) {
		barGnb.css({
			"left":tLink.position().left+"px",
			"width":tLink.width()+"px"
		})
	}
}

function initSitemap() {
	if($("#header_wrap2").length == 0) return false;

	var topBannerWrap = $("#top_banner_wrap");
	var headerWrap = $("#header_wrap2");
	var btnSitemap = headerWrap.find("button.btn_sitemap");
	var bgModal = $("#bg_modal");
	var sitemap = $("#sitemap");
	var btnClose = sitemap.find("button.btn_close");
	var btnQuickSearch = $("a.btn_quick_search");
	var btnTop = $("button.btn_top");
	var openIs = false;
	
	$(window).on("resize",function() {
		if(openIs == true) {
			if(topBannerWrap.length > 0) {
				topBannerWrap.css({
					"width": $(window).width()+"px"
				})
			}
			headerWrap.css({
				"width": $(window).width()+"px"
			})
			$("html,body").css({
				"width": $(window).width()+"px",
				"overflow": "hidden"
			})
			sitemap.css({
				"top": headerWrap.position().top+headerWrap.height()+"px",
				"height": $(window).height()-headerWrap.position().top-headerWrap.height()+"px",
			})
			btnClose.css({
				"top": headerWrap.position().top+35+"px",
				"left": btnSitemap.offset().left+"px",
			})
		}
	})

	btnSitemap.on("click",function() {
		if(openIs == false) {
			if(topBannerWrap.length > 0) {
				if($(window).scrollTop() > 0 && $(window).scrollTop() < topBannerWrap.height()) {
					$(window).scrollTop(0)
				}
				topBannerWrap.css({
					"width":headerWrap.width()+"px"
				})
			}
			headerWrap.css({
				"width": headerWrap.width()+"px"
			})
			$("html,body").css({
				"width": headerWrap.width()+"px",
				"overflow": "hidden"
			})
			if(btnQuickSearch.length > 0) {
				btnQuickSearch.css({
					"right": $(window).width() - headerWrap.width()+"px"
				})
			}
			if(btnTop.length > 0) {
				btnTop.css({
					"right": 30+$(window).width() - headerWrap.width()+"px"
				})
			}
			sitemap.css({
				"top": headerWrap.position().top+headerWrap.height()+"px",
				"height": $(window).height()-headerWrap.position().top-headerWrap.height()+"px",
			})
			btnClose.css({
				"top": headerWrap.position().top+35+"px",
				"left": btnSitemap.offset().left+"px",
			})
			bgModal.addClass("sitemap");
			sitemap.fadeIn(200);
			openIs = true;
		}
	})

	btnClose.on("click",function() {
		bgModal.css({"overflow":"hidden"})
		sitemap.css({"overflow":"hidden"})
		if(topBannerWrap.length > 0) {
			topBannerWrap.css({
				"width":""
			})
		}
		headerWrap.css({
			"width": "",
			"padding-left": ""
		})
		$("html,body").css({
			"width": "",
			"overflow": ""
		})
		if(btnQuickSearch.length > 0) {
			btnQuickSearch.css({
				"right": ""
			})
		}
		if(btnTop.length > 0) {
			btnTop.css({
				"right": ""
			})
		}
		sitemap.fadeOut(200,function() {
			bgModal.css({"overflow":""})
			sitemap.css({"overflow":""})
			bgModal.removeClass("sitemap");
		});
		openIs = false;
		$(window).resize();
	})
}

function initMymenu() {
	var header = $("header#header");
	var btnMymenu = header.find("button.btn_mymenu");
	var mymenu = header.find(".mymenu");
	var btnClose = mymenu.find("button.btn_close");
	var btnSitemap = header.find("button.btn_sitemap");
	var isOpen = false;

	btnMymenu.on("click",function() {
		if(isOpen == false) {
			mymenu.show();

			isOpen = true;
		}
	})

	btnClose.on("click",function() {
		 if(isOpen == true) {
			mymenu.hide();

			isOpen = false;
		}
	})

	btnSitemap.on("click",function() {
		if(isOpen == true) {
			mymenu.hide();

			isOpen = false;
		}
	})
}

//Top Move
function initTopMove() {
	if($("#footer_wrap").length == 0) return false;

	var btnQuickSearch = $("body > a.btn_quick_search");
    var btnTop = $("body > button.btn_top");
    var fHeight;

	setTimeout(function() {
		if(btnQuickSearch.length > 0) {
			btnQuickSearch.animate({
				"opacity": 1
			},300)
		}
	},200)

    $(window).on("resize scroll",function() {
		if(btnTop.length == 0) return false;

		if($(this).scrollTop() < $(window).height()/2) {
			btnTop.fadeOut(300)
		} else {
			btnTop.fadeIn(300)
		}

		fHeight = $("#footer_wrap").height();

        //console.log($(document).outerHeight()+" , "+fHeight)

        if($(this).scrollTop() >= document.documentElement.scrollHeight-fHeight-$(this).height()) {
            btnTop.css({
                "position": "absolute",
                "bottom": "auto",
                "top": document.documentElement.scrollHeight-fHeight-btnTop.height()-30+"px"
            })
        } else {
            btnTop.css({
                "position": "fixed",
                "bottom": "30px",
                "top": "auto"
            })
        }
    })

    btnTop.on("click",function() {
        $("html,body").animate({
            "scrollTop": 0
        },300)
    })
}

//Selectbox Ui
function initSelectboxUi(selectbox) {
	selectboxUi = selectbox.parent("span.selectbox_ui");
	if(selectbox.prop("disabled") == true) {
		selectboxUi.addClass("disabled")
	} else {
		selectboxUi.removeClass("disabled")
	}

	selectedTxt = selectboxUi.find("select option:selected").text();
	selectboxUi.find("b.selected_txt").text(selectedTxt);
	
	selectboxUi.find("select").on("focusin",function() {
		$(this).parent().addClass("focus");
	})
	selectboxUi.find("select").on("focusout",function() {
		$(this).parent().removeClass("focus");
	})
	selectboxUi.find("select").on("change",function() {
		$(this).prev("b.selected_txt").text($(this).find("option:selected").text());
	})
}

//Radio Ui
function initRadioBtnUi(rdck) {
	var radioBtnUi = rdck.parent("span.radiobtn_ui");
	if(rdck.prop("disabled") == true) {
		radioBtnUi.addClass("disabled")
	} else {
		radioBtnUi.removeClass("disabled")
	}
	if(rdck.prop("checked") == true) {
		radioBtnUi.addClass("checked")
	} else {
		radioBtnUi.removeClass("checked")
	}

	radioBtnUi.find("input").on("mouseenter focusin",function() {
		$(this).parent("span.radiobtn_ui").addClass("focus");
	})
	radioBtnUi.find("input").on("mouseleave focusout",function() {
		$(this).parent("span.radiobtn_ui").removeClass("focus");
	})
	radioBtnUi.find("input").on("click",function() {
		if($(this).attr("type") == "radio") {
			tName = $(this).attr("name");
			$("input[name="+tName+"]").parent("span.radiobtn_ui").removeClass("checked")
			$(this).parent("span.radiobtn_ui").addClass("checked");
		}
	})
}

//Checkbox Ui
function initCkboxUi(rdck) {
	var ckboxUi = rdck.parent("span.ckbox_ui");
	if(rdck.prop("disabled") == true) {
		ckboxUi.addClass("disabled")
	} else {
		ckboxUi.removeClass("disabled")
	}
	if(rdck.prop("checked") == true) {
		ckboxUi.addClass("checked")
	} else {
		ckboxUi.removeClass("checked")
	}

	ckboxUi.find("input").on("mouseenter focusin",function() {
		$(this).parent("span.ckbox_ui").addClass("focus");
	})
	ckboxUi.find("input").on("mouseleave focusout",function() {
		$(this).parent("span.ckbox_ui").removeClass("focus");
	})
	ckboxUi.find("input").on("click",function() {
		if($(this).attr("type") == "checkbox") {
			if($(this).prop("checked") == true) {
				$(this).parent("span.ckbox_ui").addClass("checked")
			} else {
				$(this).parent("span.ckbox_ui").removeClass("checked")
			}
		}
	})
}

//Open Layer Popup
function openLayerPopup(popupID,retrunTarget) {
	var btnQuickSearch = $("body>a.btn_quick_search");
	var bqsOfsTop = 0;
	var bqsOfsLeft = 0;
	var btnTop = $("body>button.btn_top");
	var btOfsTop = 0;
	var btOfsLeft = 0;
	var bgModal = $("#bg_modal");
	var tPopup = $(popupID);
	var btnClose = tPopup.find(">button.btn_close");
	var openIs = false;

	if(btnQuickSearch.length > 0) {
		bqsOfsTop = btnQuickSearch.offset().top;
		bqsOfsLeft = btnQuickSearch.offset().left;
	}

	if(btnTop.length > 0) {
		btOfsTop = btnTop.offset().top;
		btOfsLeft = btnTop.offset().left;
	}
	
	if($(popupID).hasClass("dialog_popup") == false) {
		$("body").css({
			"width": $(window).width()+"px",
			"overflow": "hidden"
		})
		btnQuickSearch.css({
			"position": "absolute",
			"right": "auto",
			"top": bqsOfsTop+"px",
			"left": bqsOfsLeft+"px",
			"marginTop": "0px"
		})
		btnTop.css({
			"position": "absolute",
			"right": "auto",
			"bottom": "auto",
			"top": btOfsTop+"px",
			"left": btOfsLeft+"px"
		})
		bgModal.css("overflow-y","scroll").fadeIn(200)
	}
	tPopup.show()
	tpWidth = tPopup.width();
	tPopup.css({
		"width": tpWidth+(tpWidth % 2)+2+"px",
	})
	function lpSetting() {
		if(tPopup.find(".lp_content").length > 0) {
			var winHeight = $(window).height();
			var lpPadding = parseInt(tPopup.css("paddingTop"))+parseInt(tPopup.css("paddingBottom"));
				//console.log(btnSetHeight)
			var headerHeight = tPopup.find(">h3").outerHeight();
			var btnSetHeight = tPopup.find(">.btn_lp_set").outerHeight();
			
			tPopup.find(".lp_content").css({
				"maxHeight": winHeight-headerHeight-btnSetHeight-lpPadding-80+"px"
			})
		}
	}
	lpSetting();
	$(window).on("resize",function() {
		$("body").css({
			"width": $(window).width()+"px"
		})
		lpSetting()
	})
	tPopup.animate({
		"opacity":1
	},300,function() {
		if(openIs == false) {
			if(tPopup.hasClass("dialog_popup") == true) {
				$(".dialog_popup").unwrap();
				tPopup.wrap("<div class='dialog_wrap'></div>")
			}

			openIs = true;
		}
	})

	btnClose.on("click",function() {
		if(openIs == true && $(this).hasClass("cb") == false) {
			
			if(tPopup.hasClass("dialog_popup") == true) {
				tPopup.unwrap()
			}

			tPopup.animate({
				"opacity":0
			},300,function() {
				tPopup.hide()
			});

			if(tPopup.hasClass("dialog_popup") == false) {
				$("body").css({
					"width": "",
					"overflow": ""
				})
				btnQuickSearch.css({
					"position": "",
					"right": "",
					"top": "",
					"left": "",
					"marginTop": ""
				})
				btnTop.css({
					"position": "",
					"right": "",
					"bottom": "",
					"top": "",
					"left": ""
				})
				initTopMove();
				$(window).resize();
				bgModal.css("overflow-y","")
				bgModal.fadeOut(200)
			}
			openIs = false;
		}
	})
}

//Close Layer Popup
function closeLayerPopup(tPopup) {
	var bgModal = $("#bg_modal");
	var closePopup = $(tPopup);
	var btnQuickSearch = $("body>a.btn_quick_search");
	var btnTop = $("body>button.btn_top");
	
	if(closePopup.hasClass("dialog_popup") == true) {
		closePopup.unwrap()
	}

	closePopup.css({
		"opacity":0
	});
	closePopup.hide()
	
	if(closePopup.hasClass("dialog_popup") == false) {
		$("body").css({
			"width": "",
			"overflow": ""
		})
		bgModal.css("overflow-y","")
		bgModal.fadeOut(200)
		btnQuickSearch.css({
			"position": "",
			"right": "",
			"top": "",
			"left": "",
			"marginTop": ""
		})
		btnTop.css({
			"position": "",
			"right": "",
			"bottom": "",
			"top": "",
			"left": ""
		})
		initTopMove();
		$(window).resize();
	}
}

//Tab Navi Ui
function initTabNavi(tNav) {
	var tabNavi = tNav;
	var tnLIst = tNav.find("ul");
	var tnGroup;
	var tnItem = tnLIst.find("li")

	tnItem.find("a").on("click",function() {
		if($(this).hasClass("link") == false) {
			tnGroup = $(this).parents("ul").attr("data-tab-group");
			//console.log(tnGroup)
			tContId = $(this).attr("href");

			tnItem.find("a").removeClass("active");
			$(this).addClass("active");

			$(".tab_content[data-tab-group='"+tnGroup+"']").hide();
			$(tContId).show();

			return false;
		}
	})
}

//FAQ List
function faqList() {
	var faqList = $("dl.faq_list");
	var fTit  = faqList.find("dt");
	var fCont = faqList.find("dd");
	var openIs = false;

	fTit.find(">a").on("click",function() {
		if($(this).hasClass("active") == false) {
			fTit.find("a").removeClass("active");
			fCont.hide();

			$(this).addClass("active");
			$(this).parent().next("dd").show();
		} else if($(this).hasClass("active") == true) {
			$(this).removeClass("active");
			$(this).parent().next("dd").hide();
		}

		return false;
	})
}

//일반 슬라이드
function normalSlideUi(slider,autoIs,sDelay) {
	//객체 변수
	var nSlider = $(slider);
	var sList = nSlider.find("ul.slides");
	var sItem = sList.find(">li");
	var btnPrev = nSlider.find(".btn_guide_set>button.prev");
	var btnNext = nSlider.find(".btn_guide_set>button.next");
	var btnInd = nSlider.find(".btn_guide_set>ol.btn_navi>li")
	
	//슬라이드 조작 관련 변수
	var siWidth;
	var totalLen = sItem.length;
	var current = 1;
	var autoMoving;

	//슬라이드 아이템 갯수가 1개만 있을 때
	if(totalLen == 1) {
		btnPrev.hide()
		btnNext.hide()
		btnInd.hide()

		sItem.eq(0).addClass("view");
		
		return false;
	}

	//슬라이드 레이아웃 세팅
	function slideLayoutSetting() {
		siWidth = sItem.outerWidth();
		sList.css({
			"width": siWidth*totalLen+"px"
		})
	}
	slideLayoutSetting()
	$(window).on("resize",slideLayoutSetting)

	//이전버튼 클릭 시
	btnPrev.on("click",function() {
		if($(this).hasClass("off") == false) {
			current--;
			btnPrev.prop("disabled",true)
			sList.animate({
				"marginLeft": "+="+siWidth+"px"
			},300)
			slideBtnSetting(200);
		}
	})

	//다음버튼 클릭 시
	btnNext.on("click",function() {
		if($(this).hasClass("off") == false) {
			current++;
			btnNext.prop("disabled",true)
			sList.animate({
				"marginLeft": "-="+siWidth+"px"
			},300)
			slideBtnSetting(200);
		}
		
	})

	//인디케이터 클릭 시
	btnInd.find(">a").on("click",function() {
		current = $(this).parent().index()+1;
		sList.animate({
			"marginLeft": "-"+siWidth*(current-1)+"px"
		},300,function() {
			slideBtnSetting(0)
		})
		return false;
	})
	
	//슬라이드 버튼 세팅
	function slideBtnSetting(viewDelay) {
		btnPrev.prop("disabled",false)
		btnNext.prop("disabled",false)
		if(current == 1) {
			btnPrev.addClass("off")
			btnNext.removeClass("off")
		} else if(current == totalLen) {
			btnPrev.removeClass("off")
			btnNext.addClass("off")
		} else {
			btnPrev.removeClass("off")
			btnNext.removeClass("off")
		}
		sItem.removeClass("view");
		setTimeout(function() {
			sItem.eq(current-1).addClass("view");
		},viewDelay)
		btnInd.find(">a").removeClass("active");
		btnInd.eq(current-1).find(">a").addClass("active");
	}
	slideBtnSetting(200);

	//자동 슬라이드 설정
	function autoMove() {
		autoMoving = setInterval(function() {
			if(autoIs == true) {
				if(current == totalLen) {
					current = 1
				} else {
					current++;
				}
				sList.animate({
					"marginLeft": "-"+siWidth*(current-1)+"px"
				},300,function() {
					slideBtnSetting(0);
				})
			}
		},sDelay)
	}
	autoMove();
	
	//마우스오버시 일시정지
	nSlider.find(".btn_guide_set>button,.btn_guide_set>ol.btn_navi").on("mouseenter",function() {
		if(autoIs == true) {
			clearInterval(autoMoving)
		}
	})
	
	//마우스아웃 일시정지
	nSlider.find(".btn_guide_set>button,.btn_guide_set>ol.btn_navi").on("mouseleave",function() {
		if(autoIs == true) {
			autoMove();
		}
	})
}

//무한 슬라이드
function carouselSlideUi(slider,autoIs,sDelay) {
	//객체 변수
	var nSlider = $(slider);
	var sList = nSlider.find("ul.slides");
	var sItem = sList.find(">li");
	var btnPrev = nSlider.find(".btn_guide_set>button.prev");
	var btnNext = nSlider.find(".btn_guide_set>button.next");
	var btnInd = nSlider.find(".btn_guide_set>ol.btn_navi>li")
	
	//슬라이드 조작 관련 변수
	var siWidth;
	var totalLen = sItem.length;
	var current = 1;
	var autoMoving;

	//슬라이드 아이템 갯수가 1개만 있을 때
	if(totalLen == 1) {
		btnPrev.hide()
		btnNext.hide()
		btnInd.hide()

		sItem.eq(0).addClass("view");

		return false;
	}

	//슬라이드 클론 아이템
	function slideCloneItem() {
		var firstClone = sItem.first().clone(true);
		var lastClone = sItem.last().clone(true);
		sList.append(firstClone);
		sList.prepend(lastClone);
		
		//클론 생성 후 슬라이드 레이아웃 세팅
		slideLayoutSetting()
	}
	slideCloneItem();

	//슬라이드 레이아웃 세팅
	function slideLayoutSetting() {
		siWidth = sItem.outerWidth();
		sList.css({
			"width": siWidth*(totalLen+2)+"px",
			"marginLeft": "-"+siWidth+"px"
		})
	}
	$(window).on("resize",slideLayoutSetting)

	//이전버튼 클릭 시
	btnPrev.on("click",function() {
		current--;
		btnPrev.prop("disabled",true)
		sList.animate({
			"marginLeft": "+="+siWidth+"px"
		},300,function() {
			if(current < 1) {
				current = totalLen;
				sList.css({
					"marginLeft": "-"+siWidth*totalLen+"px"
				})
			}
			sItem.eq(current-1).addClass("view");
		})
		slideBtnSetting(200);
	})

	//다음버튼 클릭 시
	btnNext.on("click",function() {
		current++;
		//console.log(current)
		btnNext.prop("disabled",true)
		sList.animate({
			"marginLeft": "-="+siWidth+"px"
		},300,function() {
			if(current > totalLen) {
				current = 1;
				sList.css({
					"marginLeft": "-"+siWidth+"px"
				})
				sItem.eq(current-1).addClass("view");
			}
		})
		slideBtnSetting(200);
		
	})

	//인디케이터 클릭 시
	btnInd.find(">a").on("click",function() {
		current = $(this).parent().index()+1;
		sList.animate({
			"marginLeft": "-"+siWidth*(current)+"px"
		},300,function() {
			slideBtnSetting(0)
		})
		return false;
	})
	
	//슬라이드 버튼 세팅
	function slideBtnSetting(viewDelay) {
		btnPrev.prop("disabled",false)
		btnNext.prop("disabled",false)
		
		sItem.removeClass("view");
		setTimeout(function() {
			sItem.eq(current-1).addClass("view");
		},viewDelay)
		
		btnInd.find(">a").removeClass("active");
		if(current > totalLen) {
			btnInd.eq(0).find(">a").addClass("active");
		} else {
			btnInd.eq(current-1).find(">a").addClass("active");
		}
	}
	slideBtnSetting(200);

	//자동 슬라이드 설정
	function autoMove() {
		autoMoving = setInterval(function() {
			if(autoIs == true) {
				current++;
				sList.animate({
					"marginLeft": "-="+siWidth+"px"
				},300,function() {
					if(current > totalLen) {
						current = 1;
						sList.css({
							"marginLeft": "-"+siWidth+"px"
						})
						sItem.eq(current-1).addClass("view");
						btnInd.eq(current-1).find(">a").addClass("active");
					}
				})

				slideBtnSetting(200);
			}
		},sDelay)
	}
	autoMove();
	
	//마우스오버시 일시정지
	nSlider.find(".btn_guide_set>button,.btn_guide_set>ol.btn_navi").on("mouseenter",function() {
		if(autoIs == true) {
			clearInterval(autoMoving)
		}
	})
	
	//마우스아웃 일시정지
	nSlider.find(".btn_guide_set>button,.btn_guide_set>ol.btn_navi").on("mouseleave",function() {
		if(autoIs == true) {
			autoMove();
		}
	})
}

$(document).ready(function() {
	initHeader() //Header
	initGnb() //GNB
	initSitemap(); //Header Sitemap
	initMymenu(); //Header Mymenu
	initTopMove(); //Top Move

	$("select").each(function() {
		initSelectboxUi($(this)); //셀렉트 박스 UI
	})

	$("input[type='radio']").each(function() {
		initRadioBtnUi($(this)); //라디오버튼
	})
	$("input[type='checkbox']").each(function() {
		initCkboxUi($(this)); //체크박스
	})

	$("nav.tab_ui").each(function() {
		initTabNavi($(this));
	})
})