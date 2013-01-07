package com.mm.whatson.controller.service;

import com.mm.whatson.json.AttSecurityToken;

public interface SpeechToTextService {

	String getText(AttSecurityToken token);
	String getText(AttSecurityToken token, String audio, String mimeType);

}