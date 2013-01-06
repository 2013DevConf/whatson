package com.mm.whatson.controller;

public class Request {
	String constraint = null;
	String latitude = null;
	String longitude = null;
	String radius = null;

	public String getConstraint() {
		return constraint;
	}

	public void setConstraint(String constraint) {
		this.constraint = constraint;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getRadius() {
		if (radius == null) {
			radius = "100";
		}
		return radius;
	}

	public void setRadius(String radius) {
		this.radius = radius;
	}	
}