package com.mm.whatson.controller.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.ObjectMapper;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Results {

	List<Event> event = null;

	Object category = null;

	List<Photo> photo;

	final private ObjectMapper objectMapper = new ObjectMapper();

	public List<Event> getEvent() {
		return event;
	}

	public void setEvent(List<Event> event) {
		this.event = event;
	}

	public List<Category> getCategory() {
		List<Category> result = new ArrayList<Category>();

		if (category != null) {
			if (category instanceof Category) {
				result.add((Category) category);
			} else if (category instanceof ArrayList) {
				// Hack to get around YQL sometimes returning category as an
				// array but sometimes as a single element
				List<Object> arrayList = (List<Object>) category;
				for (Object obj : arrayList) {
					Map<String, String> map = (Map<String, String>) obj;
					Category cat = new Category();
					cat.setId(map.get("id"));
					result.add(cat);
				}
			}
		}
		return result;
	}

	public void setCategory(Object category) {
		this.category = category;
	}

	public List<Photo> getPhoto() {
		return photo;
	}

	public void setPhoto(List<Photo> photo) {
		this.photo = photo;
	}

}