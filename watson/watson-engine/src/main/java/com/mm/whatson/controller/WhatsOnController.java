package com.mm.whatson.controller;

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
	
	@Autowired
	private SpeechToTextService speechToTextService;
	
	@RequestMapping(value = "")
	@ResponseBody
	public Response getWhatson(final Request request) {
		return queryService.query(request);
	}
	
	@RequestMapping(value = "token")
	@ResponseBody
	public AttSecurityToken getToken(final Request request) {
		AttSecurityToken token = accessTokenService.getToken();
		System.out.println(token.getAccess_token());
		return token;
	}
	@RequestMapping(value = "translate")
	@ResponseBody
	public Object getTranslation(final Request request) {
		AttSecurityToken token = accessTokenService.getToken();
		Object obj = speechToTextService.getText(token);
		System.out.println(obj);
		return obj;
	}
	
}