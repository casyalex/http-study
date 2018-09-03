const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  console.log('request come', request.url)

  const host = request.headers.host
  console.log('host is ', host)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    if (host === 'a.test.com:8888') {
      response.writeHead(200, {
        'Content-Type': 'text/html',
        // 'Set-Cookie': 'id=123'
        // 'Set-Cookie': ['id=123; max-age=2', 'abc=456; HttpOnly']
        'Set-Cookie': ['id=123; max-age=2', 'abc=456; domain=test.com']
      })
    }
    response.end(html)
  }


}).listen(8888)

console.log('server listening on 8888')