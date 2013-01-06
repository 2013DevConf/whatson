package com.mm.whatson.controller.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mm.whatson.controller.Request;
import com.mm.whatson.controller.Response;
import com.mm.whatson.controller.domain.Category;
import com.mm.whatson.controller.domain.Event;
import com.mm.whatson.controller.reversegeo.ReverseGeoLookupService;

/**
 * Service providing main query interface
 */
@Service
public class QueryServiceImpl implements QueryService {

	@Autowired
	ReverseGeoLookupService reverseGeoLookupService;

	@Autowired
	YQLService yqlService;
	
	@Autowired
	FlickrService flickrService;

	@Override
	public Response query(Request request) {
		Response response = new Response();

		String areaName = request.getLocation();
		if (areaName == null) {
			areaName = reverseGeoLookupService.sendRevereseGeoRequest(request.getLatitude(), request.getLongitude());
		}
		
		List<Category> categories = yqlService.getCategoriesByName(request.getConstraint());
		List<Event> eventsInArea = yqlService.getEventsByLocation(areaName);
		List<Event> matchingEvents = filterEvents(eventsInArea, request.getConstraint(), categories);

		matchingEvents = updateEventsWithPhotoUrl(matchingEvents);
		response.setEvents(matchingEvents);
		return response;
	}

	/**
	 * Filter event based on eventName, category, venueName, description
	 * Matches returned are sorted based on the above order
	 */
	public List<Event> filterEvents(List<Event> events, String searchValue, List<Category> categories) {
		List<Event> matchingEventName = new ArrayList<Event>();
		List<Event> matchingDescription = new ArrayList<Event>();
		List<Event> matchingVenue = new ArrayList<Event>();
		List<Event> matchingCategory = new ArrayList<Event>();

		for (Event event : events) {
			if (event.matchesName(searchValue)) {
				matchingEventName.add(event);
			} else if (event.isInCategory(categories)) {
				matchingCategory.add(event);
			} else if (event.isAtVenue(searchValue)) {
				matchingVenue.add(event);
			} else if (event.matchDescription(searchValue)) {
				matchingDescription.add(event);
			}
		}

		List<Event> matchingEvents = new ArrayList<Event>();
		matchingEvents.addAll(matchingEventName);
		matchingEvents.addAll(matchingCategory);
		matchingEvents.addAll(matchingVenue);
		matchingEvents.addAll(matchingDescription);
		return removeDuplicateEvent(matchingEvents);
	}
	
	/**
	 * YQL is returning some duplicate events, so remove them
	 * @param events Full list of events
	 * @return Events with duplicates removed
	 */
	public List<Event> removeDuplicateEvent(List<Event> events) {
		List<String> seen = new ArrayList<String>();
		List<Event> result = new ArrayList<Event>();
		for (Event event : events) {
			if (!seen.contains(event.getName())) {
				result.add(event);
				seen.add(event.getName());
			}
		}
		return result;
	}
	
	/**
	 *  Get image url for the given event
	 * @param events List of events to get images for
	 * @return Events with image url populated
	 */
	private List<Event> updateEventsWithPhotoUrl(List<Event> events) {
		for (Event event : events) {
			String imageUrl = flickrService.getPhotoUrl(event.getName());
			if (imageUrl == null) {
				imageUrl = flickrService.getPhotoUrl(event.getDescription());
			}
			event.setImage(imageUrl);
		}
		return events;
	}
}