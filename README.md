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

##### 缓存Cache-Control

###### 可缓存性

public 任何请求都可以对返回内容进行缓存（包括代理服务器）

private 只有发起请求的服务器才可以进行缓存

no-cache 任何节点都不能缓存。【会去服务器验证能不能使用缓存】

###### 到期

max-age = <seconds> 

s-maxage = <seconds> 只有代理服务器才会生效（专为代理生效，覆盖max-age）

max-stale = <seconds> max-age过期以后，还可以使用过期缓存的时间限制（发起请求带的头） 【浏览器不会主动设置这个头，一般用不到】

###### 重新验证

must-revalidate 如果缓存过期，必须到原服务器重新验证

proxy-revalidate 缓存服务器专用的重新验证

###### 其他

no-store 彻底不能存储缓存 【不会去服务器验证能否使用缓存】

no-transform 不允许改动返回内容（主要针对压缩）
