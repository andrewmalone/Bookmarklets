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
	// for radio buttons
	// $("input[type='radio'][value='false']").attr('checked',true);
	
	// get the project Id
	var x = $.trim($("td.strong:contains('Project ID')+td+td").html());
	while (x.charAt(0) === '0') x = x.substr(1);


	// start by getting the hidden inputs
	var inputs = $("input[type='hidden'][name$='Id']");
	var n = "<div>";
	var lines=new Array();
	var names = new Array();
	for (var i = 0; i < inputs.length; i++) {
		var name = inputs.eq(i).attr("name");
		var id = inputs.eq(i).val();
		//names[name] = id;
		var tmp = "<p><b>" + name +":</b> " + id + "</p>"
		if ($.inArray(tmp,lines) == -1 && name.indexOf("_") == -1 && id != "") {
			lines.push(tmp);
			names[name] = id;
			n += tmp;
		}
	}
	// now check the page url
	var queryString = window.location.search;
	var match = queryString.match(/[a-zA-z]*Id=[0-9]*&/g);
	if (match) {
		for (var i = 0; i < match.length; i++)
		{
			var submatch = match[i].match(/([a-zA-Z]*Id)=([0-9]*)*/);
			name = submatch[1];
			id = submatch[2];
			tmp = "<p><b>" + name +":</b> " + id + "</p>";
			if ($.inArray(tmp,lines) == -1) {
				lines.push(tmp);
				names[name] = id;
				n += tmp;
			}
		}
	}
	n += "</div>";
	var url = "https://" + window.location.host + "/gmas/request/SCR0115Request.jsp?requestId=" + names['requestId'] + "&segmentId=" + names['segmentId'];
	var str = "Project " + x + ", [Request " + names['requestId'] + "|" + url + "]";
	alert(str);
	//$(n).dialog();
}