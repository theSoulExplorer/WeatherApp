const http = require("http");
const fs = require("fs");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const home = fs.readFileSync("link" , "utf-8");


function changeTemp(data , homefile)
{
  
  let realtimedata = homefile.replace("{%temp%}",((data.main.temp)-273.15).toFixed(2)); 
  realtimedata = realtimedata.replace("{%city%}",(data.name)); 
  realtimedata = realtimedata.replace("{%min%}",((data.main.temp_min)-273.15).toFixed(2)); 
  realtimedata = realtimedata.replace("{%max%}",((data.main.temp_max)-273.15).toFixed(2)); 
  realtimedata = realtimedata.replace("{%temp_type%}",data.weather[0].main); 

  console.log(data.weather[0].main);

  return realtimedata;
  
}

const server = http.createServer((request,response) => {

  if(request.url == "/")
  {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=New Delhi&appid=6d89b59930fdb5ec0d718ed9f4078f92";
    fetch(url)
      .then(response => response.json())
      .then(objdata => {

        const realtimedata = changeTemp(objdata , home);
        response.writeHead(200 , {"Content-type" : "text/html"});
        
        response.end(realtimedata);


      })
      .catch(err => {console.log("error")});


      
      
  }

  else if(request.url.match("\.css$")){
        var cssPath = path.join(__dirname, 'public', request.url);

        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        response.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(response);

    }

    else if(request.url.match("\.js$")){
        var jsPath = path.join(__dirname, 'public', request.url);

        var fileStream = fs.createReadStream(jsPath, "UTF-8");
        response.writeHead(200, {"Content-Type": "text/js"});
        fileStream.pipe(response);

    }
    else if(request.url.match("\.png$")){
        var pngPath = path.join(__dirname, 'public', request.url);

        var fileStream = fs.createReadStream(pngPath);
        response.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(response);

    }
  


});


server.listen(2000 , "127.0.0.1" , ()=>{console.log("server started")});






























































// const url = "https://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&appid=6d89b59930fdb5ec0d718ed9f4078f92";

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {console.log("error")});

