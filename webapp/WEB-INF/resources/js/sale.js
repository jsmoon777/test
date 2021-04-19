//메인 비주얼 슬라이드(A,B타입 공용)
function stMainVisualSlide(autoIs,sDelay) {
	var mainVisual = $("section#st_main .st_main_visual");
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
	var tTerms = sDelay;
	
	//슬라이드 로드가 완료되었을 때
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
	
	//기본세팅
	btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
	var playCurent = autoIs;
	if(playCurent == true) {
		autoMove();
		btnPlayer.addClass("pause")
	}
	mvsList.append(mvsItemFirst);
	mvsList.prepend(mvsItemLast);

	//슬라이드 레이아웃 세팅
	function slideSetting() {
		mvsList.find(">li").css({
			"width": mvSlider.width()+"px",
		})
		mvsList.css({
			"width": mvSlider.width()*(mvsTotal+2)+"px",
			"marginLeft": "-"+mvSlider.width()*mvsCurrent+"px"
		})
	}
	slideSetting();
	$(window).on("resize",slideSetting);

	btnNext.on("click",function() {
		btnNavi.find("li a span.gauge").stop();
		if(playCurent == true) {
			clearTimeout(autoslide)
		}
		if(mvsItem.find("video").length > 0) {
			mvsItem.find("video").get(0).pause();
			mvsItem.find("video").get(0).currentTime = 0;
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
			btnNavi.find("li a").removeClass("active");
			btnNavi.find("li a span.gauge").fadeOut(300,function() {
				btnNavi.find("li a span.gauge").removeAttr("style")
			})
			btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
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
		if(mvsItem.find("video").length > 0) {
			mvsItem.find("video").get(0).pause();
			mvsItem.find("video").get(0).currentTime = 0;
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
			btnNavi.find("li a").removeClass("active");
			btnNavi.find("li a span.gauge").fadeOut(300,function() {
				btnNavi.find("li a span.gauge").removeAttr("style")
			})
			btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
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

	btnNavi.off().find(">li>a").on("click",function() {
		tIndex = $(this).parent().index()+1;
		mvsCurrent = tIndex;
		mvsList.stop().animate({
			"marginLeft": "-"+mvSlider.width()*(mvsCurrent)+"px"
		})
		btnNavi.find("li a").removeClass("active");
		btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
		
		if(playCurent == true) {
			clearTimeout(autoslide)
			autoMove()
		}
	})

	btnPlayer.on("click",function() {
		if(playCurent == true) {
			playCurent = false;
			btnPlayer.removeClass("pause")
			clearTimeout(autoslide)
		} else if(playCurent == false) {
			playCurent = true;
			autoMove()
			btnPlayer.addClass("pause")
		}
	})

	//자동 롤링
	function autoMove() {
		autoslide = setTimeout(function() {
			if(playCurent == true) {
				btnNavi.find("li a span.gauge").stop();
				if(mvsItem.find("video").length > 0) {
					mvsItem.find("video").get(0).pause();
					mvsItem.find("video").get(0).currentTime = 0;
				}
				mvsCurrent++;
				mvsList.stop().animate({
					"marginLeft": "-="+mvSlider.width()+"px"
				},function() {
					if(mvsCurrent > mvsTotal) {
						mvsList.css({
							"marginLeft": "-"+mvSlider.width()+"px"
						})
						mvsCurrent = 1;
					}
					btnNavi.find("li a").removeClass("active");
					btnNavi.find("li a span.gauge").fadeOut(300,function() {
						btnNavi.find("li a span.gauge").removeAttr("style")
					})
					btnNavi.find("li:nth-child("+mvsCurrent+") a").addClass("active");
					btnNavi.find("li:nth-child("+mvsCurrent+") a span.gauge").animate({
						"width":"100%"
					},parseInt(tTerms-50),"linear")
					
					if(mvsItem.eq(mvsCurrent-1).find("video").length > 0) {
						mvsItem.eq(mvsCurrent-1).find("video").get(0).play();
					}
					
					clearTimeout(this)
					autoMove()
				})
			}
		},tTerms)
	}
}

//메인 B타입 FullPage Slide
function initStMainFullPage() {
	var stTopBanner = $("#st_top_banner");
	var headerWrap = $("#st_header_wrap");
	var footerWrap = $("#st_footer_wrap");
	var footerIsView = false;
	var fullPageWrap = $("section#st_main.type_b");
	var fullpageContent = fullPageWrap.find(".fullpage_content");
	var fcLen = fullpageContent.length;
	var fcCurrent = 1;
	var fullpageIndicator = fullPageWrap.find("ul.fullpage_indicator");
	var scrollIng = false;
	
	//세팅
	$(window).on('beforeunload', function() {
		$(window).scrollTop(0)
		fullPageWrap.css({"opacity": 0})
	});
	$(window).on("load",function() {
		fullPageWrap.animate({
			"opacity": 1
		},200)
	})
	fullpageContent.each(function(i) {
		fullpageIndicator.append("<li><a href='javascript:void(0)'>#"+(i+1)+"</a></li>")
	})
	fullpageIndicator.find("li:nth-child(1) a").addClass("active");
	
	if(stTopBanner.length > 0 && stTopBanner.is(":hidden") == false) {
		stTopBanner.css({
			"position": "fixed",
			"top": "0px",
			"left": "0px",
			"width": "100%"
		})
		headerWrap.css({
			"position": "fixed",
			"top": stTopBanner.height()+"px"
		})
		if(fullpageContent.hasClass("st_main_visual") == true) {
			fullpageContent.find(".mv_slider_wrap").css({
				"top":"+="+stTopBanner.outerHeight()+"px"
			})
		}
	} else {
		headerWrap.css({
			"position": "fixed"
		})
	}

	//마우스 휠 이벤트
	$(window).on("mousewheel",function(e) {
		//console.log(e.deltaY)
		
		if($(".layer_popup").length == 0 || $(".layer_popup").is(":hidden") == true) {
			if(e.deltaY < 0 && scrollIng == false && fcCurrent < fcLen && footerIsView == false) {
				scrollIng = true;
				fcCurrent++;
				setTimeout(function() {
					fullpageIndicator.find("li a").removeClass("active");
					fullpageIndicator.find("li:nth-child("+fcCurrent+") a").addClass("active");
		
					if(fcCurrent > 1 && stTopBanner.length > 0 && stTopBanner.is(":hidden") == false) {
						headerWrap.animate({
							"top": "0px"
						},200)
					}

					$("body,html").animate({
						"scrollTop": fullpageContent.outerHeight()*(fcCurrent-1)
					},300,function() {
						scrollIng = false;
					})
				},200)
			}

			if(e.deltaY > 0 && scrollIng == false && fcCurrent > 1 && footerIsView == false) {
				scrollIng = true;
				fcCurrent--;
				setTimeout(function() {
					fullpageIndicator.find("li a").removeClass("active");
					fullpageIndicator.find("li:nth-child("+fcCurrent+") a").addClass("active");

					if(fcCurrent == 1 && stTopBanner.length > 0 && stTopBanner.is(":hidden") == false) {
						headerWrap.animate({
							"top": stTopBanner.height()+"px"
						},200)
					}

					$("body,html").animate({
						"scrollTop": fullpageContent.outerHeight()*(fcCurrent-1)
					},300,function() {
						scrollIng = false;
					})
				},200)
			}

			if(e.deltaY < 0 && scrollIng == false && fcCurrent == fcLen && footerWrap.length > 0 && footerIsView == false) {
				scrollIng = true;
				footerIsView = true;
				setTimeout(function() {
					$("body,html").animate({
						"scrollTop": "+="+footerWrap.outerHeight()
					},200,function() {
						scrollIng = false;
					})
				},200)
			}
			if(e.deltaY > 0 && scrollIng == false && fcCurrent == fcLen && footerWrap.length > 0 && footerIsView == true) {
				scrollIng = true;
				footerIsView = false;
				setTimeout(function() {
					$("body,html").animate({
						"scrollTop": "-="+footerWrap.outerHeight()
					},200,function() {
						scrollIng = false;
					})
				},200)
			}
		
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	})

	//인디케이터 클릭시 스크롤
	fullpageIndicator.find("li>a").on("click",function() {
		fcCurrent = $(this).parent().index()+1;
		tOffset = fullpageContent.eq(fcCurrent-1).offset().top
		footerIsView = false;
		scrollIng = true;
		setTimeout(function() {
			fullpageIndicator.find("li>a").removeClass("active");
			fullpageIndicator.find("li>a").eq(fcCurrent-1).addClass("active");
			$("body,html").animate({
				"scrollTop": fullpageContent.outerHeight()*(fcCurrent-1)
			},300,function() {
				scrollIng = false;
			})
		},200)
	})
}


//메인 특장점 - A타입
function stMainFeaturePointTypeA() {
	var featurePoint = $("#st_main.type_a .st_feature_point");
	var slides = featurePoint.find(".list_slider ul.slides");
	var sItem = slides.find("li");
	var sItemWidth = 0;
	var sLen = sItem.length;
	var restLen = sLen;
	var viewLen = 3;
	var totalCount = Math.ceil(sLen/viewLen)
	var current = 1
	var btnPrev = featurePoint.find(".btn_guide_set button.prev");
	var btnNext = featurePoint.find(".btn_guide_set button.next");
	var btnInd = featurePoint.find(".btn_guide_set .btn_navi ol");
	var sInfoHeight = new Array();

	if(sLen <= viewLen) {
		btnPrev.hide();
		btnNext.hide()
		btnInd.hide();
	}

	//화면 리사이즈에 따른 레이아웃 변경
	function slideLayout() {
		sItemWidth = sItem.outerWidth()+45
		slides.css({
			"width": sItemWidth*sLen+"px"
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
		var movement = 0;
		if (restLen  == sLen) {
			restLen = sLen
			movement = 0;
		} else if (restLen == sLen+viewLen) {
			current = totalCount;
			restLen = sLen%viewLen;
			movement = -(sItemWidth*(sLen-viewLen))
			btnInd.find("li:nth-child("+current+") a").addClass("active");
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
		btnInd.find("li a").removeClass("active");
		btnInd.find("li:nth-child("+current+") a").addClass("active");
		restLen = restLen-viewLen;
		var movement = 0;
		if (restLen < viewLen && restLen > 0) {
			movement = -sItemWidth*(sLen-viewLen);
		} else if(restLen < viewLen) {
			current = 1;
			restLen = sLen;
			movement = 0
			btnInd.find("li:nth-child("+current+") a").addClass("active");
		} else {
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
	
	//아이템 영역에 마우스 오버 시
	sItem.each(function(i) {
		sInfoHeight[i] = sItem.eq(i).find(".desc .info").height();
		sItem.eq(i).find(".desc .info").css({
			"paddingTop": "0px",
			"height": "0px"
		});
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

//메인 특장점 - B타입
function stMainFeaturePointTypeB() {
	if($("#st_main.type_b .st_feature_point .slider_wrap .list_slider ul.slides li").length < 3) return false;

	var featurePoint = $("#st_main.type_b .st_feature_point");
	var slideWrap = featurePoint.find(".slider_wrap");
	var slides = featurePoint.find(".list_slider ul.slides");
	var sItem = slides.find("li");
		sItem.eq(0).addClass("view fixed");
	var sItemFirst = slides.find(">li:first-child").clone(true);
	var sItemFirstNext = slides.find(">li:first-child").next().clone(true);
	var sItemLast = slides.find(">li:last-child").clone(true);
	var sItemLastPrev = slides.find(">li:last-child").prev().clone(true);
	var sWidth = 400;
	var sLen = sItem.length;
	var current = 1;
	var btnPrev = featurePoint.find(".btn_guide_set>button.prev");
	var btnNext = featurePoint.find(".btn_guide_set>button.next");

	//클론 세팅
	slides.append(sItemFirst);
	slides.prepend(sItemLast);
	slides.append(sItemFirstNext);
	slides.prepend(sItemLastPrev);

	//레이아웃 세팅
	slides.css({
		"width":sWidth*slides.find("li").length+"px"
	})
	slides.find("li").each(function(i) {
		slides.find("li").eq(i).css({
			"left": sWidth*(i-1)+"px"
		},200)
	})
	
	$(window).on("load",function() {
		slideWrap.animate({
			"opacity":1
		},200)
	})

	//이전 클릭시
	btnPrev.on("click",function() {
		$(this).prop("disabled",true);
		slides.find("li").removeClass()
		slides.find("li").eq(current).addClass("view")
		current--;
		slides.animate({
			"left": "+="+sWidth+"px"
		},function() {
			if(current == 0) {
				current = sLen;
				sItem.eq(sLen-1).addClass("view fixed")
				slides.css({
					"left": -400*(current-1)+"px",
				})
			}
			btnPrev.prop("disabled",true);
		})
	})

	//다음 클릭시
	btnNext.on("click",function() {
		$(this).prop("disabled",true);
		slides.find("li").removeClass()
		slides.find("li").eq(current+2).addClass("view")
		current++;
		slides.animate({
			"left": "-="+sWidth+"px"
		},function() {
			if(current > sLen) {
				current = 1;
				slides.css({
					"left": 400*(current-1)+"px"
				})
				sItem.eq(0).addClass("view fixed")
			}
			btnNext.prop("disabled",false);
		})
	})
}


//탑 배너 닫기
function stTopBannerClose() {
	var topBanner = $("#st_top_banner");
	var stHeaderWrap = $("#st_header_wrap");
	topBanner.slideUp(200,function() {
		$(window).resize();
	});
	
	if($("#st_main.type_b").length > 0) {
		stHeaderWrap.animate({
			"top":"0px"
		},200)

		if($("#st_main.type_b .fullpage_content").hasClass("st_main_visual") == true) {
			$("#st_main.type_b .st_main_visual .mv_slider_wrap").animate({
				"top":"-="+topBanner.outerHeight()+"px"
			},200)
		}
	}
}

//헤더
function initStHeader() {
	if($("#st_container").length == 0) return false;
	if($("#st_main.type_b").length > 0) return false;
	
	var headerWrap = $("#st_header_wrap");
	var hwOffsetTop = headerWrap.offset().top;
	var hwIsFixed = false;
	var container = $("#st_container");
	var footer = $("footer#st_footer");
	var fHeight;
	if(footer.length > 0) {
		fHeight = footer.outerHeight();
	}

	$(window).on("resize",function() {
		hwOffsetTop = headerWrap.offset().top;
	})

	$(window).on("load scroll",function() {
		if($(this).scrollTop() > hwOffsetTop && hwIsFixed == false) {
			headerWrap.css({
				"position":"fixed",
				"top": "0px"
			})
			container.css({
				"marginTop": headerWrap.height()+"px"
			})
			hwIsFixed = true
		} else if($(this).scrollTop() <= hwOffsetTop && hwIsFixed == true) {
			headerWrap.css({
				"position":"relative",
				"top": "0px"
			})
			container.css({
				"marginTop": ""
			})
			hwIsFixed = false
		}
	})
}

//GNB
function initStGnb() {
	var header = $("header#st_header");
	var gnb = header.find("nav#st_gnb");
	var gitem = gnb.find(">ul>li");
	var gOrgIndex = gitem.find(">a.active").parent().index();
		//console.log(gOrgIndex)
	var bgGnb = $("#st_header_wrap .bg_st_gnb");
	var barGnb = $("#st_header_wrap .bar_st_gnb");
	var btnResidentRecruit = $("a.btn_resident_recruit")
	var isOpen = false;
	var bgMaxHeight = 0;

	gitem.each(function(i) {
		gitem.eq(i).css({
			"width":gitem.eq(i).width()+"px"
		})
		
		if(bgMaxHeight <= gitem.eq(i).height()) {
			bgMaxHeight = gitem.eq(i).height()
		}

		gitem.eq(i).find(">ul").addClass("loaded")
	})
	bgGnb.css({
		"height": bgMaxHeight-gitem.height()+30+"px"
	})
	//console.log(bgMaxHeight)

	gitem.find(">a").on("mouseenter focusin",function() {
		var tLink = $(this);
		gitem.find(">a").removeClass("active");
		if(isOpen == false) {
			setTimeout(function() {
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
			if(btnResidentRecruit.length > 0) {
				btnResidentRecruit.fadeIn(300);
			}
			gitem.find(">ul").stop().slideDown(300);
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

	$("#top_banner_wrap, #st_container, header#st_header button,#bg_modal,aside.mymenu").on("mouseover",function(e) {
		gnbClose();
	})

	$("header#st_header button").on("focusin",function(e) {
		gnbClose();
	})

	function gnbClose() {
		setTimeout(function() {
			gitem.find(">a").removeClass("active");
			if(btnResidentRecruit.length > 0) {
				btnResidentRecruit.fadeOut(200);
			}
			barGnb.stop().fadeOut(300);
			gitem.find(">ul").stop().slideUp(300);
			bgGnb.stop().slideUp(300);
			if(gOrgIndex > -1) {
				gitem.find(">a").eq(gOrgIndex).addClass("active")
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

//Top Move
function initStTopMove() {
	if($("body > button.btn_st_top").length == 0) return false;

	var btnTop = $("body > button.btn_st_top");
	var btFixed = true;
	var footerWrap = $("#st_footer_wrap");
	var fHeight;
	var fOffsetTop;

    $(window).on("load resize scroll",function() {
        fHeight = footerWrap.height();
        fOffsetTop = footerWrap.offset().top;

        if($(this).scrollTop() < $(window).height()/4) {
            btnTop.fadeOut(300)
        } else {
            btnTop.fadeIn(300)
        }

        //console.log($(document).outerHeight()+" , "+fHeight)

        if($(this).scrollTop() >= fOffsetTop-$(this).height() && btFixed == true) {
            btnTop.css({
                "position": "absolute",
                "bottom": "auto",
                "top": $(document).outerHeight()-fHeight-btnTop.height()-30+"px"
            })
			btFixed = false;
        } else if($(this).scrollTop() < fOffsetTop-$(this).height() && btFixed == false) {
            btnTop.css({
                "position": "fixed",
                "bottom": "30px",
                "top": "auto"
            })
			btFixed = true;
        }
    })

    btnTop.on("click",function() {
        $("html,body").animate({
            "scrollTop": 0
        },300)
    })
}


//Quick Menu A Type
function initStQuickMenuA() {
	if($("#st_quickmenu.type_a").length == 0) return false;

	var quickMenu = $("#st_quickmenu.type_a");
	var qmHeight;
	var qmPosTop;
	var qmFixed = true;
	var btnProductSummary = quickMenu.find("button.product_summary");
	var quickProductSummary = $("#st_quick_product_summary");
	var btnClose = quickProductSummary.find("button.btn_close");
	var bgModal = $("#bg_modal");
	var qpsOpenIs = false;
	var footerWrap = $("#st_footer_wrap");
	var fHeight;
	var fOffsetTop;

	$(window).on("load resize scroll",function() {
		qmHeight = quickMenu.outerHeight();
		qmPosTop = quickMenu.position().top;
		fHeight = footerWrap.height();
		fOffsetTop = footerWrap.offset().top;

		if($(this).scrollTop() >= fOffsetTop-$(this).height() && qmFixed == true) {
			quickMenu.css({
				"position": "absolute",
				"top": fOffsetTop-($(window).height()/2)+"px"
			})
			qmFixed = false
		} else if($(this).scrollTop() < fOffsetTop-$(this).height() && qmFixed == false) {
			quickMenu.css({
				"position": "",
				"bottom": "",
				"top": ""
			})
			qmFixed = true
		}
	})

	btnProductSummary.on("click",function() {
		if(qpsOpenIs == false) {
			bgModal.css({
				"z-index": 8
			})
			bgModal.fadeIn(250)
			quickProductSummary.show()
			quickProductSummary.animate({
				"right": "0px"
			},250)

			qpsOpenIs = true
		}
	})

	btnClose.on("click",function() {
		if(qpsOpenIs == true) {
			bgModal.fadeOut(250,function() {
				bgModal.css({
					"z-index": ""
				})
			})
			quickProductSummary.animate({
				"right": "-550px"
			},250,function() {
				quickProductSummary.hide()
			})

			qpsOpenIs = false
		}
	})
}

//Quick Menu B Type
function initStQuickMenuB() {
	if($("#st_quickmenu.type_b").length == 0) return false;

	var btnQuickmenu = $("body > button.btn_quickmenu_b");
	var bqFixed = true;
	var footerWrap = $("#st_footer_wrap");
	var quickmenu = $("#st_quickmenu.type_b");
	var bgModal = $("#bg_modal");
	var qmOpenIs = false;
	var btnProductList = quickmenu.find("button.product_list");
	var quickProductList = $("#st_quick_product_list");
	var fullpageIndicator = $("#st_main.type_b ul.fullpage_indicator")
	var qpOpenIs = false;
	var fHeight;
	var fOffsetTop;

    $(window).on("load resize scroll",function() {
        fHeight = footerWrap.height();
        fOffsetTop = footerWrap.offset().top;

        if($(this).scrollTop() >= fOffsetTop-$(this).height() && bqFixed == true) {
            btnQuickmenu.css({
                "position": "absolute",
                "bottom": "auto",
                "top": $(document).outerHeight()-fHeight-btnQuickmenu.outerHeight()-30+"px"
            })
			quickmenu.css({
                "position": "absolute",
                "bottom": "auto",
                "top": $(document).outerHeight()-fHeight-quickmenu.outerHeight()-112+"px"
            })
			quickProductList.css({
                "position": "absolute",
                "bottom": "auto",
                "top": $(document).outerHeight()-fHeight-quickProductList.outerHeight()-112+"px"
            })
			if(fullpageIndicator.length > 0) {
				fullpageIndicator.css({
					"position": "absolute",
					"bottom": "auto",
					"top": $(document).outerHeight()-fHeight-($(window).height()/2)+"px"
				})
			}
			bqFixed = false;
        } else if($(this).scrollTop() < fOffsetTop-$(this).height() && bqFixed == false) {
            btnQuickmenu.css({
                "position": "",
                "bottom": "",
                "top": ""
            })
			quickmenu.css({
                "position": "",
                "bottom": "",
                "top": ""
            })
			quickProductList.css({
                "position": "",
                "bottom": "",
                "top": ""
            })
			if(fullpageIndicator.length > 0) {
				fullpageIndicator.css({
					"position": "",
					"bottom": "",
					"top": ""
				})
			}
			bqFixed = true;
        }
    })

	btnQuickmenu.on("click",function() {
		if(qmOpenIs == false) {
			$(this).addClass("active");
			bgModal.css({
				"z-index": 8
			})
			bgModal.fadeIn(250)
			quickmenu.fadeIn(250)
			qmOpenIs = true
		} else if(qmOpenIs == true) {
			$(this).removeClass("active");
			bgModal.fadeOut(250,function() {
				bgModal.css({
					"z-index": ""
				})
			})
			quickmenu.fadeOut(250)
			qmOpenIs = false
		}
	})

	btnProductList.on("mouseenter focusin",function() {
		if(qpOpenIs == false) {
			btnProductList.addClass("active")

			quickProductList.css({
				"display": "block",
				"opacity": "0",
				"right": quickmenu.outerWidth() + 53+"px"
			})
			quickProductList.animate({
				"opacity": 1
			},250)

			qpOpenIs = true
		}
	})

	bgModal.on("mouseenter",function() {
		if(qpOpenIs == true) {
			btnProductList.removeClass("active")
			quickProductList.animate({
				"opacity": 0
			},250,function() {
				quickProductList.css({
					"display": "",
					"opacity": "",
					"right": ""
				})
				qpOpenIs = false
			})
		}
	})
}

//단지목록 슬라이드(Quick Menu B Type)
function initQuickProductListB() {
	if($("#st_quick_product_list .list_slider").length == 0) return false;

	var quickProductList = $("#st_quick_product_list");
	var slides = quickProductList.find(".list_slider ul.slides");
	var sItem = slides.find("li");
	var sItemWidth = sItem.outerWidth()+20;
	var sLen = sItem.length;
	var restLen = sLen;
	var viewLen = 3;
	var totalCount = Math.ceil(sLen/viewLen)
	var current = 1;
	var btnPrev = quickProductList.find(".btn_guide_set button.prev");
	var btnNext = quickProductList.find(".btn_guide_set button.next");
	var pageCondition = quickProductList.find("p.page_condition")
	var sInfoHeight = new Array();
	
	slides.css({
		"width":(sLen*sItemWidth)+"px"
	})

	//슬라이드 갯수가 최소갯수 이하일 때
	if(sLen <= viewLen) {
		btnPrev.css("opacity",0.2);
		btnNext.css("opacity",0.2);
	}

	//슬라이드 아이템 겟수 체크하여 뿌리기
	pageCondition.find("strong.current").text(viewLen)
	pageCondition.find("span.total").text(sLen)

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
		
		if(viewLen > (viewLen * current) - (viewLen - (sLen%viewLen))) {
			pageCondition.find("strong.current").text(viewLen)
		} else if(0 < sLen%viewLen) {
			pageCondition.find("strong.current").text((viewLen*current) - (viewLen - (sLen%viewLen)))
			console.log((sLen%viewLen))
		} else {
			pageCondition.find("strong.current").text((viewLen*current))
		}
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
		if(viewLen * current > sLen) {
			pageCondition.find("strong.current").text(sLen)
		} else {
			pageCondition.find("strong.current").text(viewLen*current)
		}
	})
}

$(document).ready(function(){  
	initStHeader() //Header
	initStGnb() //GNB
	initStTopMove() //Top Move
	initStQuickMenuA() //Quick Menu A Type
	initStQuickMenuB() //Quick Menu A Type

	//단지목록 슬라이드가 존재할 경우
	if($("#st_quick_product_list").length > 0) {
		initQuickProductListB();
	}
});