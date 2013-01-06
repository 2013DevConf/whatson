// Developer Notes JavaScript Document
/* Start: Color Coding */
	function SetPresentClass() {
		var currentClass = $('#colorBlock').attr('class');
		var nextClass = colorArr[($.inArray(currentClass, colorArr) + 1) % colorArr.length];
		var prevClass = colorArr[($.inArray(currentClass, colorArr) - 1 + colorArr.length) % colorArr.length];
		var lastClass= colorArr[colorArr.length-1];
		$("#colorBlock").removeClass(currentClass).addClass(nextClass);
		$("#colorClass").text("Class='"+ nextClass + "'");
		var currentClass = nextClass;
		if (currentClass == lastClass) {clearInterval(colorTimer);}
	};
/* Start: Background Color Coding */

/* Start: Font Coding */
	function SetFontClass() {
		var currentClass = $('#FontBlock').attr('class');
		var nextClass = FontArr[($.inArray(currentClass, FontArr) + 1) % FontArr.length];
		var prevClass = FontArr[($.inArray(currentClass, FontArr) - 1 + FontArr.length) % FontArr.length];
		var lastClass= FontArr[FontArr.length-1];
		$("#FontBlock").removeClass(currentClass).addClass(nextClass);
		$("#FontClass").text("Class='"+ nextClass + "'");
		var currentClass = nextClass;
		if (currentClass == lastClass) {clearInterval(FontTimer);}
	};
/* Start: Background Font Coding */

/* Start: Gradient Coding */
	function SetGradientClass() {
		var currentClass = $('#GradientBlock').attr('class');
		var nextClass = GradientArr[($.inArray(currentClass, GradientArr) + 1) % GradientArr.length];
		var prevClass = GradientArr[($.inArray(currentClass, GradientArr) - 1 + GradientArr.length) % GradientArr.length];
		var lastClass= GradientArr[GradientArr.length-1];
		$("#GradientBlock").removeClass(currentClass).addClass(nextClass);
		$("#GradientClass").text("Class='"+ nextClass + "'");
		var currentClass = nextClass;
		if (currentClass == lastClass) {clearInterval(GradientTimer);}
	};
/* Start: Background Gradient Coding */

/* Start: General Coding */
	function SetGeneralClass() {
		var currentClass = $('#GeneralBlock').attr('class');
		var nextClass = GeneralArr[($.inArray(currentClass, GeneralArr) + 1) % GeneralArr.length];
		var prevClass = GeneralArr[($.inArray(currentClass, GeneralArr) - 1 + GeneralArr.length) % GeneralArr.length];
		var lastClass= GeneralArr[GeneralArr.length-1];
		$("#GeneralBlock").removeClass(currentClass).addClass(nextClass);
		$("#GeneralClass").text("Class='"+ nextClass + "'");
		var currentClass = nextClass;
		if (currentClass == lastClass) {clearInterval(GeneralTimer);}
	};
/* Start: Background General Coding */