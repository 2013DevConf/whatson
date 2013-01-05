package com.mm.whatson.controller;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
@Controller
public class WhatsOnController {

    @RequestMapping(value = "/watson")
    @ResponseBody
    public Response getWhatson(@Valid final Request request) {
    	return new Response();
    }

    
}