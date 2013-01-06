package com.mm.whatson.controller.service;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.httpclient.HttpAdapter;
import com.mm.whatson.json.AttSecurityToken;

@Service
public class SpeechToTextServiceImpl implements SpeechToTextService {

	@Autowired
	HttpAdapter httpAdapter;

	@Override
	public String getText(AttSecurityToken token) {
		String resultText = null;
		String url = "https://api.att.com/rest/2/SpeechToText";
		String audio = "/california.amr";
		System.out.println(audio.length());
		Map<String, String> requestHeaders = new HashMap<String, String>();
		requestHeaders.put("X-SpeechContext", "Generic");
		requestHeaders.put("Authorization", "Bearer 28845a1a3aab31a055f651b6b883d78d");
		requestHeaders.put("Content-Type", "audio/amr");

		String result = httpAdapter.sendPostRequest(url, requestHeaders, audio);
		System.out.println(result);
		try {
			JSONObject json = (JSONObject) JSONSerializer.toJSON(result);
			JSONObject recognition = json.getJSONObject("Recognition");
			JSONArray nBest = recognition.getJSONArray("NBest");
			JSONObject nBestO = (JSONObject) JSONSerializer.toJSON(nBest
					.getString(0));
			resultText = nBestO.getString("ResultText");
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(resultText);
		return resultText;// .getBody();
	}
}
