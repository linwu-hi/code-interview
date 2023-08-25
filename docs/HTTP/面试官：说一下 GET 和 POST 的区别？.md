# 面试官：说一下 GET 和 POST 的区别？

## 一、GET和POST是什么？

在HTTP协议中，GET和POST是两种常用的请求方法，用于向服务器发送请求并获取响应。它们有以下特点：

### GET方法

GET方法用于请求一个指定资源的表示形式，通常用于获取数据，不应该对服务器产生副作用。GET请求的参数会附加在URL后面。

### POST方法

POST方法用于向指定的资源提交要被处理的数据，通常会导致服务器上的状态变化或产生副作用。POST请求的参数会包含在请求的正文中。

## 二、GET和POST的区别

虽然GET和POST都是使用HTTP协议传输数据，但它们在一些方面有明显的区别：

### 1. 参数位置

GET请求的参数附加在URL的末尾，形式为：`http://example.com/path?param1=value1&param2=value2`

POST请求的参数包含在请求的正文中，不会显示在URL中。

### 2. 数据长度限制

GET请求的参数附加在URL后面，受限于URL的长度限制，一般由浏览器限制，不同浏览器可能有不同的限制，例如IE限制为2083字节。

POST请求的参数在请求的正文中，没有明确的长度限制，一般受到服务器端的配置限制。

### 3. 安全性

GET请求的参数会显示在URL中，因此对于敏感信息不宜使用GET请求，因为敏感信息可能会被浏览器保存、历史记录或被其他人看到。

POST请求的参数在请求的正文中，相对来说更加安全，但仍然不是绝对安全，因为HTTP是明文传输的，只有使用HTTPS才能加密传输数据。

### 4. 缓存与历史记录

GET请求会被浏览器主动缓存，而POST请求不会被缓存，除非手动设置。因为GET请求的参数附加在URL后面，浏览器会将URL作为缓存的标识。

### 5. 幂等性

GET请求是幂等的，多次执行相同的GET请求，服务器的状态不会发生变化。

POST请求不是幂等的，多次执行相同的POST请求可能会产生不同的结果，因为可能会导致服务器状态的变化。

## 三、GET和POST的使用场景

GET请求主要用于获取数据，因为它是幂等的、可缓存的。常见的使用场景包括：

- 搜索引擎的搜索请求
- 获取网页内容
- 获取资源文件等

POST请求主要用于向服务器提交数据，因为它可能会导致状态变化或产生副作用。常见的使用场景包括：

- 提交表单数据
- 上传文件
- 发表评论等

在实际应用中，要根据具体的需求选择GET或POST方法，合理地使用它们可以提升应用的性能和安全性。

## 四、示例代码

### GET请求示例（JavaScript）

```javascript
const url = "https://api.example.com/data?id=123";
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

### POST请求示例（JavaScript）

```javascript
const url = "https://api.example.com/submit";
const data = {
  username: "user123",
  password: "pass456"
};
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

以上示例使用了`fetch`函数来发送GET和POST请求，通过Promise链式调用处理响应结果。

## 参考文献

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- https://www.w3schools.com/tags/ref_httpmethods.asp
- https://stackoverflow.com/questions/3477333/what-is-the-difference-between-post-and-get