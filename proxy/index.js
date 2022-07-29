var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

const  url= 'https://robotapitest-in.borzodelivery.com/api/business/1.1/calculate-order';

http.createServer(function(req, res) {
    console.log("hii");
    proxy.web(req, res, 
        { 
            target: url,
            
            changeOrigin: true,
            autoRewrite: true,
            hostRewrite: true,
        }
    );
}).listen(3001);