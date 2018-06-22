var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	host = '127.0.0.1',
	port = '9000';

	var mimes = {
		'.htm' : 'text/html',
		'.css' : 'text/css',
		'.js' : 'text/javascript',
		'.gif' : 'image/gif',
		'.jpg' : 'image/jpeg',
		'.png' : 'image/png'
	}

	var server = http.createServer(function(req, res) {
		var filepath = (req.url === '/') ?
			('./index.htm') : ('.' + req.url);
		var contentType = mimes[path.extname(filepath)];
		fs.exists(filepath, function(file_exists){
			if(file_exists){
				fs.readFile(filepath, function(error, content){
					if(error){
						res.writeHead(500);
						res.end();
					} else {
						res.writeHead(200,
							{'Content-Type' : contentType});
						res.end(content, 'utf8');
					}
				});
			} else {
				res.writeHead(404);
				res.end('File not Found');
			}
		});
	}).listen(port, host, function() {
		console.log('server running on http://' +
			host + ':' + port);
	})

// var http = require('http'),
// 	fs = require('fs'),
// 	path = require('path'),
// 	host = '127.0.0.1',
// 	port = '9000';
//
// var mimes = {
// 	".htm" : "text/html",
// 	".css" : "text/css",
// 	".js" : "text/javascript",
// 	".gif" : "image/gif",
// 	".jpg" : "image/jpeg",
// 	".png" : "image/png"
// }
//
// var server = http.createServer(function(req, res){
// 	var filepath = (req.url === '/') ?
// 		('index.htm') : ('.' + req.url);
// 	var contentType = mimes[path.extname(filepath)];
// 	fs.exists(filepath, function(file_exists){
// 		if(file_exists){
// 			fs.readFile(filepath, function(error, content){
// 				if(error){
// 					res.writeHead(500);
// 					res.end();
// 				} else {
// 					res.writeHead(200,
// 						{ 'Content-Type' : contentType});
// 					res.end(content, 'utf-8');
// 				}
// 			})
// 		} else {
// 			res.writeHead(404);
// 			res.end("File Not Found");
// 		}
// 	});
// }).listen(port, host, function(){
// 	console.log('Server running on http://' +
// 		host + ':' + port);
// });
