const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/script.js') {
    const Etag = request.headers['if-none-match']
    if (Etag === '777') {
      response.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000000, no-store', // no-cache 会去验证
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('123')
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000000, no-store',
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('console.log("script loaded twice")')
    }
  }
}).listen(8888)

console.log('server listening on 8888')