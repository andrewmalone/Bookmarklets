for(var t=document.getElementById("comment").value,t=t.replace(/=\n/gi,""),t=t.replace(/=20/g,""),n="=C2=B7,=E2=80=99,=C2=A9,=E2=80=98,=E2=80=93,=E2=80=9C,=E2=80=9D".split(","),i=0;i<n.length;i++)t=r(t,n[i]);t=t.replace(/\n\n/g,"\n");document.getElementById("comment").value=t;function r(a,b){var c=RegExp(b,"g"),d=b.replace(/=/g,"%");return a=a.replace(c,decodeURI(d))};