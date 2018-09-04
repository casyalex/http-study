const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8')
  const img = fs.readFileSync('test.jpg')
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
      // 'Connection':'close' 默认就是keep-alive
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'imgae/jpg'
      // 'Connection':'close'
    })
    response.end(img)
  }

}).listen(8888)

console.log('server listening on 8888')