package com.mm.whatson.controller.reversegeo;

import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.httpclient.HttpAdapter;

@Service
public class ReverseGeoLookupService {

	@Autowired
	HttpAdapter httpAdapter;

	private final String DEFAULT_LOCATION = "Las Vegas";
	private final ObjectMapper objectMapper = new ObjectMapper();

	public String sendRevereseGeoRequest(String latitude, String longitude) {
		String url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
				+ latitude + "," + longitude + "&sensor=true";

		String response = httpAdapter.sendRequest(url);
		System.out.println(url);
		ReverseGeoCodeResponse reverseGeoCodeResponse = null;

		try {
			
			reverseGeoCodeResponse = objectMapper.readValue(response,
					ReverseGeoCodeResponse.class);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		List<Results> results = reverseGeoCodeResponse.getResults();
		String state = DEFAULT_LOCATION;
		
		if (results != null && results.size() > 0) {
			Results result = results.get(0);
			List<AddressComponents> addressComponents = result
					.getAddress_components();
			// Address component 6 is the state
			if (addressComponents != null && addressComponents.size() > 4) {
				AddressComponents address = addressComponents.get(4);
				if (address.getLong_name() != null) {
					state = address.getLong_name();
				}
				state = address.getLong_name();
			}
			System.out.println("Location = " + state);
		}
		return state;
	}
}
