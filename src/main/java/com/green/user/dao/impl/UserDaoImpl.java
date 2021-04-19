package com.green.user.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.green.user.dao.UserDao;
import com.green.user.logindto.LoginDTO;
import com.green.user.vo.UserVo;

@Repository
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public UserVo login(LoginDTO loginDTO) {
		UserVo	userVo	=	sqlSession.selectOne("User.Login", loginDTO);
		return userVo;
	}

	@Override
	public void register(UserVo vo) {
		System.out.println("dao register:"+vo);
		sqlSession.insert("User.Register", vo);
		
	}

	@Override
	public int checkOverId(String user_id) {
		System.out.println("dao checkOverId:"+user_id);
		int	result	=	sqlSession.selectOne("User.checkOverId", user_id);
		return result;
		
	}

	@Override
	public int checkOverNickname(String nickname) {
		System.out.println("dao nicknamecheck:"+nickname);
		int	result	=	sqlSession.selectOne("User.checkOverNickname", nickname);
		return result;
	}

}
