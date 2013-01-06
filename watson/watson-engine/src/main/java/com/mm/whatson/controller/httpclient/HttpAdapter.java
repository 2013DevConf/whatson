package com.mm.whatson.controller.httpclient;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.FileEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

@Component
public class HttpAdapter {

	public String sendPostRequest(String url, Map<String, String> headers,
			String audio) {
		String result = "";
		try {
			DefaultHttpClient httpClient = new DefaultHttpClient();
			HttpPost postRequest = new HttpPost(url);
			if (headers != null) {
				for (String key : headers.keySet()) {
					postRequest.addHeader(key, headers.get(key));
				}
			}

			File file = ResourceUtils.getFile("classpath:" + audio);
			FileEntity fEntity = new FileEntity(file, "");
			fEntity.setChunked(true);
			
			postRequest.setEntity(fEntity);
			HttpResponse response;
			response = httpClient.execute(postRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				System.out.println("Silently ignore ");
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
					(response.getEntity().getContent())));
			String output;
			while ((output = br.readLine()) != null) {
				result += output + "\n";
			}

			httpClient.getConnectionManager().shutdown();
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	public String sendRequest(String url) {
		String result = "";
		try {
			DefaultHttpClient httpClient = new DefaultHttpClient();
			HttpGet getRequest = new HttpGet(url);
			getRequest.addHeader("accept", "application/json");

			HttpResponse response;
			response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ response.getStatusLine().getStatusCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
					(response.getEntity().getContent())));
			String output;
			while ((output = br.readLine()) != null) {
				result += output + "\n";
			}

			httpClient.getConnectionManager().shutdown();
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	private String getMIMEType(File file) throws IOException {
		// AMR/AMR-WB check will be done according to RFC3267
		// (http://www.ietf.org/rfc/rfc3267.txt?number=3267)
		final byte[] AMRHeader = { '#', '!', 'A', 'M', 'R' };
		final byte[] AMRWBExtension = { '-', 'W', 'B' };

		final byte[] RIFFHeader = { 'R', 'I', 'F', 'F' };
		final byte[] WAVEHeader = { 'W', 'A', 'V', 'E' };

		// Check for Speex in Ogg files. Ogg will be checked according to
		// RFC3533 (http://www.ietf.org/rfc/rfc3533.txt). Speex will be checked
		// according to the format specified the speex manual
		// (www.speex.org/docs/manual/speex-manual/node8.html)
		final byte[] OggHeader = { 'O', 'g', 'g', 'S' };
		final byte[] SpeexHeader = { 'S', 'p', 'e', 'e', 'x', ' ', ' ', ' ' };

		final byte[] header = new byte[4];
		FileInputStream fStream = new FileInputStream(file);
		// Read the first 4 bytes
		fStream.read(header, 0, 4);

		String contentType = null;
		if (Arrays.equals(header, RIFFHeader)) {
			// read more bytes to determine if it's a wav file
			fStream.skip(4); // size if wav structure
			fStream.read(header, 0, 4); // wav header if wav structure
			if (Arrays.equals(header, WAVEHeader)) {
				contentType = "audio/wav";
			}
		} else if (Arrays.equals(header, OggHeader)) {
			// first 28 bytes are ogg. Afterwards should be speex header.
			fStream.skip(24);
			final byte[] headerExt = new byte[8];
			fStream.read(headerExt, 0, 8);
			if (Arrays.equals(headerExt, SpeexHeader)) {
				contentType = "audio/x-speex";
			}
		}

		// try looking for AMR
		final byte[] testHeader = new byte[5];
		for (int i = 0; i < header.length; ++i) {
			testHeader[i] = header[i];
		}
		fStream.read(testHeader, 4, 1);
		if (Arrays.equals(testHeader, AMRHeader)) {
			final byte[] headerExt = new byte[3];
			fStream.read(headerExt, 0, 3);
			if (Arrays.equals(headerExt, AMRWBExtension)) {
				contentType = "audio/amr-wb";
			} else {
				contentType = "audio/amr";
			}
		}

		fStream.close();

		return contentType;
	}
}