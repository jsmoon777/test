package com.green.user.vo;

public class UserVo {
	private String user_id;
	private String user_pw;
	private String user_name;
	private String user_birth;
	private String user_email;
	private String user_phone;
	private String gender;
	private String user_oaddress;
	private String user_address;
	private String user_dtaddress;
	private String regdate;
	private String loca_prov;
	private String nickname;
	
	public UserVo() {}

	public UserVo(String user_id, String user_pw, String user_name, String user_birth, String user_email,
			String user_phone, String gender, String user_oaddress, String user_address, String user_dtaddress,
			String regdate, String loca_prov, String nickname) {
		super();
		this.user_id = user_id;
		this.user_pw = user_pw;
		this.user_name = user_name;
		this.user_birth = user_birth;
		this.user_email = user_email;
		this.user_phone = user_phone;
		this.gender = gender;
		this.user_oaddress = user_oaddress;
		this.user_address = user_address;
		this.user_dtaddress = user_dtaddress;
		this.regdate = regdate;
		this.loca_prov = loca_prov;
		this.nickname = nickname;
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

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_birth() {
		return user_birth;
	}

	public void setUser_birth(String user_birth) {
		this.user_birth = user_birth;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public String getUser_phone() {
		return user_phone;
	}

	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getUser_oaddress() {
		return user_oaddress;
	}

	public void setUser_oaddress(String user_oaddress) {
		this.user_oaddress = user_oaddress;
	}

	public String getUser_address() {
		return user_address;
	}

	public void setUser_address(String user_address) {
		this.user_address = user_address;
	}

	public String getUser_dtaddress() {
		return user_dtaddress;
	}

	public void setUser_dtaddress(String user_dtaddress) {
		this.user_dtaddress = user_dtaddress;
	}

	public String getRegdate() {
		return regdate;
	}

	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}

	public String getLoca_prov() {
		return loca_prov;
	}

	public void setLoca_prov(String loca_prov) {
		this.loca_prov = loca_prov;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	@Override
	public String toString() {
		return "UserVo [user_id=" + user_id + ", user_pw=" + user_pw + ", user_name=" + user_name + ", user_birth="
				+ user_birth + ", user_email=" + user_email + ", user_phone=" + user_phone + ", gender=" + gender
				+ ", user_oaddress=" + user_oaddress + ", user_address=" + user_address + ", user_dtaddress="
				+ user_dtaddress + ", regdate=" + regdate + ", loca_prov=" + loca_prov + ", nickname=" + nickname + "]";
	}

	

	
	
	
}
