package com.mm.whatson.controller;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mm.whatson.controller.service.AccessTokenService;
import com.mm.whatson.controller.service.QueryService;
import com.mm.whatson.json.AttSecurityToken;

/**
 * Handles requests for the application home page.
 */
@RequestMapping(value="/watson", method = { RequestMethod.GET, RequestMethod.POST })
@Controller
public class WhatsOnController {

	@Autowired
	private QueryService queryService;

	@Autowired
	private AccessTokenService accessTokenService;
	
	@RequestMapping(value = "")
	@ResponseBody
	public Response getWhatson(final Request request) {
		return queryService.query(request);
	}
	
	@RequestMapping(value = "translate")
	@ResponseBody
	public AttSecurityToken getTranslation(final Request request) {
		AttSecurityToken token = accessTokenService.getToken();
		System.out.println(token.getAccess_token());
		return token;
	}
	
}