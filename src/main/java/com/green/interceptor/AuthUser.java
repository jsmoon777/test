package com.green.interceptor;

import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Retention(RUNTIME)
@Target(PARAMETER)
public @interface AuthUser {
	//@Auth(role=Role.ADMIN) 관리자 권한은 컨트롤에 이거 씌워주면된다
}
