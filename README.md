HtmlInputAutoSuggest
====================
Make HTML Input Auto Suggest.

=====================================
Need to include Jquery before including this js file either of AutoSuggest.js or AutoSuggest.min.js can be included

Requires
========
Include JQuery
Include AutoSuggest.js

Usage
=====
var list=[{"value":"mahalingam"},
	{"value":"mali"}
	,{"value":"mahan"},
	{"value":"mac"},
	{"value":"mango"},
	{"value":"sun"}
	,{"value":"summer"}
	,{"value":"supper"}];
	var limit=10;
	var appendTo="#iptBox";
$(appendTo).AutoSuggest(
		{
			"list":list,
			"limit":limit,
			"appendTo":appendTo
		}
	);

