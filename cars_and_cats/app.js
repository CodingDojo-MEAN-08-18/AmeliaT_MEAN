var http = require('http');
var fs = require('fs');
 // define server and content
var server = http.createServer(function (request, response){
    console.log('client request URL: ', request.url);
    //set the root path 
    if(request.url === '/') {
        fs.readFile('./views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    // serve cars.html
    else if (request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    // serve cats.html
    else if (request.url === "/cats") {
        fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    // serve new_car.html
    else if (request.url === "/cars/new") {
         fs.readFile('./views/new_car.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents); 
             response.end();
         });
    }
    // serve style.css
    else if (request.url === '/stylesheets/style.css') {
        fs.readFile('./stylesheets/style.css', 'utf8', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        });
    }
    // serve images
        
    else if (request.url === '/Images/car1.jpg') {
        fs.readFile('./Images/car1.jpg', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/Images/car2.jpg') {
        fs.readFile('./Images/car2.jpg', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/Images/car3.jpg') {
        fs.readFile('./Images/car3.jpg', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/Images/cat1.jpg') {
        fs.readFile('./Images/cat1.jpg', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/Images/cat2.jpg') {
        fs.readFile('./Images/cat2.jpg', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/Images/cat3.jpg') {
        fs.readFile('./Images/cat3.jpg', function(errors, contents) {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });
    }

    // Otherwise, file not found
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }
});
server.listen(7077);
console.log("Running in localhost at port 7077"); 