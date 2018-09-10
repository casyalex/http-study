# http-study
http协议

git bash http客户端 curl

### 跨域

跨域实际上是浏览器的保护行为，当浏览器接受到没有'Access-Control-Allow-Origin'请求头配置的返回时，会自动忽略掉返回。服务端仍然会正常返回信息。

#### 服务端上允许跨域

服务器返回的请求头加上：

'Access-Control-Allow-Origin': '*'

*代表任何请求都允许访问

'Access-Control-Allow-Origin': 'http://baidu.com'

这个头只能设一个值，要允许多个的话，需要根据request.host判断是否在允许的网址范围内，再返回对应判断。

#### JSONP式跨域

原理：浏览器认为在标签上进行跨域没有问题，因此可以用link、image、script标签的src或ref属性进行跨域

<script src='http://127.0.0.1:8887'></script>

#### CORS跨域

##### 跨域允许的方法（不需要CORS预请求）

GET、HEAD、POST

##### 跨域允许的Content-Type（不需要CORS预请求）

text/plain multipart/form-data application/x-www-form-urlencoded

##### 其他限制

1. 请求头限制

详细请求头参考：fetch.spec.whatwg.org/#cors-safelisted-request-header

2. XMLHttpRequestUpload 对象均没有注册任何事件监听器

3. 请求中没有使用ReadableStream对象

### 缓存Cache-Control

#### 可缓存性

public 任何请求都可以对返回内容进行缓存（包括代理服务器）

private 只有发起请求的服务器才可以进行缓存

no-cache 任何节点都不能缓存。【会去服务器验证能不能使用缓存】

#### 到期

max-age = <seconds> 

s-maxage = <seconds> 只有代理服务器才会生效（专为代理生效，覆盖max-age）

max-stale = <seconds> max-age过期以后，还可以使用过期缓存的时间限制（发起请求带的头） 【浏览器不会主动设置这个头，一般用不到】

#### 重新验证

must-revalidate 如果缓存过期，必须到原服务器重新验证

proxy-revalidate 缓存服务器专用的重新验证

#### 其他

no-store 彻底不能存储缓存 【不会去服务器验证能否使用缓存】

no-transform 不允许改动返回内容（主要针对压缩）

### 缓存验证 last-modified/Etag

#### 验证头

1. Last-Modified
2. Etag

#### Last-Modified

根据上次修改的时间验证

配合If-Modified-Since或者If-Unmodified-Since使用

#### Etag

根据数据签名验证

配合If-Match或者If-Non-Mactch使用

对比资源的签名判断是否使用缓存

### Cookie和Session

#### Cookie 

服务器通过Set-Cookie 的header设置在浏览器保存，浏览器在同域请求会带上cookie

下次请求会自动带上

键值对，可以设置多个

#### Cookie设置

max-age和expires设置过期时间

Secure只在https的时候发送

HttpOnly无法通过document.cookie访问

#### domain
一级域名 cookie设置 domain=一级域名，二级域名可以访问一级的cookie。

反之不行。

### http长连接

connection:keep-alive 与 close

chrome浏览器的TCP并发请求最多6个

HTTP 1.1 同一个TCP信道 也是一个http接一个http请求的发
Http 2.0 可以一个TCP信道 N个http请求并发 eg：google

### 数据协商

#### 请求 Accept： 

Accept 

Accept-Encoding 

Accept-Language 【zh-CN,zh;q=0.9(q指的权重，越高代表越希望返回这种语言)

User-Agent 【Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36】

#### 返回 Content：

Content-Type 

互联网媒体类型-又叫Mimetype

完整的mime type类型：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

Content-Encoding 

gzip压缩比较多，node里的官方包叫zlib 压缩调用方法zlib.gzipsync(obj)

Content-Language

### redirect 跳转

302 临时跳转 每次请求都会 跳转
301 永久跳转 第一次跳转 就记住了（存到缓存，不会过期，直到主动清楚为止） 下次会直接访问跳转地址

### content-security-policy

MDN搜索CSP，有详细介绍

限制资源获取

报告资源获取越权

#### 限制方式

default-src限制全局

指定资源类型

#### 资源类型
connect-src img-src style-src script-src font/media....

### nginx

#### 重要你首先要把测试域名 例如a.test.com 改host代理到本地127.0.0.1，然后nginx才能接管请求

```bash
server {
    listen       80;
    server_name  a.test.com;

    location / {
        proxy_pass  http://127.0.0.1:8888;
        proxy_set_header Host $host;
    }
}
```

### https

HTTP 是明文传输，抓包能看到所有信息。特别是cookie

https 公钥【大家都能看到 拿来加密】 私钥【服务器保留 拿来解密】

客户端 发送随机数与加密方法 服务端返回随机数与证书 通过预主密钥生成主密钥 进行传输