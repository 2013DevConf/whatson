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