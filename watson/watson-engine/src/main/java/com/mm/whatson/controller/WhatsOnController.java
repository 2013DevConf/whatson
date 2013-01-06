package com.mm.whatson.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mm.whatson.controller.service.QueryService;

/**
 * Handles requests for the application home page.
 */
@RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
@Controller
public class WhatsOnController {

	@Inject
	QueryService queryService;

	@RequestMapping(value = "/watson")
	@ResponseBody
	public Response getWhatson(final Request request) {
		return queryService.query(request);
	}
}