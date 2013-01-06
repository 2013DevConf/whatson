package com.mm.whatson.controller.reversegeo;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Results {

	AddressComponents address_components = null;

	public AddressComponents getAddress_components() {
		return address_components;
	}

	public void setAddress_components(AddressComponents address_components) {
		this.address_components = address_components;
	}

}
