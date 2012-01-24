if ( !($ = window.jQuery) || '1.6.1' > $.fn.jquery  ) {
	loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',getui);
} else {
	getui();
}

function loadScript(script,onLoad) {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.onload = onLoad;
	s.src = script;
	document.body.appendChild(s);
}

function getui() {
	if ($.ui) {
		getCss();
	}
	else {
		loadScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js',getCss);
	}
}

function getCss() {
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/base/jquery-ui.css';
	cssNode.media = 'screen';
//	cssNode.onload = runthis;
	headID.appendChild(cssNode);
	runthis()
}

function runthis() {
	var n = "\
	<div>\
	<form>\
	<select id='env' name='env'>\
		<option value='https://gmasdev.cadm.harvard.edu'>DEV</option>\
		<option value='https://gmastest.cadm.harvard.edu'>TEST</option>\
		<option value='https://gmastraining.harvard.edu'>TRAINING</option>\
		<option value='https://gmas.harvard.edu'>PROD</option>\
	</select>\
	<input type='text' name='segmentId' id='segmentId' />\
	</form>\
	</div>\
	";
	$(n).dialog({
		buttons: {
			"OK": function() {
				// NEEDS INPUT VALIDATION!!
				var urlstring = "/gmas/dispatch?formName=SegmentHomeForm&ProjectListSegmentHomeEvent=&segmentId=";
				$(this).dialog("close");
				window.location = $("#env").val() + urlstring + $.trim($("#segmentId").val());			
			}
		}
	});
	$("#env").val('https://' + window.location.host);
}