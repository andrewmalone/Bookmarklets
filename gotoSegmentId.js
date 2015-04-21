
function $$(selector, start) {
    if (start != null) return start.querySelectorAll(selector);
    return document.querySelectorAll(selector);
}

function $(selector, start) {
	if (start != null) return start.querySelector(selector);
	return document.querySelector(selector);
}

var h = document.getElementsByTagName("head")[0];
var c = document.createElement("style")
c.innerHTML = "\
.tseBox {\
    border:1px solid #999;\
    position:fixed;\
    top:10%;\
    left:10%;\
    background:#E9E9E9;\
    box-shadow:3px 3px 6px 0px #ccc;\
    padding:.5em;\
    border-radius:.5em;\
    font-family:Arial;\
}\
.tseBox h3 {\
	margin:0 0 .5em 0;\
	border-bottom:1px solid #ccc;\
	padding:0 0 .25em 1.5em;\
}\
.tseBox-close {\
	position:absolute;\
	top:.5em;\
	left:.5em;\
}\
";

h.appendChild(c)

function create(elem, attr, text) {
	var e = document.createElement(elem);
	for (var i in attr) {
		if (attr.hasOwnProperty(i)) {
			e.setAttribute(i, attr[i]);
		}
	}
	if (text != null) {
		e.appendChild(document.createTextNode(text));
	}
	return e;
}

var d = create("div", {class:"tseBox"});
var close = create("button", {class:"tseBox-close"}, "X")
close.addEventListener("click", function(e) {
	var box = this.parentNode;
	box.parentNode.removeChild(box);
}, false);
var header = create("h3",{},"Go to Segment ID");
d.appendChild(header);
d.appendChild(close)

var content = create("div")

var str = "\
<div>\
<form>\
<select id='env' name='env'>\
	<option value='https://gmassand.ca.harvard.edu'>SAND</option>\
	<option value='https://gmasdev.ca.harvard.edu'>DEV</option>\
	<option value='https://gmastest.ca.harvard.edu'>TEST</option>\
	<option value='https://gmasint.ca.harvard.edu'>INT</option>\
	<option value='https://gmastraining.harvard.edu'>TRAINING</option>\
	<option value='https://gmas.harvard.edu'>PROD</option>\
</select>\
<input type='text' name='segmentId' id='segmentId' />\
</form>\
</div>\
";

content.innerHTML = str;

d.appendChild(content)
document.body.appendChild(d);
$("#segmentId").focus();
$("#env").value = 'https://' + window.location.host;
$("#segmentId").addEventListener("keyup", up, false);
$("#segmentId").addEventListener("keydown", down, false)

function up(e) {
	if (e.ctrlKey && e.keyCode == 86) {
		gotoSegment(this.value.trim())
	}
}

function down(e)
{
	if (e.metaKey && e.keyCode == 86)
	{
		this.addEventListener("keyup", function(e) {
			if (e.keyIdentifier == "Meta")
			{
				gotoSegment(this.value.trim());
			}
		}, false);
	}
}

function gotoSegment(segmentId)
{
	var urlstring = "/gmas/project/SCR0104SegmentHome.jsp?segmentId=";	
	window.location = $("#env").value + urlstring + segmentId;
	$(".tseBox-close").click();
}
