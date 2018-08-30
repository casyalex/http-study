const http = require('http')

http.createServer((request, response) => {
  console.log('request', request.url)

  // response.writeHead(200, {
  //   'Access-Control-Allow-Origin': '*'
  // })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')