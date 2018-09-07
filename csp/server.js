const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer((request, response) => {
  console.log('request come', request.url)
  if (request.url === '/') {
    const html = fs.readFileSync('test.html')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Content-Security-Policy': 'default-src http: https:'
      // 'Content-Security-Policy': 'default-src \'self\'' // 限制只允许读本站的src
      // 'Content-Security-Policy': 'default-src \'self\' https://cdn.bootcss.com/' 
      // 'Content-Security-Policy': 'script-src \'self\'; form-action \'self\'; report-uri /report'  // 控制表单提交要用form-action report-uri可以设置安全汇报
      'Content-Security-Policy-Report-Only': 'script-src \'self\'; form-action \'self\'; report-uri /report'  //只报告 不阻止
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/javascript',
    })
    response.end('console.log("loaded script")')
  }

}).listen(8888)

console.log('server listening on 8888')
