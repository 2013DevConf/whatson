package com.mm.whatson.controller.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Event {
	String venue_name = null;
	String name = null;
	String start_date = null;
	String ticket_price = null;

	public String getVenue_name() {
		return venue_name;
	}

	public void setVenue_name(String venue_name) {
		this.venue_name = venue_name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getTicket_price() {
		return ticket_price;
	}

	public void setTicket_price(String ticket_price) {
		this.ticket_price = ticket_price;
	}
}
