const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer((request, response) => {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html')
  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-Content-Type-Options': 'nosniff' //关闭头类型预测 是以前防止IE 把文本语言被猜测成脚本语言 的防御手段
    'Content-Encoding': 'gzip'
  })
  response.end(zlib.gzipSync(html))

}).listen(8888)

console.log('server listening on 8888')
