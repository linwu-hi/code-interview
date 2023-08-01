# 面试官：说说对中间件概念的理解，如何封装 node 中间件？

## 一、中间件概念

中间件（Middleware）是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的。

在Node.js中，中间件主要是指封装HTTP请求细节处理的方法。例如在Express、Koa等Web框架中，中间件的本质为一个回调函数，参数包含请求对象、响应对象和执行下一个中间件的函数。在这些中间件函数中，我们可以执行业务逻辑代码，修改请求和响应对象，返回响应数据等操作。

## 二、封装中间件

### 1. Token校验中间件

```js
// token校验中间件
module.exports = (options) => async (ctx, next) {
  try {
    // 获取token
    const token = ctx.header.authorization;
    if (token) {
      try {
          // 使用verify函数验证token，并获取用户相关信息
          await verify(token);
      } catch (err) {
        console.log(err);
      }
    }
    // 进入下一个中间件
    await next();
  } catch (err) {
    console.log(err);
  }
}
```

### 2. 日志中间件

```js
const fs = require('fs');

// 日志中间件
module.exports = (options) => async (ctx, next) => {
  const startTime = Date.now();
  const requestTime = new Date();
  await next();
  const ms = Date.now() - startTime;
  let logEntry = `${ctx.request.ip} -- ${requestTime} -- ${ctx.method} -- ${ctx.url} -- ${ms}ms`;
  // 输出日志到文件
  fs.appendFileSync('./log.txt', logEntry + '\n');
}
```

### 3. Koa-bodyparser中间件简单实现

```js
// 自定义koa-bodyparser中间件
const querystring = require("querystring");

module.exports = function bodyParser() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      // 存储数据的数组
      let dataArr = [];

      // 接收数据
      ctx.req.on("data", data => dataArr.push(data));

      // 整合数据并使用 Promise 成功
      ctx.req.on("end", () => {
        // 获取请求数据的类型 json 或表单
        let contentType = ctx.get("Content-Type");

        // 获取数据 Buffer 格式
        let data = Buffer.concat(dataArr).toString();

        if (contentType === "application/x-www-form-urlencoded") {
          // 如果是表单提交，则将查询字符串转换成对象赋值给 ctx.request.body
          ctx.request.body = querystring.parse(data);
        } else if (contentType === "applaction/json") {
          // 如果是json，则将字符串格式的对象转换成对象赋值给 ctx.request.body
          ctx.request.body = JSON.parse(data);
        }

        // 执行成功的回调
        resolve();
      });
    });

    // 继续向下执行
    await next();
  };
};
```

### 4. Koa-static中间件简单实现

```js
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const { promisify } = require("util");

// 将 stat 和 access 转换成 Promise
const stat = promisify(fs.stat);
const access = promisify(fs.access);

module.exports = function (dir) {
  return async (ctx, next) => {
    // 将访问的路由处理成绝对路径，这里要使用 join 因为有可能是 /
    let realPath = path.join(dir, ctx.path);

    try {
      // 获取 stat 对象
      let statObj = await stat(realPath);

      // 如果是文件，则设置文件类型并直接响应内容，否则当作文件夹寻找 index.html
      if (statObj.isFile()) {
        ctx.set("Content-Type", `${mime.getType()};charset=utf8`);
        ctx.body = fs.createReadStream(realPath);
      } else {
        let filename = path.join(realPath, "index.html");

        // 如果不存在该文件则执行 catch 中的 next 交给其他中间件处理
        await access(filename);

        // 存在设置文件类型并响应内容
        ctx.set("Content-Type", "text/html;charset=utf8");
        ctx.body = fs.createReadStream(filename);
      }
    } catch (e) {
      await next();
    }
  }
}
```

## 三、总结

在封装中间件时，每个中间件应足够简单，职责单一。中间件的代码编写应高效，必要时通过缓存重复获取数据。

Node.js中的Web框架如Koa本身比较简洁，但通过中间件的机制能实现各种需要的功能，使得Web应用具备良好的可拓展性和组合性。

通过将公共逻辑处理编写在中间件中，可以避免在每个接口回调中重复编写相同的代码，减少冗余代码，达到类似装饰者模式的效果。

## 参考文献

- [Middleware - 百度百科](https://baike.baidu.com/item/%E4%B8%AD%E9%97%B4%E4%BB%B6)
- [从 Koa 中间件原理浅谈中间件的封装](https://segmentfault.com/a/1190000017897279)
- [自定义 Koa-bodyparser 中间件](https://www.jianshu.com/p/81b6ebc0dd85)