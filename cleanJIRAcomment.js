var t = document.getElementById("comment").value;
t = t.replace(/=\n/gi,"");
t = t.replace(/=20/g,"");
var n = new Array("=C2=B7","=E2=80=99","=C2=A9","=E2=80=98","=E2=80=93");
for (var i=0; i<n.length; i++)
{
	t = r(t,n[i]);
}
t = t.replace(/\n\n/g,'\n');
document.getElementById("comment").value=t;

function r(str,sub)
{
	var reg = new RegExp(sub,"g");
	var rep = sub.replace(/=/g,"%");
	str = str.replace(reg,decodeURI(rep));
	return str;
}