package com.mm.whatson.controller.service;

import java.net.URLEncoder;
import java.util.Collections;
import java.util.List;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.domain.Category;
import com.mm.whatson.controller.domain.Event;
import com.mm.whatson.controller.domain.Results;
import com.mm.whatson.controller.domain.YQLResponse;
import com.mm.whatson.controller.httpclient.HttpAdapter;

@Service
public class YQLService {

	@Autowired
	HttpAdapter httpAdapter;

	final private ObjectMapper objectMapper = new ObjectMapper();
	final private int MAX_RESULTS = 40;

	public YQLService() {
		objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES,
				true);
		objectMapper.configure(JsonParser.Feature.ALLOW_COMMENTS, true);
	}

	public List<Category> getCategoriesByName(String categoryName) {
		String yqlUrl;
		try {
			yqlUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20upcoming.category%20where%20name%20like%20%22%25"
					+ URLEncoder.encode(categoryName, "UTF-8")
					+ "%25%22%20or%20description%20like%20%22%25"
					+ categoryName + "%25%22&format=json";
			String yqlResponse = httpAdapter.sendRequest(yqlUrl);
			YQLResponse yQLResultQueryField = null;

			System.out.println(yqlUrl);
			System.out.println(yqlResponse);
			yQLResultQueryField = objectMapper.readValue(yqlResponse,
					YQLResponse.class);

			Results results = yQLResultQueryField.getQuery().getResults();
			if (results != null) {
				return results.getCategory();
			}
		} catch (Exception e) {
			System.out.println("Opps..");
		}
		return Collections.emptyList();
	}

	public List<Event> getEventsByLocation(String areaName) {
		String yqlUrl;
		try {
			yqlUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20upcoming.events.bestinplace("
					+ MAX_RESULTS
					+ ")%20where%20woeid%20in%20(select%20woeid%20from%20geo.places%20where%20text%3D%22"
					+ URLEncoder.encode(areaName, "UTF-8")
					+ "%22%20limit%201)&format=json&diagnostics=true";

			String yqlResponse = httpAdapter.sendRequest(yqlUrl);
			YQLResponse yQLResultQueryField = null;

			System.out.println(yqlUrl);
			System.out.println(yqlResponse);
			yQLResultQueryField = objectMapper.readValue(yqlResponse,
					YQLResponse.class);

			Results results = yQLResultQueryField.getQuery().getResults();
			if (results != null) {
				return results.getEvent();
			}
		} catch (Exception e) {
			System.out.println("Opps..");
		}
		return Collections.emptyList();

	}
}
