package com.mm.whatson.controller.service;

import com.mm.whatson.json.AttSecurityToken;

public interface AccessTokenService {

	public abstract AttSecurityToken getToken();

}