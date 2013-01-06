package com.mm.whatson.controller;

import java.util.List;

import com.mm.whatson.controller.domain.Event;

public class Response {
	int count = 0;
	 List<Event> events = null;

	 public List<Event> getEvents() {
	  return events;
	 }

	 public void setEvents(List<Event> events) {
	  this.events = events;
	 }

	public int getCount() {
		if (events != null) {
			count = events.size();
		}
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	 
	 
}
