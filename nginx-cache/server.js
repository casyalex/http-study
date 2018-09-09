const http = require('http')
const fs = require('fs')

const wait = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}

http.createServer((request, response) => {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf-8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/data') {
    wait(2).then(() => {
      response.writeHead(200, {
        // 'Cache-Control': 'max-age=2, s-maxage=20, private' //s-maxage 就是专为代理缓存设置的 private 只有浏览器才能缓存数据，代理缓存失效
        'Cache-Control': 's-maxage=200',
        'Vary': 'X-Test-Cache' // 连指定头信息一样时 才使用缓存
      })
      response.end('success')
    })
  }

}).listen(8888)

console.log('server listening on 8888')
