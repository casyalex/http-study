# http-study
http协议

git bash http客户端 curl

#### 跨域

跨域实际上是浏览器的保护行为，当浏览器接受到没有'Access-Control-Allow-Origin'请求头配置的返回时，会自动忽略掉返回。服务端仍然会正常返回信息。

##### 服务端上允许跨域

服务器返回的请求头加上：

'Access-Control-Allow-Origin': '*'

*代表任何请求都允许访问

'Access-Control-Allow-Origin': 'http://baidu.com'

这个头只能设一个值，要允许多个的话，需要根据request.host判断是否在允许的网址范围内，再返回对应判断。

##### JSONP式跨域

原理：浏览器认为在标签上进行跨域没有问题，因此可以用link、image、script标签的src或ref属性进行跨域

<script src='http://127.0.0.1:8887'></script>

##### CORS跨域

###### 跨域允许的方法（不需要CORS预请求）

GET、HEAD、POST

###### 跨域允许的Content-Type（不需要CORS预请求）

text/plain multipart/form-data application/x-www-form-urlencoded

###### 其他限制

1. 请求头限制

详细请求头参考：fetch.spec.whatwg.org/#cors-safelisted-request-header

2. XMLHttpRequestUpload 对象均没有注册任何事件监听器

3. 请求中没有使用ReadableStream对象
