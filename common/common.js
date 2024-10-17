if (!String.format) {
	String.format = function(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}
$.browser = {};
(function () {
    $.browser.msie = false;
    $.browser.version = 0; 
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        $.browser.msie = true;
        $.browser.version = RegExp.$1;
    }
})();

//popup
function commonNewWindow(url, target, params, width, height, method) {
	var method = method == null ? "post" : method;
	var winId;
	
	switch(target) {
	case "self":
		target = "_self";
		break;
	case "tab":
		break;		
	case "pop":
		target = new Date().getTime();
		if(width && height) {
			var w = width;
			var h = height;
			var x = (screen.availWidth - w) / 2;
			var y = (screen.availHeight - h) / 2;
			winId = window.open('about:blank', target, 'width='+w+', height='+h+', left='+x+', top='+y);
		} else {
			var w = screen.width - 200;
			var h = screen.height - 100;
			var x = (screen.availWidth - w) / 2;
			var y = (screen.availHeight - h) / 2;
			winId = window.open('about:blank', target, 'width='+w+', height='+h+', left='+x+', top='+y);
		}
		break;
	}
	
	var form = document.createElement("form");
	form.method = method;
	form.action = url;
	form.target = target;
	  
	for(var key in params) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		form.appendChild(hiddenField);
	}
	document.body.appendChild(form);
	form.submit();
	
	return winId;
}

//Import Css
function commonImportCss(){
	$("body").removeClass("page-newsong page-full page-info myHome");
	
	$("[src='https://watvnewsong.org/scripts/owl.js']").remove();
	$("[src='https://watvnewsong.org/scripts/owl.carousel.js']").remove();
	$("[src='https://watvnewsong.org/scripts/flipbook/js/dflip.js']").remove();
	$("[src='https://watvnewsong.org/scripts/flipbook/js/libs/pdf.js']").remove();
	
	$("link[rel=stylesheet][href*='https://watvnewsong.org/css/owl.carousel.min.css']").remove();
	$("link[rel=stylesheet][href*='https://watvnewsong.org/css/index.css']").remove();
	$("link[rel=stylesheet][href*='https://watvnewsong.org/css/my.css']").remove();
	$("link[rel=stylesheet][href*='https://watvnewsong.org/css/board.css']").remove();
	$("link[rel=stylesheet][href*='https://watvnewsong.org/css/choir.css']").remove();
	$("link[rel=stylesheet][href*='https://watvnewsong.org/scripts/flipbook/css/dflip.css']").remove();
	$("link[rel=stylesheet][href*='https://watvnewsong.org/scripts/flipbook/css/themify-icons.css']").remove();
	
	//index
	if(window.location.pathname == "https://watvnewsong.org/home.wmc"){
		$("body").addClass("page-full");
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/css/owl.carousel.min.css">');
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/css/index.css?ver=20220610">');
		$("head").append('<script src="https://watvnewsong.org/scripts/owl.carousel.js"></scrpit>');
		$("head").append('<script src="https://watvnewsong.org/scripts/owl.js"></scrpit>');
	}
	//info/song
	else if(window.location.pathname == "https://watvnewsong.org/info/song.wmc"){
		$("body").addClass("page-info");
	}
	//info/album
	else if(window.location.pathname == "https://watvnewsong.org/info/album.wmc"){
		$("body").addClass("page-info");
	}
	//info/album
	else if(window.location.pathname == "https://watvnewsong.org/info/choir.wmc"){
		$("body").addClass("page-info");
	}
	//my
	else if(window.location.pathname == "https://watvnewsong.org/my.wmc"){
		$("body").addClass("myHome page-full");
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/css/owl.carousel.min.css">');
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/css/index.css?ver=20220610">');
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/css/my.css">');
		$("head").append('<script src="https://watvnewsong.org/scripts/owl.carousel.js"></scrpit>');
		$("head").append('<script src="https://watvnewsong.org/scripts/owl.js"></scrpit>');
	}
	//myalbum
	else if(window.location.pathname == "https://watvnewsong.org/my/album.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/my.css">');
	}
	//myalbum-add
	else if(window.location.pathname == "https://watvnewsong.org/my/edit.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/my.css">');
	}
	//notice
	else if(window.location.pathname == "https://watvnewsong.org/notice.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/board.css">');
	}
	else if(window.location.pathname == "https://watvnewsong.org/notice/detail.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/board.css">');
	}
	//choir
	else if(window.location.pathname == "https://watvnewsong.org/choir.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/choir.css">');
	}
	//collect
	else if(window.location.pathname == "https://watvnewsong.org/collect.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/board.css">');
	}
	else if(window.location.pathname == "https://watvnewsong.org/collect/write.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/board.css">');
	}
	else if(window.location.pathname == "https://watvnewsong.org/collect/detail.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/board.css">');
	}
	//newsong
	else if(window.location.pathname == "https://watvnewsong.org/newsong.wmc"){
		$("body").addClass("page-newsong");
	}
	//include/note
	else if(window.location.pathname == "https://watvnewsong.org/include/note.wmc"){
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/scripts/flipbook/css/dflip.css">');
		$("head").append('<link rel="stylesheet" href="https://watvnewsong.org/scripts/flipbook/css/themify-icons.css">');
		$("head").append('<script src="https://watvnewsong.org/scripts/flipbook/js/dflip.js"></scrpit>');
		$("head").append('<script src="https://watvnewsong.org/scripts/flipbook/js/libs/pdf.js"></scrpit>');
	}
	//include/my_modal
	else if(window.location.pathname == "https://watvnewsong.org/include/my_modal.wmc"){
		$("head").append('<link rel="stylesheet" href="/css/my.css">');
	}
}

//Select Music Paper
function commonSelectMusicPaper(no){
	//no:PDF_NO
	
	var param = {};
	$.extend(param, {no:no});
	commonNewWindow("https://watvnewsong.org/include/note.wmc", "pop", param);
}

//Change Language (Song/Site)
function commonChangeLang(type, params, item){
	//type:site_lang/song_lang/order_by, params:params, item:this.value
	var param = {};
	$.extend(param, {type : type});
	$.extend(param, {lang : item.value});
	
	$("body").attr("id", item.value); //css setting
	
	$.post(contextPath + "https://watvnewsong.org/language.ajax", param, function(data, status){
		if(type == "site_lang") window.location.href = "/home.wmc";
		else urlCall(g_url+"?"+params, "SKIP");
	})
}

//Change Order By
function commonChangeOrderBy(type, params, item){
	urlCall(g_url+"?"+params+"&order_by="+item.value, "Y");
}

//Change Album Style
function commonChangeAlbumStyle(item){
	$(item).toggleClass("on");
	$(".album").toggleClass("album-grid2");
}

//Change Body Class 
function commonChangeBodyClass(bodyClass){
	$("body").toggleClass(bodyClass);
//	if(bodyClass === "show_fullPlayer"){
//		$("body").removeClass("show_playList show_playList_edit");
//		$(".playList_edit").removeClass("bn-list-complete");
//	}
	
	if(bodyClass === "show_playList"){
		// 재생목록 클릭시 마이앨범 > 편집 상태 취소
		$("body").removeClass("show_playList_edit_for_my_album");
		$("body").removeClass("show_fullPlayer show_playList_edit");
		$(".playList_edit").removeClass("bn-list-complete");
		$(".drag.drag-handle").hide();
	}
	
	$(".select_all").removeClass("select_off");
	$("input[name='list']").prop("checked", false);
	$("input[name='playList']").prop("checked", false);
}
 

//List Check
function commonCheckedList(inputName, bodyClass, allYn, item){
	//type:input name, bodyClass:클래스네임, allYn:전체선택 유무, item:this
	const bodyClassName = document.querySelector('body').classList;
	var element = String.format("input[name='{0}']", inputName);
	
	//전체 선택
	if(allYn == true){
		if($(item).hasClass("select_off") == true){
			$("body").removeClass(bodyClass);
			$(item).removeClass("select_off");
			$(element).prop("checked", false);
			$(".layer_count").text("0").text($(element+":checked").length);
		}else{
			if(bodyClassName != "show_playList_edit_for_my_album"){		
				$("body").addClass(bodyClass);
			}
			$(item).addClass("select_off");
			$(element).prop("checked", true);
			$(".layer_count").text("0").text($(element+":checked").length);
		}
	}
	//부분 선택
	else if(allYn == false){
		if($(element+":checked").length == 0){
			$("body").removeClass(bodyClass);
			$(item).parents("div.list_box").find(".select_all").removeClass("select_off");
			$(".layer_count").text("0");
		}else{
			// 편집 상태일 경우 List Control box 안보이게 설정. 
			if(bodyClassName != "show_playList_edit_for_my_album"){		
				$("body").addClass(bodyClass);
			}
			$(item).parents("div.list_box").find(".select_all").addClass("select_off");
			$(".layer_count").text("0").text($(element+":checked").length);
		}
	}
}


//Input Search Empty 
function commonSearchCancel(className){
	$(".search_text."+className).val("");
}

//Save My Like
function commonSaveMyLike(type, no, lang, item){
	//type:newsong/album, no:nesong_source_no/newsong_album_no, item:this
	var param = {};
	
	$.extend(param, {type			: type});
	$.extend(param, {no				: no});
	$.extend(param, {language_gb_sn	: lang});
	$.extend(param, {del_yn			: $(item).hasClass("on") == false ? 0 : 1}); //true : LikeCancel, false : LikeSave
	
	$.post(contextPath + "https://watvnewsong.org/my/like/save.ajax", param, function(data, status){
		if($(item).hasClass("on") == false) $(item).addClass("on");
		else $(item).removeClass("on");
	});
}

//Save My Album Image
function commonSaveMyAlbumImage(image_path, image_nm){
	var param = {};
	$.extend(param, {image_path	: image_path});
	$.extend(param, {image_nm	: image_nm});
	$.post(contextPath + "https://watvnewsong.org/my/imageSelect/save.ajax", param, function(data, status){
		if(status != "success"){
			alert("commonSaveMyAlbumImage Error!");
			location.reload(true);
		}else{
			$("#loader").hide();
			myAlbumEdit.openImgSelectBox(0);
		}
	});
}

function commonLogout(){
	sessionStorage.clear();
	location.href = "/logout.wmc";
}

//File Attach 
function commonAttachFile(mode, id, item){
	//mode:menu name, id:en_file(1,2,3)_no, item:this
	
	$("#loader").show();
	
	var file = item.files[0];
	file.name = file.name.replace(/ /g, "_");
	var fileName = file.name;
	var fileSize = file.size;
	var ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase().toLowerCase();
	var key = file.name.replace(/\./g, "_").replace(/ /g, "_");
	
	files.clear();
	files.setItem(key, file);
	if(mode === "collect"){	
		path_param = "https://watvnewsong.org/WATV_MEDIA/NEWSONG/DOWNLOAD";
	}
	else if(mode === "image"){
		path_param = "/WATV_MEDIA/NEWSONG/IMAGES/USER";
	}
	
	sendGfsFileData(mode, key, path_param, id, fileName, ext).then(commonAttachFileOk, commonAttachFileFail);
	item.value = null;
}

//File Save Ok
function commonAttachFileOk(key, response, textStatus, mode, id) {
	if(response.OUT_FILE_NO != "" && response.OUT_FILE_NO == 'ext'){
		alert("Extension error!");
	}else{
		var num = "";
		
		if(mode === 'collect'){
			$("#"+id).html("<span>"+response.ORG_FILE_NM+"</span>");
			
			if(id == "EN_FILE1_NO"){
				num = "1";
			}else if(id == "EN_FILE2_NO"){
				num = "2";
			}else if(id == "EN_FILE3_NO"){
				num = "3";
			}
			eval("file_FILE"+num+"_PATH='"+response.PATH+"'");
			eval("file_"+id+"='"+response.OUT_FILE_NO+"'");
			eval("file_ORG_FILE"+num+"_NM='"+response.ORG_FILE_NM+"'");
			eval("file_CHG_FILE"+num+"_NM='"+response.CHG_FILE_NM+"'");
		}
		else if(mode === 'image'){
			commonSaveMyAlbumImage(response.PATH, response.CHG_FILE_NM);
		}
	}
	$("#loader").hide();
	return;
};

//File Save Fail
function commonAttachFileFail(key, textStatus) {
	console.log(files.getItem(key).name + " upload failure");
	$(".btn-confirm, input[type=file]").show();
	$("#loader").hide();
}

//Alert
var alertTime;
function commonSelectAlert(txt){
	commonSelectAlertStop();
	
	if(txt != ""){
		$(".alertWatch").text(txt).addClass("on");
		alertTime = setTimeout(function(){$(".alertWatch").removeClass("on")}, 3000);
	}
}

function commonSelectAlertStop(){
	clearTimeout(alertTime);
}


