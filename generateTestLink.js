
function $$(selector, start) {
    if (start != null) return start.querySelectorAll(selector);
    return document.querySelectorAll(selector);
}

function $(selector, start) {
    if (start != null) return start.querySelector(selector);
    return document.querySelector(selector);
}

function selectText(element) {
    // from http://stackoverflow.com/questions/11128130/select-text-in-javascript
    var doc = document;
    var text = element; //doc.getElementById(element);    

    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();            
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
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
    //document.
}, false);
d.appendChild(close)
// insert content into the box

var content = create("div")


// this is VERY dependent on page structure - should probably be made to be more bullet proof
var project = $("td.strong+td+td").textContent;
project = project.match(/[0-9]{8}-[0-9]{2}/)[0];
while (project.charAt(0) === '0') project = project.substr(1);

var names = {}
var inputs = $$("input[type='hidden'][name$='Id']");
for (var i=0; i<inputs.length; i++) {
    var name = inputs[i].getAttribute("name");
    var id = inputs[i].getAttribute("value");
    names[name] = id;
}
var url = "https://" + window.location.host + "/gmas/request/SCR0115Request.jsp?requestId=" + names['requestId'] + "&segmentId=" + names['segmentId'];
var str = "Project " + project + ", [Request " + names['requestId'] + "|" + url + "]";

content.innerHTML = str;

d.appendChild(content)
document.body.appendChild(d)
selectText(content);

document.addEventListener("keyup", closeBox, false);

function closeBox(e) {
    if (e.keyCode == 27 || (e.ctrlKey && e.keyCode == 67)) {
        //console.log(e.keyCode)
        $(".tseBox-close").click();
    }
}