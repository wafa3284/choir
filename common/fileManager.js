//Hash
function Hash() {  
	this.length = 0;  
	this.items = new Array();  
      
	for (var i = 0; i < arguments.length; i += 2) {  
		if (typeof(arguments[i + 1]) != 'undefined') {  
			this.items[arguments[i]] = arguments[i + 1];  
			this.length++;  
		}  
	}  
     
    this.setItemArr = function(arr, isClear) {  
        if(isClear) this.clear;  
        
        for (var i = 0; i < arr.length; i += 2) {  
        	if (typeof(arr[i + 1]) != 'undefined') {  
        		this.items[arr[i]] = arr[i + 1];  
        		this.length++;  
        	}  
        }  
	};  
      
    this.setItemJson = function(jsonObj, isClear) {
        if(isClear) this.clear;  
        
        for (var word in jsonObj) {  
            if(word != 'undefined') this.items[word] = jsonObj[word];                 
        }  
	};
      
	this.getItemJson = function() {  
		var str = "{";  
		for (var word in this.items) {  
			if(word != 'undefined') str += "\""+word+"\":\""+this.items[word]+"\",";
		}
        if(str.length > 1) str = str.substring(0,str.length-1);
        str += "}";  
        return str;  
	};
      
    this.removeItem = function(in_key) {
    	var tmp_previous;  
    	if (typeof(this.items[in_key]) != 'undefined') {  
    		this.length--;  
    		var tmp_previous = this.items[in_key];  
    		delete this.items[in_key];  
    	}
        return tmp_previous;  
    };  
  
    this.getItem = function(in_key) {  
    	return this.items[in_key];  
	};
  
	this.setItem = function(in_key, in_value) {  
		var tmp_previous;  
		if (typeof(in_value) != 'undefined') {  
			if (typeof(this.items[in_key]) == 'undefined') this.length++;  
            else tmp_previous = this.items[in_key];
  
			this.items[in_key] = in_value;  
		}
		return tmp_previous;  
	};
	
    this.hasItem = function(in_key) {  
    	return typeof(this.items[in_key]) != 'undefined';  
    };
    
    this.clear = function() {  
        for (var i in this.items) delete this.items[i];
        this.length = 0;  
    };  
}

//Upload
function sendGfsFileData(mode, key, path_param, id, fileName, ext) {
	var dfd = $.Deferred();
	var url = "";
	
	if(mode === "collect"){
		url = contextPath + "/upload.ajax";
	}else if(mode === "image"){
		url = contextPath + "/upload_image.ajax";
	}
	
	$.ajax({
		url : url,
		type: "POST",
		crossDomain: true,
		enctype: "multipart/form-data",
		contentType: false,
		processData: false,
		data: function() {
			var data = new FormData();
			data.append("mode"			, mode);
			data.append("path_param"	, path_param);
			data.append("upload"		, files.getItem(key));
			return data;
		}(),
		error: function(xhr, textStatus, errorThrown) {
			console.log(textStatus);
			dfd.reject(key, textStatus);
		},
		success: function(response, textStatus) {
			dfd.resolve(key, response, textStatus, mode, id);
		},
		xhr: function() {
			var xhrobj = $.ajaxSettings.xhr();
			if(xhrobj.upload) {
				xhrobj.upload.addEventListener('progress', function(event) {
		            var percent = 0;
		            var position = event.loaded || event.position;
		            var total = event.total;
		            if (event.lengthComputable) percent = Math.ceil(position / total * 100);
		            progressBarLoad(key, percent, mode, id);
		        }, false);
			}
			return xhrobj;
		}
	});
	
	return dfd.promise();
}

//ProgressBar
function progressBarLoad(key, percent) {
	var progressBarWidth = percent * $('div[name="progress_'+key+'"]').width() / 100;
	if( $('div[name="progress_'+key+'"]') ) $('div[name="progress_'+key+'"]').find('div').css({ width: progressBarWidth });
}

//Download
function getFileDown(type, info){
    var $iframe,
        iframe_doc,
        iframe_html;
    
    if (($iframe = $('#download_iframe')).length === 0) {
        $iframe = $("<iframe id='download_iframe'" +
                    " style='display: none' src='about:blank'></iframe>"
                   ).appendTo("body");
    }

    iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document;
    }

    if(type == 'normal'){
    	iframe_html = "<html><head></head><body>"+"<form method='POST' action='https://watvnewsong.org/newsong/down.ajax'>"+"<input type=hidden name='info' value='"+info+"'/>"+"</form></body></html>";	
    }else if(type == 'collect'){
    	iframe_html = "<html><head></head><body>"+"<form method='POST' action='https://watvnewsong.org/collect/down.ajax'>"+"<input type=hidden name='info' value='"+info+"'/>"+"</form></body></html>";
    }
    
    iframe_doc.open();
    iframe_doc.write(iframe_html);
    iframe_doc.close();
    $(iframe_doc).find('form').submit();
}
