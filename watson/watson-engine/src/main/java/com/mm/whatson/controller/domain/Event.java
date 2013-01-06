package com.mm.whatson.controller.domain;

import java.util.Arrays;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Event {
	String venue_name = null;
	String name = null;
	String start_date = null;
	String ticket_price = null;
	String category_id = null;
	String description = null;
	String ticket_url = null;
	String image = null;

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

	public String getCategory_id() {
		return category_id;
	}

	public void setCategory_id(String category_id) {
		this.category_id = category_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public boolean isInCategory(List<Category> categories) {
		if (category_id != null && categories != null) {
			String[] ids = category_id.split(";");
			List<String> idList = Arrays.asList(ids);
			for (Category cat : categories) {
				if (idList.contains(cat.getId())) {
					return true;
				}
			}
		}
		return false;
	}

	public boolean isAtVenue(String val) {
		if (venue_name != null && val != null) {
			if (venue_name.toLowerCase().contains(val.toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	public boolean matchDescription(String val) {
		if (description != null && val != null) {
			if (description.toLowerCase().contains(val.toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	public boolean matchesName(String val) {
		if (name != null && val != null) {
			if (name.toLowerCase().contains(val.toLowerCase())) {
				return true;
			}
		}
		return false;
	}
}