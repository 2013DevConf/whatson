package com.mm.whatson.controller;

import java.util.List;

import com.mm.whatson.controller.domain.Event;

public class Response {
	 List<Event> events = null;

	 public List<Event> getEvents() {
	  return events;
	 }

	 public void setEvents(List<Event> events) {
	  this.events = events;
	 }
}
