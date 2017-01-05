function dsy() {
	var curUrl = $("#curUrl");
	var curTitle = $("#curTitle");

	//bind clickEvent
	clickEvent();

	chrome.tabs.getSelected(function(tab) {
		curUrl.attr("value",tab.url);
		curTitle.attr("value",tab.title);
		setQrcode(tab.url);
	});
}

function setQrcode(param){
	var qrcodeArea = $("#codeArea");
	qrcodeArea.qrcode({
		render:"canvas",
		width : 160,
		height : 160,
		text: utf8(param)
	});
}

function clickEvent(){
	$("#IconBtn").on("click",function(){
		var ShowHide = $("#hideArea").hasClass("on");
		if(ShowHide){
			$("#hideArea").removeClass("on");
			$("#IconBtn").html("&#xe601;");
			$("#hideArea").animate({
				"height" : "0"
			},1000);
		}else {
			$("#hideArea").addClass("on");
			$("#IconBtn").html("&#xe602;");
			$("#hideArea").animate({
				"height" : "200"
			},1000);
		}
	});
}

function utf8(str){
	var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

setTimeout(dsy,1000);
