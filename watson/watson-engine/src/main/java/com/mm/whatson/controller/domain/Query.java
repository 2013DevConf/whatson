package com.mm.whatson.controller.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Query {

	Results results = null;

	public Results getResults() {
		return results;
	}

	public void setResults(Results results) {
		this.results = results;
	}

}
