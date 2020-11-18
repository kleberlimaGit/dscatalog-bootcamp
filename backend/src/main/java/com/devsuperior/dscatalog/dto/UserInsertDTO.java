package com.devsuperior.dscatalog.dto;

import com.devsuperior.dscatalog.services.validation.UserInsertValid;

@UserInsertValid // verifica se o email é unico no banco de dados.
public class UserInsertDTO extends UserDTO{

	private static final long serialVersionUID = 1L;
	
	private String password;
	
	UserInsertDTO(){
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
