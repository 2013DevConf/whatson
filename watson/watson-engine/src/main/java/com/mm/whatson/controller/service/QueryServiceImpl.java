package com.mm.whatson.controller.service;

import java.util.List;

import javax.inject.Inject;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.Request;
import com.mm.whatson.controller.Response;
import com.mm.whatson.controller.domain.Event;
import com.mm.whatson.controller.domain.YQLResponse;
import com.mm.whatson.controller.httpclient.HttpAdapter;
import com.mm.whatson.controller.reversegeo.ReverseGeoLookupService;

@Service
public class QueryServiceImpl implements QueryService {

	@Autowired
	ReverseGeoLookupService reverseGeoLookupService;

	@Autowired
	HttpAdapter httpAdapter;
	
    final private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public Response query(Request request) {
		Response response = new Response();

		String areaName = reverseGeoLookupService.sendRevereseGeoRequest(request.getLatitude(), request.getLongitude());
		
		String yqlUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20upcoming.events.bestinplace%20where%20woeid%20in%20(select%20woeid%20from%20geo.places%20where%20text%3D%22" + areaName + "%22%20limit%201)&format=json&diagnostics=true";

		String yqlResponse = httpAdapter.sendRequest(yqlUrl);
		YQLResponse yQLResultQueryField = null;

        try {
        	System.out.println(yqlResponse);
        	yQLResultQueryField = objectMapper.readValue(yqlResponse, YQLResponse.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

		List<Event> events = yQLResultQueryField.getQuery().getResults().getEvent();
		response.setEvents(events);

		return response;
	}
}
