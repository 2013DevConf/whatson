package com.mm.whatson.controller.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.httpclient.HttpAdapter;
import com.mm.whatson.json.AttSecurityToken;

@Service
public class SpeechToTextServiceImpl implements SpeechToTextService {

	@Autowired
	HttpAdapter httpAdapter;
	
	@Override
	public String getText(AttSecurityToken token){
		String url = "https://api.att.com/rest/2/SpeechToText";		
		String audio = "/california.amr";
		System.out.println(audio.length());
		Map<String, String> requestHeaders = new HashMap<String, String>();
		requestHeaders.put("X-SpeechContext", "Generic");
		requestHeaders.put("Authorization", "Bearer 28845a1a3aab31a055f651b6b883d78d");
		requestHeaders.put("Content-Type", "audio/amr");
		
		String result = httpAdapter.sendPostRequest(url, requestHeaders, audio);		
		System.out.println(result);
		return result;//.getBody();
	}		
}
