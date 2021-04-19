package com.green.user.logindto;

public class LoginDTO {

	private String user_id;
	private String user_pw;
    private boolean useCookie;
    public LoginDTO() {}
	public LoginDTO(String user_id, String user_pw, boolean useCookie) {
		super();
		this.user_id = user_id;
		this.user_pw = user_pw;
		this.useCookie = useCookie;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_pw() {
		return user_pw;
	}
	public void setUser_pw(String user_pw) {
		this.user_pw = user_pw;
	}
	public boolean isUseCookie() {
		return useCookie;
	}
	public void setUseCookie(boolean useCookie) {
		this.useCookie = useCookie;
	}
	@Override
	public String toString() {
		return "LoginDTO [user_id=" + user_id + ", user_pw=" + user_pw + ", useCookie=" + useCookie + "]";
	}
    
    
    
}
