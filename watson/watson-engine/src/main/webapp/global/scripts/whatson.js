//scrolling function
function scrollWin(whereTo) {
	jQuery('html, body').animate( {
		scrollTop: $(whereTo).offset().top
	}, 1000);
}
function getWindowWidth () {
	windowWidth = $(document).width();
}
function getWindowHeight () {
	windowHeight = $(document).height();
	footerHeight = $('footer').height();
	noFooterHeight = windowHeight - (footerHeight + 42);
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
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

//iOS scaling bug fix
if(isMobile.iOS()) {
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
			scales = [.25, 3.2];
			doc[addEvent](type, fix, true);
		}
	
	}
	(document));
}

//Get long and lat
function getGeo() {
	console.log('in getGeo');
	if (navigator.geolocation !== null) {
		console.log('has location');
	  var timeoutVal = 10 * 1000 * 1000;
	  navigator.geolocation.getCurrentPosition(
		storePosition, 
		displayError,
		{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
	  );
	}
	else {
	  alert("Geolocation is not supported by this browser");
	  document.location = altURL;
	}
}
function storePosition(position) {
	localStorage.setItem('myLat', position.coords.latitude);
	localStorage.setItem('myLong', position.coords.longitude);
	localStorage.setItem('isGeo','yes');
	console.log('stored position');
	$.get('http://www.mapquestapi.com/geocoding/v1/reverse?key=Gmjtd%7Clu6zn1ua2d%2C70%3Do5-l0z0u&lat='+position.coords.latitude+'&lng='+position.coords.longitude+'&callback=renderReverse', function(data) {
        var startPos = data.responseText.indexOf('postalCode')+13;
        var endPos = data.responseText.indexOf('postalCode')+18;
        localStorage.setItem('zip', data.responseText.substring(startPos, endPos));
    	
    });
	document.location = primaryURL;
}
function displayError(error) {
  var errors = { 
	1: 'Permission denied',
	2: 'Position unavailable',
	3: 'Request timeout'
  };
  console.log("Error: " + errors[error.code]);
  if (errors[error.code]) { document.location = altURL; }
}

//clear fields function
(function( $ ) {
	// define the initialValue() function
	$.fn.initialValue = function(value) {
		if (value) {
			return this.attr('data-initial-value', value);
		} else {
			return this.attr('data-initial-value');
		}
	}
	;
	$.fn.clearInput = function() {
		return this
		      .focus(function() {
			if (this.value == $(this).initialValue()) {
				this.value = '';
			}
		}
		)
		      .blur(function() {
			if (this.value == '') {
				this.value = $(this).initialValue();
			}
		}
		)
		      .each(function(index, elt) {
			$(this).initialValue(this.value);
		}
		);
	}
	;
	// apply plugin to all inputs with class ".clear-input"
	$(function() {
		$('input.clear-input').clearInput();
	}
	);
}
)( jQuery );

function goToUrl(url) {
	document.location.href=url;
	return false;
	//document.location.replace(url);
}

function setFormVariables() {
	//All form variable settings goes here.
	//zipLoc = $('#zipLoc').val();
	//findStoreZip = $('#findStoreZip').val();
}

/* launching any Modal Window Code */
function launchModal(id) {
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();

		//Set height and width to mask to fill up the whole screen
		$('.maskOnClick').css({'width':maskWidth,'height':maskHeight});

		//transition effect
		$('.maskOnClick').fadeIn(800);
		$('.maskOnClick').fadeTo("normal",0.7);

		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();

		//Set the popup window to center
		$(id).css('top', winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);

		//transition effect
		$(id).fadeIn(1000);
}

$(document).ready(function() {
	<!-- Start: Script needed for mobile Modal on click -->					   
	//select all the a href tag with name that contains a case sensitive word 'Modal'
    $('a[name*="Modal"]').click(function(e) {
		$('.anyModal').show();
		//Cancel the link behavior
		e.preventDefault();
		//Get the a href tag
		var id = $(this).attr('href');
		//alert(id);
		launchModal(id);
	
	});
	//If close button is clicked
	$('.windowOnClick .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('.maskOnClick, .windowOnClick').hide();
	});

	//If mask is clicked
	$('.maskOnClick').click(function () {
		$(this).hide();
		$('.windowOnClick').hide();
		$('.anyModal').hide();
	});				   
	<!-- End: Script needed for mobile Modal on click -->
	//Yes/No toggle
	$('#yesNoToggle').toggle(function () {
			$('#yesNoToggle').removeClass('gradB3toB4').addClass('gradG8toG2');
			$('#toggleButtonLeft').removeClass('onToggleLeft').addClass('offToggle offToggleLeft gradWtoG3');
			$('#toggleButtonRight').removeClass('offToggle offToggleRight gradWtoG3').addClass('onToggleRight');
			$('#toggleLeftCopy').addClass('dNO');
			$('#toggleRightCopy').removeClass('dNO');
		},
			function () {
			$('#yesNoToggle').removeClass('gradG8toG2').addClass('gradB3toB4');
			$('#toggleButtonLeft').addClass('onToggleLeft').removeClass('offToggle offToggleLeft gradWtoG3');
			$('#toggleButtonRight').removeClass('onToggleRight').addClass('offToggle offToggleRight gradWtoG3');
			$('#toggleLeftCopy').removeClass('dNO');
			$('#toggleRightCopy').addClass('dNO');
		}
	);

	/* Start: Custom jqm for color popup. Note: Same thing existss on accessories-details page. copy to common location and use in both */
	/* Dev Notes: please delete this comment section: we need to have pre-defined colors and images of those for this to work, here I am using Raspberry, white, black and orange 
	   they all exist in the images/mHRSprite.png file for now.  */
	$('#Raspberry').live('click',function(){
		$('#WhiteRadioIcon, #BlackRadioIcon, #OrangeRadioIcon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
		$('#RaspRadioIcon').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on');
		var selectedcolorID = "Raspberry";
		chngColor(selectedcolorID);
	});
	$('#White').live('click',function(){
		$('#RaspRadioIcon, #BlackRadioIcon, #OrangeRadioIcon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
		$('#WhiteRadioIcon').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on');
		var selectedcolorID = "White";
		chngColor(selectedcolorID);
	});
	$('#Black').live('click',function(){
		$('#RaspRadioIcon, #WhiteRadioIcon, #OrangeRadioIcon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
		$('#BlackRadioIcon').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on');
		var selectedcolorID = "Black";
		chngColor(selectedcolorID);
	});
	$('#Orange').live('click',function(){
		$('#RaspRadioIcon, #WhiteRadioIcon, #BlackRadioIcon').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');
		$('#OrangeRadioIcon').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on');
		var selectedcolorID = "Orange";
		chngColor(selectedcolorID);
	});
	$('#SelectColorCancel').live('click',function(){
		$('#productColors').dialog('close');
	});
	$('#selectColorSubmit').live('click',function(){
		$('#productColors').dialog('close');
	});
	function chngColor(colorVal) {
		$('#customColorSelect').removeClass('colorRRedIcon colorBlackIcon colorBlueIcon colorGreenIcon');
		switch (colorVal) {  
			 case 'White':  
				$('#customColorSelect').addClass('colorBlueIcon');
				$("#selectedColorValue").html("White"); 
				$('#chosenColor').val('White');
				break;  
			 case 'Raspberry':  
				$('#customColorSelect').addClass('colorRRedIcon');
				$("#selectedColorValue").html("Raspberry"); 
				$('#chosenColor').val('Raspberry');
				break;
			 case 'Black':  
				$('#customColorSelect').addClass('colorBlackIcon');
				$("#selectedColorValue").html("Black"); 
				$('#chosenColor').val('Black');
				break;
			 case 'Orange':  
				$('#customColorSelect').addClass('colorGreenIcon');
				$("#selectedColorValue").html("Orange"); 
				$('#chosenColor').val('Orange');
				break;
			 default:  
				alert('Nothing selected.');  
				break;  
		 }  
	}
	/* End: Custom jqm for color popup */
	/* Start: Custom jqm for toggle device Size */
	capacityValue1 = '16GB';
	capacityValue2 = '32GB';
	capacityValue3 = '64GB';
	$("#productFirstSize").click(function() {
		$("#productFirstSize").addClass('selectedSize gradB3toB4');	
		$("#productSecondSize").removeClass('selectedSize gradB3toB4');
		$("#productThirdSize").removeClass('selectedSize gradB3toB4');
		$('#chosenCapacity').val(capacityValue1);
	});
	$("#productSecondSize").click(function() {
		$("#productSecondSize").addClass('selectedSize gradB3toB4');
		$("#productThirdSize").removeClass('selectedSize gradB3toB4');
		$("#productFirstSize").removeClass('selectedSize gradB3toB4');
		$('#chosenCapacity').val(capacityValue2);
	});
	$("#productThirdSize").click(function() {
		$("#productThirdSize").addClass('selectedSize gradB3toB4');	
		$("#productFirstSize").removeClass('selectedSize gradB3toB4');
		$("#productSecondSize").removeClass('selectedSize gradB3toB4');
		$('#chosenCapacity').val(capacityValue3);
	});
	//****END DANNY CODE FROM device detail page****//

	//promoTabs control
	$('#promoTab1').click(function() {
		$('#promoTab1Content').show();
		$('#promoTab2Content, #promoTab3Content').hide();
		$('#promoTab1').removeClass('promoTabOff gradWtoG1').addClass('promoTabOn');
		$('#promoTab2, #promoTab3').removeClass('promoTabOn').addClass('promoTabOff gradWtoG1');
		$('#promoTabText1').addClass('promoTabTextOn');
		$('#promoTabText2, #promoTabText3').removeClass('promoTabTextOn');
	});
	$('#promoTab2').click(function() {
		$('#promoTab2Content').show();
		$('#promoTab1Content, #promoTab3Content').hide();
		$('#promoTab2').removeClass('promoTabOff gradWtoG1').addClass('promoTabOn');
		$('#promoTab1, #promoTab3').removeClass('promoTabOn').addClass('promoTabOff gradWtoG1');
		$('#promoTabText2').addClass('promoTabTextOn');
		$('#promoTabText1, #promoTabText3').removeClass('promoTabTextOn');
	});
	$('#promoTab3').click(function() {
		$('#promoTab3Content').show();
		$('#promoTab1Content, #promoTab2Content').hide();
		$('#promoTab3').removeClass('promoTabOff gradWtoG1').addClass('promoTabOn');
		$('#promoTab1, #promoTab2').removeClass('promoTabOn').addClass('promoTabOff gradWtoG1');
		$('#promoTabText3').addClass('promoTabTextOn');
		$('#promoTabText1, #promoTabText2').removeClass('promoTabTextOn');
	});
	
	//subMenu tabs control
	$('#tabShop').click(function() {
		$('#subContentShop').show();
		$('#subContentMyAtt, #subContentSupport').hide();
		$('#subMenuTab1').removeClass('tabOff').addClass('tabOn');
		$('#subMenuTab2, #subMenuTab3').removeClass('tabOn').addClass('tabOff');
	});
	
/*	$('#menuClose').click(function() {
		$('#menuIconDiv').slideUp();
	}); */
	
});
//END document.ready

//Set content on OrientationChange
$(function(){
	$('body').bind('orientationchange',function(event){
		changeOrientation(event.orientation);
	})
	function changeOrientation(ori){
		$("#orientation").removeClass('portrait landscape');
		$("#orientation").addClass(ori);
		getWindowWidth ();
		getWindowHeight ();
	}
	$('body').trigger('orientationchange');
})
//***END DANNY CODE FROM device details****//

/*Gets Query String from URL */
$.extend( {
	getUrlVars: function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	,
	  getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
}
);

//Image gallery swipe code
getWindowWidth();			
galleryMargin = ((windowWidth - 180)/2);
$('.productGalleryImage').css({'margin-left': galleryMargin-2, 'margin-right': galleryMargin});
$('.productGalleryImage.productGalleryFullImage').css({'margin-left': '0', 'margin-right': '0'});
var currentImg=0;
var maxImages=5;
var speed=500;
var imgs;
var swipeOptions=
{
	triggerOnTouchEnd : true,	
	swipeStatus : swipeStatus,
	allowPageScroll:"vertical",
	threshold:35
}
$(function()
{				
	imgs = $("#productGalleryImages");
	imgs.swipe( swipeOptions );
});
function swipeStatus(event, phase, direction, distance)
{
	if( phase=='move' && (direction=='left' || direction=='right') )
	{
	var duration=0;
	if (direction == 'left')
	{
	scrollImages((windowWidth * currentImg) + distance, duration);
	}
	else if (direction == 'right')
	{
	scrollImages((windowWidth * currentImg) - distance, duration);
	}
	}
	else if ( phase == 'cancel')
	{
	scrollImages((windowWidth * currentImg), speed);
	}
	else if ( phase =='end' )
	{
	if (direction == 'right')
	previousImage()
	else if (direction == 'left')			
	nextImage()
	}
}
function previousImage()
{
	currentImg = Math.max(currentImg-1, 0);
	scrollImages((windowWidth * currentImg), speed);
	setProgressIcon(currentImg);
}
function nextImage()
{
	currentImg = Math.min(currentImg+1, maxImages-1);
	scrollImages((windowWidth * currentImg), speed);
	setProgressIcon(currentImg);
}
function setProgressIcon(id)
{
	var icnID = id; 
	switch (icnID) { 
	case 0: 
	$('#galleryProgress01').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on'); 
	$('#galleryProgress02, #galleryProgress03, #galleryProgress04, #galleryProgress05').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off'); 
	break; 
	case 1: 
	$('#galleryProgress02').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on'); 
	$('#galleryProgress01, #galleryProgress03, #galleryProgress04, #galleryProgress05').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off'); 
	break; 
	case 2: 
	$('#galleryProgress03').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on'); 
	$('#galleryProgress01, #galleryProgress02, #galleryProgress04, #galleryProgress05').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off'); 
	break; 
	case 3: 
	$('#galleryProgress04').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on'); 
	$('#galleryProgress01, #galleryProgress02, #galleryProgress03, #galleryProgress05').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off');  
	break; 
	case 4: 
	$('#galleryProgress05').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on'); 
	$('#galleryProgress01, #galleryProgress02, #galleryProgress03, #galleryProgress04').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off'); 
	break; 
	default: 
	$('#galleryProgress01').removeClass('ui-icon-radio-off').addClass('ui-icon-radio-on'); 
	$('#galleryProgress02, #galleryProgress03, #galleryProgress04, #galleryProgress05').removeClass('ui-icon-radio-on').addClass('ui-icon-radio-off'); 
	} 
}
function scrollImages(distance, duration)
{
	imgs.css('-webkit-transition-duration', (duration/1000).toFixed(1) + 's');
	var value = (distance<0 ? '' : '-') + Math.abs(distance).toString();
	imgs.css('-webkit-transform', 'translate3d('+value +'px,0px,0px)');
}

function stickyFooter(){
		$('[data-role=content]').each(function(){
		var containerHeight = parseInt($(this).css('height'));
		var windowHeight = parseInt(window.innerHeight);
		if(containerHeight+150 < windowHeight){
			var newHeight = windowHeight-150;
			$(this).css('min-height', newHeight+'px');
		}
	});
}

//Start- Menu toggle Code
$('.toggleMenu').toggle(function () {
		$('.menuToggled').slideDown('slow');
		$('#menuIcon').addClass('gradO6toO5');
		getWindowHeight();
		$('body').append('<div class="mask"></div>');
		$('.mask').css('height',noFooterHeight);
	},
		function () {
		$('.menuToggled').slideUp('fast');
		$('#menuIcon').removeClass('gradO6toO5');
		$('.mask').remove();
	}
);

$('#menuClose').click(function() {
	$('#menuIconDiv').slideUp('fast');
	$('#menuIcon').removeClass('gradO6toO5');
	$('.mask').remove();
	scrollWin('#mainHeader');
});

//toggle content
$('.toggleDown').toggle(function () {
		$(this).next('.toggleContainer').slideDown();
		$('#plus-minus', this).removeClass('mT3').addClass('mT1').html('&ndash;');
	},
		function () {
		$(this).next('.toggleContainer').slideUp();
		$('#plus-minus', this).removeClass('mT1').addClass('mT3').html('+');
	}
);
//End- Menu toggle Code
$(".clearImgBg").click(function(){$(this).prev("input").val("");});