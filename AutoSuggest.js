(function ($, document, window) {
	var list=[];
	var editDistance=[];
	var limit=3;
	var publicMethod;
	var appendTo="";
     $.fn.AutoSuggest=function(options,callback){
		options = options || {};
		list=options["list"];
		limit=options["limit"];
		appendTo=options["appendTo"];
		var pos,keyword,ListIdx;
		this.keyup(function(e){
			pos=doGetCaretPosition(this);
			keyword=getCurrentWord(pos);
			ListIdx=searchWord(keyword);
			SortOrderByEditDistance();
			$(appendTo).nextAll(".suggestionTextUl").remove();
			if(keyword){
				$(appendTo).after("<ul class='suggestionTextUl'></ul>");
				for(var i=0;i<limit-1;i++){
					if(list[i]){
						$(".suggestionTextUl").append("<li><span class='suggestionText'>"+list[i].value+" "+list[i].editDistance+"</span></li>");
					}
				}
			}
		});
	}

	function SortOrderByEditDistance(){
		list.sort(function(a,b){return a.editDistance-b.editDistance});
	}

	function searchWord (keyword) {
		var minDist=0;
		var minDistIdx=0;
		for(var i=0;i<list.length;i++){
			list[i].editDistance=getEditDistance(keyword,list[i].value);
		}
		return(minDistIdx);
	}
	function getCurrentWord(pos){
		var txt=$("#iptBox").val();
		var strtPos=txt.substring(0,pos).lastIndexOf(" ");
		return(txt.substr(strtPos+1,txt.length).split(/\s+/)[0]);
	}
	function doGetCaretPosition (ctrl) {
		var CaretPos = 0;	// IE Support
		if (document.selection) {
		ctrl.focus ();
			var Sel = document.selection.createRange ();
			Sel.moveStart ('character', -ctrl.value.length);
			CaretPos = Sel.text.length;
		}
		// Firefox support
		else if (ctrl.selectionStart || ctrl.selectionStart == '0')
			CaretPos = ctrl.selectionStart;
		return (CaretPos);
	}
	function getEditDistance(a,b){
		if(a.length == 0) return b.length; 
	  if(b.length == 0) return a.length; 
	 
	  var matrix = [];
	 
	  // increment along the first column of each row
	  var i;
	  for(i = 0; i <= b.length; i++){
	    matrix[i] = [i];
	  }
	 
	  // increment each column in the first row
	  var j;
	  for(j = 0; j <= a.length; j++){
	    matrix[0][j] = j;
	  }
	 
	  // Fill in the rest of the matrix
	  for(i = 1; i <= b.length; i++){
	    for(j = 1; j <= a.length; j++){
	      if(b.charAt(i-1) == a.charAt(j-1)){
	        matrix[i][j] = matrix[i-1][j-1];
	      } else {
	        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
	                                Math.min(matrix[i][j-1] + 1, // insertion
	                                         matrix[i-1][j] + 1)); // deletion
	      }
	    }
	  }
	 
	  return matrix[b.length][a.length];
	}
}(jQuery, document, window));