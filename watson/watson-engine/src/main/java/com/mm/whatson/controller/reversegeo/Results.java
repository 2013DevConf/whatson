package com.mm.whatson.controller.reversegeo;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Results {

	List<AddressComponents> address_components;

	public void setAddress_components(List<AddressComponents> address_components) {
		this.address_components = address_components;
	}

	public List<AddressComponents> getAddress_components() {
		return address_components;
	}

}
