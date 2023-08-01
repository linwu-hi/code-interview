# 面试官：说说 HTTP 常见的请求头有哪些? 作用？

## 一、什么是HTTP头字段？

HTTP头字段（HTTP header fields）是指在超文本传输协议（HTTP）的请求和响应消息中的消息头部分。它们定义了一个HTTP事务中的操作参数。HTTP头部字段可以根据需要自定义，因此可能在Web服务器和浏览器上发现非标准的头字段。

下面是一个HTTP请求的请求头示例：

```http
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

## 二、常见的请求头字段

以下是一些常见的HTTP请求头字段及其说明：

### 1. Accept

用于指定能够接受的回应内容类型（Content-Types）。

### 2. Accept-Charset

用于指定能够接受的字符集。

### 3. Accept-Encoding

用于指定能够接受的编码方式列表，常见的有gzip、deflate等。

### 4. Accept-Language

用于指定能够接受的回应内容的自然语言列表，例如en-US表示英语（美国）。

### 5. Authorization

用于超文本传输协议的认证的认证信息，通常用于进行用户身份验证。

### 6. Cache-Control

用来指定在请求/响应链中的所有缓存机制都必须遵守的指令，例如no-cache表示不缓存。

### 7. Cookie

用于服务器通过Set-Cookie发送的一个HTTP Cookie。

### 8. Content-Length

表示请求体的长度，以八位字节数组（8位的字节）表示。

### 9. Content-Type

用于指定请求体的多媒体类型，例如application/x-www-form-urlencoded表示表单数据。

### 10. User-Agent

表示浏览器的浏览器身份标识字符串，用于标识用户使用的浏览器信息。

### 11. Host

表示服务器的域名，以及服务器所监听的传输控制协议端口号。

### 12. Referer

表示请求的来源页面，即用户是从哪个页面跳转过来的。

### 13. Origin

用于发起一个针对跨来源资源共享的请求，表示允许跨域请求。

## 三、使用场景

通过配合请求头和响应头，可以实现一些常见的功能：

### 1. 协商缓存

通过请求头的`If-Modified-Since`、`If-None-Match`和响应头的`Last-Modified`、`ETag`实现缓存的协商，减少不必要的数据传输。

### 2. 会话状态管理

通过请求头的`Cookie`字段，服务器可以在客户端维护会话状态，实现用户登录状态、购物车、个性化设置等功能。

以上是HTTP常见请求头及其作用的简要介绍，HTTP头字段在HTTP通信中扮演着重要的角色，帮助服务器和浏览器进行信息交换和功能实现。

## 参考文献

- [HTTP头字段 - 维基百科](https://zh.wikipedia.org/wiki/HTTP%E5%A4%B4%E5%AD%97%E6%AE%B5)
- [HTTP Request Headers - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)