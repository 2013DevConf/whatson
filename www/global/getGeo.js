// global variable holding the licence key for Bing REST services
var credentials = "Amf3khlDckLVtYJ_ehQ-FOLXofiaH6ETAID7AH4N_p7HT-cJRb13cLQhjeg2JzeE";

//scrolling function
function scrollWin(whereTo) {
	jQuery('html, body').animate({
		scrollTop: $(whereTo).offset().top
	}, 1000);
}
function getWindowWidth () {
	windowWidth = $(window).width();
}
function getWindowHeight () {
	windowHeight = $(document).height();
	footerHeight = $('footer').height();
	noFooterHeight = windowHeight - (footerHeight + 42);
}
function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
}
function validateZip(myZip) {
	var pattern = /^[0-9]{5}$/;
	if (!pattern.test($(myZip).val())) {
		isZipValid = 'notValid';
		//$(myZip).after('<p>zip is invalid</p>');
	} else {
		isZipValid = 'isValid';
	}
}
function detectPhone()
    {
     var theAgent = navigator.userAgent.toLowerCase();
    if (theAgent.search("iphone") > -1) { phone = 'iPhone'; }
    else if (theAgent.search("android") > -1) { phone = 'Android'; }
	else if (theAgent.search("iemobile") > -1) { phone = 'Win'; }
	else if (theAgent.search("blackberry") > -1) { phone = 'BB'; }
	else if (theAgent.search("ipad") > -1) { phone = 'iPad'; }
	else { phone = ''; }
    }
//Get long and lat
function getGeo() {
	if (window.blackberry) {
		window.location = altURL;
		//	this code is for LBS hookup on BB6 devices -not ready for prime-time yet
		//	the GPS hardware curently needs to be activated via JAVA in a native app to function - awaiting RIM software update to enable
		// if (blackberry.location.GPSSupported) {
		// var modeCellsite = 0,
		// modeAssisted = 1,
		// modeAutonomous = 2,
		// isUpdated = false,
		// theCount = 0,
		// bb_position = {
		//	coords: {
		//		latitude: blackberry.location.latitude,
		//		longitude:  blackberry.location.longitude
		//	}
		// };

		//     blackberry.location.onLocationUpdate(storePosition(bb_position));
		//     blackberry.location.setAidMode(modeAutonomous);

		//     while (theCount++ < 10 && !isUpdated) {
		//	    isUpdated = blackberry.location.refreshLocation();
		//		bb_position.coords.latitude = blackberry.location.latitude;
		//		bb_position.coords.longitude = blackberry.location.longitude;
		//	}
		// } else {
		//	displayError();
		// }
	} else {
		if (window.navigator.geolocation) {
			$('.ui-loader').hide();
			var timeoutVal = 10 * 1000 * 1000;
			window.navigator.geolocation.getCurrentPosition(
				storePosition,
				displayError
			);
			}
			else {
			alert("Geolocation is not supported by this browser");
			window.location = altURL;
		}
	}
}

function storePositionByCity(city, state) {
	var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?countryRegion=US&adminDistrict="+state+"&locality="+city+"&output=json&jsonp=geocodeZipFromPoint&key=" + credentials;
    callRestService(geocodeRequest);
}

function geocodeZipFromPoint(result) {
	//console.log(result);
	var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + result.resourceSets[0].resources[0].point.coordinates[0] +','+ result.resourceSets[0].resources[0].point.coordinates[1] + "?output=json&jsonp=redirectToStoreLocator&key=" + credentials;
    callRestService(geocodeRequest);
}

function getDeviceGeo(usage) {
	if (window.navigator.geolocation !== null) {
	$('.ui-loader').show();
		var timeoutVal = 10 * 1000 * 1000;
		if (usage === 'state') {
			window.navigator.geolocation.getCurrentPosition(
			localizeStateFromGeo,
		displayErrorContact
		);
		} else if (usage === 'store') {
		window.navigator.geolocation.getCurrentPosition(
		storePosition,
		displayError
		);
		}
	}
	else {
		alert("Geolocation is not supported by this browser");
		window.location = altContactURL;
	}
}

var altContactURL = 'contact-form.m.html';
var contactURL = 'contact.m.html';
function localizeStateFromGeo(position) {
	localStorage.setItem('myLat', position.coords.latitude);
	localStorage.setItem('myLong', position.coords.longitude);
	localStorage.setItem('isGeo','yes');
	//console.log('stored position');
	var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + position.coords.latitude +','+ position.coords.longitude + "?output=json&jsonp=redirectToContactUs&key=" + credentials;
    callRestService(geocodeRequest);

}

function redirectToContactUs(result) {
	localStorage.setItem('state', result.resourceSets[0].resources[0].address.adminDistrict);
	$('.ui-loader').hide();
	window.location = contactURL;
}

function callRestService(request){
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    script.setAttribute("style", 'display:none;');
    document.body.appendChild(script);
}

function redirectToStoreLocator(result) {
	//console.log(result.resourceSets[0].resources[0].address);
    var userCurrentLat, userCurrentLong, userCurrentPostalCode, SL_respJSON;
    userCurrentPostalCode = result.resourceSets[0].resources[0].address.postalCode;
    userCurrentState = result.resourceSets[0].resources[0].address.adminDistrict;
    localStorage.setItem('zip', userCurrentPostalCode);
    localStorage.setItem('state', userCurrentState);
    $('.ui-loader').hide();
	window.location = primaryURL;
}

function storePosition(position) {
	var geocodeRequest;
	localStorage.setItem('myLat', position.coords.latitude);
	localStorage.setItem('myLong', position.coords.longitude);
	localStorage.setItem('isGeo','yes');
	geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + position.coords.latitude +','+ position.coords.longitude + "?output=json&jsonp=redirectToStoreLocator&key=" + credentials;
    callRestService(geocodeRequest);
}
function displayError(error) {
  var errors = {
	1: 'Permission denied',
	2: 'Position unavailable',
	3: 'Request timeout'
  };
  $('.ui-loader').hide();
  window.location = altURL;
}

function displayErrorContact(error) {
  var errors = {
	1: 'Permission denied',
	2: 'Position unavailable',
	3: 'Request timeout'
  };
  $('.ui-loader').hide();
  //console.log("Error: " + errors[error.code]);
  if (errors[error.code]) { window.location = altContactURL; }
}

function setFormVariables() {
	findStoreZip = $('#findStoreZip').val();
	findStoreCity = $('#findStoreCity').val();
	findStoreState = $('#findStoreState').val();
}
$(document).ready(function() {
detectPhone();
$('.fullSite').click(function(){
setFullSite();
});
//iOS scaling bug fixs
if (phone == 'iPad') {
	window.location = 'http://www.att.com';
}
if(phone == 'iPhone') {
	(function(doc) {
	
		var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
		
		function fix() {
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}
	
		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [0.25, 3.2];
			doc[addEvent](type, fix, true);
		}
	
	}
	(document));
}
});