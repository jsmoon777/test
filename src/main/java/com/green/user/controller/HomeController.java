package com.green.user.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {
	//private static final Log LOG = LogFactory.getLog( HomeController.class );
	@RequestMapping("/")
	public  String  home() {
//		LOG.debug( "#ex1 - debug log" );
//		LOG.info( "#ex1 - info log" );
//		LOG.warn( "#ex1 - warn log" );
//		LOG.error( "#ex1 - error log" );
		return "home";     // 이동할 jsp 이름
	}
	
	
}











