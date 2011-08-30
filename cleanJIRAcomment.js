if (typeof jQuery == 'undefined') {
	loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',runthis);
} else {
	runthis();
}

function loadScript(script,onLoad) {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.onload = onLoad;
	s.src = script;
	document.body.appendChild(s);
}

function runthis() {
	var t = $("#comment").text();
	t = t.replace(/=\n/gi,"");
	t = t.replace(/=20/g,"");
	var n = new Array("=C2=B7","=E2=80=99","=C2=A9","=E2=80=98","=E2=80=93");
	for (var i=0; i<n.length; i++)
	{
		t = r(t,n[i]);
	}
	t = t.replace(/\n\n/g,'\n');
	$("#comment").text(t);
}

function r(str,sub)
{
	var reg = new RegExp(sub,"g");
	var rep = sub.replace(/=/g,"%");
	str = str.replace(reg,decodeURI(rep));
	return str;
}