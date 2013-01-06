package com.mm.whatson.controller.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.domain.Photo;
import com.mm.whatson.controller.domain.Results;
import com.mm.whatson.controller.domain.YQLResponse;
import com.mm.whatson.controller.httpclient.HttpAdapter;

@Service
public class FlickrService {

	private final String apiKey = "05c3277a0df4df925d25d936a74cda73";

	@Autowired
	HttpAdapter httpAdapter;
	
	final private ObjectMapper objectMapper = new ObjectMapper();
	
	public String getPhotoUrl(String description) {
		String url;
		try {
			url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20text%3D%22" + URLEncoder.encode(description, "UTF-8") + "%22%20and%20api_key%3D%22" + apiKey + "%22&format=json";
		} catch (UnsupportedEncodingException e1) {
			return null;
		}
		
		String yqlResponse = null;
		try {
		    yqlResponse = httpAdapter.sendRequest(url);
		} catch (RuntimeException e) {
			return null;
		}
		YQLResponse yQLResultQueryField = null;

		try {
			System.out.println(url);
			System.out.println(yqlResponse);
			yQLResultQueryField = objectMapper.readValue(yqlResponse,
					YQLResponse.class);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
		Results results = yQLResultQueryField.getQuery().getResults();
		if (results != null) {
			if (results.getPhoto() != null) {
				Photo photo = results.getPhoto().get(0);
				return getUrl(photo);
			}
		}
		return null;
	}
	
	private String getUrl(Photo photo) {
		return "http://www.flickr.com/photos/" + photo.getOwner() + "/" + photo.getId() + "/";
	}
}
