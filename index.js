var	fs = require('fs'),
	path = require('path'),
	through = require('through2'),
	gutil = require('gulp-util')

const PLUGIN_NAME = 'gulp-pagebuilder';

function pageBuilder(root) {
	
	//console.log(__filename);
	
	//if (!buf) {
		//throw new PluginError(PLUGIN_NAME, 'No buf!');
	//}
	
	//buf = new Buffer(buf);
	
	root = __dirname + '/../../' + (root || '');
	root = path.normalize(root);
	
	var pb = {
		
	};
	
	pb.regexp = {
		base : new RegExp(/\[snp+\s+tpl="([^"=]+)"+([^\]]+)+\]/ig),
		by_param : new RegExp(/([^"=\s]+="[^"]+")/ig),
		by_value : new RegExp(/([^"=\s]+)([^"=]+)/ig),
	};
	
	pb.getFileName = function(file) {
		return root + '/' + file;
	};
		
	pb.getFromCode = function(_code) {
		var code = {
			html : '',
			less : [],
			js : [],
		};
		code.html = _code.replace(pb.regexp.base, pb.basereplacer);
		return code;
	};
		
	pb.getSnippetCode = function(file, prm_str) {
		var code = {
			html : '',
			less : [],
			js : [],
		};
		prm_str = prm_str || '';
		if(fs.existsSync(pb.getFileName(file))) {
			var file_handle = fs.openSync(pb.getFileName(file), 'r', 0644);
			code.html = fs.readSync(file_handle, 10485760, null, 'utf8')[0];
			fs.close(file_handle);
			code.html = code.html.replace(pb.regexp.base, pb.basereplacer);
		}
		
		return code;
	};
		
	pb.basereplacer = function(str, p1, p2, offset, s) {
		var code = pb.getSnippetCode((p1));
		var prm_str = p2.match(pb.regexp.by_param);
		for(var i in prm_str) {
			var s = prm_str[i];
			var prm = s.match(pb.regexp.by_value);
			code.html = code.html.replace(new RegExp("{" + prm[0] + "}", "ig"), prm[1]);
		}
		return code.html;
	};
	
	var stream = through.obj(function(file, enc, cb) {
		if (file.isStream()) {
			//this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return cb();
		}
		
		if (file.isBuffer()) {
			//file.contents = Buffer.concat([prefixText, file.contents]);
			
			var code = file.contents.toString();
			
			var html = pb.getFromCode(code);
			
			file.contents = new Buffer(html.html, 'utf8');
		}
		
		this.push(file);
		
		cb();
	});
	
	return stream;
}

module.exports = pageBuilder;