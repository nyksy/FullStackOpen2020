(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(13),l=n.n(a),r=n(0),o=n.n(r),u=n(3),c=function(e){var t=e.name,n=e.toggleDeletion;return o.a.createElement("p",null,t.name," ",t.number," ",o.a.createElement("button",{onClick:n},"delete"))},i=function(e){var t=e.persons,n=e.filter,a=e.toggleDeletionOf,l=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return o.a.createElement("div",null,l.map((function(e){return o.a.createElement(c,{key:e.name,name:e,toggleDeletion:function(){return a(e.name)}})})))},m=function(e){var t=e.filter,n=e.onChange;return o.a.createElement("div",null,"Filter shown with: ",o.a.createElement("input",{value:t,onChange:n}))},s=n(2),f=n.n(s),d="/api/persons",g=function(e){return f.a.post(d,e).then((function(e){return e.data}))},h=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var t=e.message;return null===t?null:o.a.createElement("div",{className:"error"},t)},p=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],l=Object(r.useState)(""),c=Object(u.a)(l,2),s=c[0],d=c[1],p=Object(r.useState)(""),b=Object(u.a)(p,2),E=b[0],O=b[1],w=Object(r.useState)(""),j=Object(u.a)(w,2),C=j[0],k=j[1],D=Object(r.useState)(null),S=Object(u.a)(D,2),y=S[0],J=S[1];Object(r.useEffect)((function(){console.log("effect"),f.a.get("/api/persons").then((function(e){console.log("promise fulfilled"),a(e.data)}))}),[]),console.log("render",n.length,"persons");return o.a.createElement("div",null,o.a.createElement("h1",null,"Phonebook"),o.a.createElement(v,{message:y}),o.a.createElement(m,{onChange:function(e){console.log(e.target.value),k(e.target.value)}}),o.a.createElement("h2",null,"Add a new"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.table(n);for(var t={id:s,name:s,number:E},l=!1,r=0;r<n.length;r++)n[r].name===s&&(l=!0,window.alert("".concat(s," is already in the phonebook")));!1===l&&(g(t).then((function(e){a(n.concat(e))})),J("".concat(s," added to the server.")),setTimeout((function(){J(null)}),5e3)),d(""),O(""),l=!1}},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:s,onChange:function(e){console.log(e.target.value),d(e.target.value)}})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:E,onChange:function(e){console.log(e.target.value),O(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))),o.a.createElement("h2",null,"Numbers"),o.a.createElement(i,{persons:n,filter:C,toggleDeletionOf:function(e){var t=n.find((function(t){return t.name===e}));window.confirm("Delete ".concat(t.name,"?"))&&h(e).then(a(n.filter((function(t){return t.name!==e})))).catch((function(l){alert("the name '".concat(t.name,"' was already deleted from server")),a(n.filter((function(t){return t.name!==e})))}))}}))};n(36);l.a.render(o.a.createElement(p,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.2c6e3442.chunk.js.map