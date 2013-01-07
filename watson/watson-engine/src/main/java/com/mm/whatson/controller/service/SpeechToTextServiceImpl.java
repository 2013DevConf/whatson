package com.mm.whatson.controller.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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
	private String audioFilePath;
	
	@Autowired
	HttpAdapter httpAdapter;

	@Override
	public String getText(AttSecurityToken token) {
		String audio = "/california.amr";
		return getTextFull(token, audio, "audio/amr");
	}
	
	@Override
	public String getText(AttSecurityToken token, String audio, String mimeType) {
		saveAudioToFile(audio);
		return getTextFull(token, audioFilePath, mimeType);
	}

	private void saveAudioToFile(String audio){
		System.out.println(audio.length());
		try {
			File file = new File(audioFilePath);
			 
			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}
 
			FileWriter fw = new FileWriter(file.getAbsoluteFile());
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(audio);
			bw.close();	
		} catch (SecurityException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}
	private String getTextFull(AttSecurityToken token, String file, String mimeType){
		String resultText = null;
		String url = "https://api.att.com/rest/2/SpeechToText";
		Map<String, String> requestHeaders = new HashMap<String, String>();
		requestHeaders.put("X-SpeechContext", "Generic");
		requestHeaders.put("Authorization", "Bearer 28845a1a3aab31a055f651b6b883d78d");
		requestHeaders.put("Content-Type", mimeType);
		String result = httpAdapter.sendPostRequest(url, requestHeaders, "/myaudio.amr");
		System.out.println(result);
		try {
			JSONObject json = (JSONObject) JSONSerializer.toJSON(result);
			JSONObject recognition = json.getJSONObject("Recognition");
			JSONArray nBest = recognition.getJSONArray("NBest");
			JSONObject nBestO = (JSONObject) JSONSerializer.toJSON(nBest.getString(0));
			resultText = nBestO.getString("ResultText");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		System.out.println(resultText);
		return resultText;// .getBody();
	}

}
