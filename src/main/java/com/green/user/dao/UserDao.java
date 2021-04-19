package com.green.user.dao;

import com.green.user.logindto.LoginDTO;
import com.green.user.vo.UserVo;

public interface UserDao {

	UserVo login(LoginDTO loginDTO);

	void register(UserVo vo);

	int checkOverId(String user_id);

	int checkOverNickname(String nickname);
	
}
