package com.mm.whatson.controller.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.mm.whatson.json.AttSecurityToken;

@Service
public class SpeechToTextServiceImpl implements SpeechToTextService {

	@Override
	public String getText(AttSecurityToken token){
		String url = "https://api.att.com/rest/1/SpeechToText";
		
		String audio = getAudioFromFile();
		System.out.println(audio.length());
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.set("X-SpeechContext", "Generic");
		requestHeaders.set("Content-Length", audio.length() + "");
		requestHeaders.set("Accept", "application/json");
		requestHeaders.set("Authorization", "Bearer " + token.getAccess_token());
		requestHeaders.set("Content-Type", "audio/AMR");
//		requestHeaders.setContentType(new MediaType("audio", "x-wav"));

		MultiValueMap<String, String> postParameters = new LinkedMultiValueMap<String, String>();
		postParameters.add("", audio);
//		postParams.add("lastName", lastName);

		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(postParameters, requestHeaders);

		RestTemplate rest = new RestTemplate();
		ResponseEntity<String> s= rest.postForEntity(url, requestEntity, String.class);
		System.out.println(s);
		return s.toString();//.getBody();
	}
		
	private String getAudioFromFile(){
		StringBuilder sb = new StringBuilder();
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/california.amr")));
			String sCurrentLine;
			while ((sCurrentLine = reader.readLine()) != null) {
				sb.append(sCurrentLine + "\n");
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		System.out.println(sb.toString());
		return sb.toString();
	}
}
