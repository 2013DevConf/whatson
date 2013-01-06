package com.mm.whatson.controller.reversegeo;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.httpclient.HttpAdapter;

@Service
public class ReverseGeoLookupService {

	@Inject
	HttpAdapter httpAdapter;
	
    final private ObjectMapper objectMapper = new ObjectMapper();

	public String sendRevereseGeoRequest(String latitude, String longitude) {
		String url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
				+ latitude + "," + longitude + "&sensor=true";

		String response = httpAdapter.sendRequest(url);
		ReverseGeoCodeResponse reverseGeoCodeResponse = null;
/*
        try {
        	reverseGeoCodeResponse = objectMapper.readValue(response, ReverseGeoCodeResponse.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
*/
        List<Results> results = new ArrayList<Results>();// reverseGeoCodeResponse.getResults();
        if (results.size() < 1) {
        	return "las+vegas";
        }

		return "las+vegas";
	}
}
