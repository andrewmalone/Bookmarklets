
function $$(selector, start) {
    if (start != null) return start.querySelectorAll(selector);
    return document.querySelectorAll(selector);
}

function $(selector, start) {
	if (start != null) return start.querySelector(selector);
	return document.querySelector(selector);
}

// create some css...
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
	//add code to close the box here
	var box = this.parentNode;
	box.parentNode.removeChild(box);
	document.removeEventListener("keyup", closeBox);
}, false);
d.appendChild(close)
// insert content into the box

var content = create("div")

/*****
ALL BOX FILLING CONTEXT STARTS HERE
******/
var inputs = $$("input[type='hidden'][name$='Id']");
var n = "<div>";
var lines=new Array();
for (var i = 0; i < inputs.length; i++) {
	var name = inputs[i].getAttribute("name");
	var id = inputs[i].getAttribute("value");
	var tmp = "<p><b>" + name +":</b> " + id + "</p>"
	if (lines.indexOf(tmp) == -1 && name.indexOf("_") == -1 && id != "") {
		lines.push(tmp);
		n += tmp;
	}
}

var queryString = window.location.search;
var match = queryString.match(/[a-zA-z]*Id=[0-9]*&/g);
if (match) {
	for (var i = 0; i < match.length; i++)
	{
		var submatch = match[i].match(/([a-zA-Z]*Id)=([0-9]*)*/);
		name = submatch[1];
		id = submatch[2];
		tmp = "<p><b>" + name +":</b> " + id + "</p>";
		if (lines.indexOf(tmp) == -1) {
			lines.push(tmp);
			n += tmp;
		}
	}
}
str = n;
content.innerHTML = str;

d.appendChild(content)
document.body.appendChild(d)

document.addEventListener("keyup", closeBox, false);

function closeBox(e) {
    if (e.keyCode == 27 || (e.ctrlKey && e.keyCode == 67)) {
        //console.log(e.keyCode)
        $(".tseBox-close").click();
    }
}