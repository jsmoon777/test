package com.green.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.green.user.vo.UserVo;

public class AuthInterceptor extends HandlerInterceptorAdapter {
	
	// 페이지 요청 정보 저장
    private void saveDestination(HttpServletRequest request) {
        String uri = request.getRequestURI();
        String query = request.getQueryString();
        if (query == null || query.equals("null")) {
            query = "";
        } else {
            query = "?" + query;
        }

        if (request.getMethod().equals("GET")) {
            request.getSession().setAttribute("destination", uri + query);
        }
    }
	
	@Override
	public boolean preHandle(HttpServletRequest request
			, HttpServletResponse response, Object handler)
			throws Exception {
		
		HttpSession session = request.getSession();
		
		String requestUrl = request.getRequestURL().toString();
		if(requestUrl.contains("/login")) {
			return true;
		}
		
		
		
		// 1. handler 종류 확인
				// 우리가 관심 있는 것은 Controller에 있는 메서드이므로 HandlerMethod 타입인지 체크
				if( handler instanceof HandlerMethod == false ) {
					// return true이면  Controller에 있는 메서드가 아니므로, 그대로 컨트롤러로 진행
					return true;
				}

				// 2.형 변환
				HandlerMethod handlerMethod = (HandlerMethod)handler;
				
				// 3. @Auth 받아오기
				Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
				Auth adminRole = handlerMethod.getMethod().getDeclaringClass().getAnnotation(Auth.class);
				
				// 4. method에 @Auth가 없는 경우, 즉 인증이 필요 없는 요청
				if( auth == null ) {
					return true;
				}
				
				// 5. @Auth가 있는 경우이므로, 세션이 있는지 체크
				if( session == null ) {
					// 로그인 화면으로 이동
					response.sendRedirect(request.getContextPath() + "/login");
					return false;
				}
				
				// 6. 세션이 존재하면 유효한 유저인지 확인
				UserVo authUser = (UserVo)session.getAttribute("login");
				if(authUser == null) {
					// 페이지 요청 정보 저장 : 여기서 저장해야 로그인하고 보낼수 있다
					saveDestination(request);
					System.out.println("setdesti:" + session.getAttribute("destination"));
					response.sendRedirect("/login"); 
					return false; 
				}
//				UserVo authUser = (UserVo)session.getAttribute("authUser");
//				if ( authUser == null ) {
//					response.sendRedirect(request.getContextPath() + "//login");
//					return false;
//				}

				// 7. admin일 경우
				if( adminRole != null ) {
					String role = auth.role().toString();
					if( "ADMIN".equals(role) ) {
						// admin임을 알 수 있는 조건을 작성한다.
						// ex) 서비스의 id가 root이면 admin이다.
						if( "root".equals(authUser.getUser_id()) == false ){   // admin이 아니므로 return false
							response.sendRedirect(request.getContextPath());
							return false;
						}
					}
				}
				
				// 8. 접근허가, 즉 메서드를 실행하도록 함
		return super.preHandle(request, response, handler); 
		
	}
	
	@Override
	public void postHandle(HttpServletRequest request
			, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// postHandle을 쓰면 ajax랑 경로가 겹쳐서 에러가난다. qj==범위가 /**이기 때문에 벌어진게 아닐까 추측된다
		
	

	}
}

