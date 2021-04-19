package com.green.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.green.user.dao.UserDao;
import com.green.user.logindto.LoginDTO;
import com.green.user.service.UserService;
import com.green.user.vo.UserVo;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public UserVo login(LoginDTO loginDTO) {
		UserVo userVo	= userDao.login(loginDTO);
		return userVo;
	}

	@Override
	public void register(UserVo vo) {
		userDao.register(vo);
		
	}

	@Override
	public int idCheck(String user_id) {
		System.out.println(" service idcheck():" + user_id);
		int checkId	= userDao.checkOverId(user_id);
		return checkId;
	}

	@Override
	public int nicknameCheck(String nickname) {
		System.out.println(" service nicknamecheck():" + nickname);
		int checknickname	= userDao.checkOverNickname(nickname);
		return checknickname;
	}

//	@Override
//	public UserVo getUser(String user_id) {
//		
//		return ;
//	}

}
