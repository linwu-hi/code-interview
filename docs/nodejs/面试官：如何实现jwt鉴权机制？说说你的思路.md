# 面试官：如何实现jwt鉴权机制？说说你的思路

## 一、JWT简介

JSON Web Token（JWT）是一种用于在用户和服务器之间传递安全可靠信息的字符串书写规范。它由三部分组成：头部（Header）、载荷（Payload）、签名（Signature），并以`.`进行拼接。JWT在前后端分离的开发中常用于身份验证。

### 头部（Header）

头部指定使用的加密算法，一般使用HMAC SHA256。头部信息经过Base64编码，例如：

```json
{ "alg": "HS256", "typ": "JWT" }
```

编码后为：

```tex
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### 载荷（Payload）

载荷用于存放实际的内容，例如用户的ID和名称，还可以设置过期时间等信息。载荷信息也经过Base64编码，例如：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

编码后为：

```tex
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
```

### 签名（Signature）

签名是对头部和载荷进行签名，使用秘钥对数据进行加密。签名可以确保数据在传输过程中没有被篡改。

## 二、实现JWT鉴权机制

### 1. 生成Token

使用第三方库`jsonwebtoken`来生成JWT Token。在用户登录成功后，颁发Token作为后续接口访问的凭证。

```javascript
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// 用户列表（应该使用数据库存储，这里仅作演示）
let userList = [];

class UserController {
  static async login(ctx) {
    const data = ctx.request.body;
    if (!data.name || !data.password) {
      return (ctx.body = {
        code: "000002",
        message: "参数不合法",
      });
    }
    const result = userList.find(
      (item) =>
        item.name === data.name &&
        item.password === crypto.createHash("md5").update(data.password).digest("hex")
    );
    if (result) {
      const token = jwt.sign(
        {
          name: result.name,
        },
        "test_token", // 密钥
        { expiresIn: 60 * 60 } // 过期时间：60 * 60秒
      );
      return (ctx.body = {
        code: "0",
        message: "登录成功",
        data: {
          token,
        },
      });
    } else {
      return (ctx.body = {
        code: "000002",
        message: "用户名或密码错误",
      });
    }
  }
}
```

前端接收到Token后，通常会使用`localStorage`进行缓存，并将Token放在HTTP请求头的`Authorization`字段中。注意在`Authorization`字段中加上`Bearer`前缀，后面跟一个空格。

```javascript
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.common["Authorization"] = "Bearer " + token; // 注意这里的Authorization
  return config;
});
```

### 2. 校验Token

使用`koa-jwt`中间件进行Token验证，配置白名单（接口白名单不需要校验）。

```javascript
const koajwt = require("koa-jwt");

app.use(
  koajwt({
    secret: "test_token", // 密钥，与签发时保持一致
  }).unless({
    path: [/\/api\/register/, /\/api\/login/], // 接口白名单
  })
);
```

通过中间件校验后，可以在后续路由中获取用户信息。

```javascript
router.get("/api/userInfo", async (ctx, next) => {
  const authorization = ctx.header.authorization;
  const token = authorization.replace("Bearer ", "");
  const result = jwt.verify(token, "test_token");
  ctx.body = result;
});
```

## 三、优缺点

### 优点：

- JSON具有通用性，可跨语言使用。
- JWT结构简单，字节占用小，便于传输。
- 服务器无需保存会话信息，容易进行水平扩展。
- 一处生成，多处使用，可解决分布式系统中的单点登录问题。
- 可防护CSRF攻击。

### 缺点：

- 载荷部分仅进行简单编码，只能存储逻辑必需的非敏感信息。
- 需要保护好加密密钥，一旦泄露后果严重。
- 为避免Token被劫持，建议使用HTTPS协议保护通信安全。

## 参考文献

- [理解JSON Web Token](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [Golang JWT详解](https://blog.wangjunfeng.com/post/golang-jwt/)