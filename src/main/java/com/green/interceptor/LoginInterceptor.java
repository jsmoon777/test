package com.green.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter {

    private static final String LOGIN = "login";
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	
    	HttpSession session = request.getSession();
    	// 기존의 로그인 정보 제거
    	if (session.getAttribute(LOGIN) != null) {
    		session.removeAttribute(LOGIN);
    	}
    	
    	return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        HttpSession session = request.getSession();
        ModelMap modelMap = modelAndView.getModelMap();
        Object userVO =  modelMap.get("user");
        if (userVO != null) {
            session.setAttribute(LOGIN, userVO);
            //response.sendRedirect("/");
            // 로그인 하기전 가려고 했던 장소로 이동
            Object destination = session.getAttribute("destination");
            System.out.println("getdesti:" + destination);
            response.sendRedirect(destination != null ? (String) destination : "/");
        }

    }
}