package com.mm.whatson.controller.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mm.whatson.json.AttSecurityToken;

@Service
public class AccessTokenServiceImpl implements AccessTokenService {

	@Override
	public AttSecurityToken getToken(){
		AttSecurityToken token = null;
		try {
			String url = "https://api.att.com/oauth/token?client_id=17d9b4ad7786f29e7a5959cd829110ce&client_secret=17679eff81a62d10&grant_type=client_credentials&scope=SPEECH";
			RestTemplate rest = new RestTemplate();
			token = rest.getForObject(url, AttSecurityToken.class);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(token);
		return token;
	}
}
