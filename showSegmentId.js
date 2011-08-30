if (typeof jQuery == 'undefined') {
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

// getting the segment ID from any page in GMAS
// may want to think about expanding to get all IDs from the page - maybe get ID for any link that has it?

function runthis() {
	var segmentId = "no segment ID found";
	// first check the query string for ID values...
	var queryString = window.location.search;
	//alert(queryString);
	var match = queryString.match(/segmentId=([0-9]*)&/);
	if (match) {
		segmentId = "URL " + match[1];
	}
	else { // check for an input
		var inp = $('input[name="segmentId"]');
		if (inp.length >0) {
			segmentId = "INPUT " + inp.eq(0).val();
		}
		else { // check for an href
			var link = $('a[href*="segmentId="]').eq(0).attr("href");
			match = link.match(/segmentId=([0-9]*)&/);
			segmentId = "LINK " + match[1];
		}
	}
	$("<div>" + segmentId + "</div>").dialog();	
}