# 面试官：Node.js 中有哪些全局对象？

## 一、什么是全局对象

在浏览器 JavaScript 中，通常 `window` 是全局对象，而在 Node.js 中，全局对象是 `global`。

在 Node.js 里，不能在最外层定义一个变量，因为所有的用户代码都是当前模块的，只在当前模块里可用，但可以通过 `exports` 对象将变量传递给模块外部。

在 Node.js 中，用 `var` 声明的变量并不属于全局的变量，它们只在当前模块生效。真正的全局变量是挂载在 `global` 对象上的属性。

像上述的 `global` 全局对象则在全局作用域中，任何全局变量、函数、对象都是该对象的一个属性值。



## 二、哪些是全局对象

我们可以将全局对象分为两类：

- 真正的全局对象

- 模块级别的全局变量



### 真正的全局对象

下面给出一些常见的真正的全局对象：

- Class: Buffer
- process
- console
- clearInterval、setInterval
- clearTimeout、setTimeout
- global



#### Class: Buffer

`Buffer` 类用于处理二进制数据以及非 `Unicode` 编码的数据。

在 `Buffer` 类的实例化中存储了原始数据。`Buffer` 类似于一个整数数组，在 V8 堆原始存储空间给它分配了内存。

一旦创建了 `Buffer` 实例，则无法改变大小。

```js
// 创建一个包含字节 [1, 2, 3] 的 Buffer。
const buf = Buffer.from([1, 2, 3]);

// 输出: <Buffer 01 02 03>
console.log(buf);
```



#### process

`process` 对象提供有关当前进程的信息和控制。它是一个全局变量，无需使用 `require()` 就可以访问它。

`process` 对象包含了许多有用的属性，比如 `process.argv`，用于获取执行脚本时的命令行参数。

启动进程：

```shell
node index.js 参数1 参数2 参数3
```

index.js 文件如下：

```js
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

输出如下：

```shell
/usr/local/bin/node
/Users/mjr/work/node/process-args.js
参数1
参数2
参数3
```

除此之外，`process` 对象还包含其他信息，如版本、操作系统等。




#### console

`console` 对象用于打印到标准输出和标准错误输出。它是 `stdout` 和 `stderr` 的简单封装。

最常用的打印函数：`console.log`

```js
console.log("hello");
```

清空控制台：`console.clear`

```js
console.clear
```

打印函数的调用栈：`console.trace`

```js
function test() {
  demo();
}

function demo() {
  foo();
}

function foo() {
  console.trace();
}

test();
```




#### clearInterval、setInterval

`setInterval()` 方法用于按指定的周期调用函数。`clearInterval()` 方法用于取消由 `setInterval()` 方法设置的定时器。

```js
setInterval(callback, delay[, ...args])
```

`callback` 每 `delay` 毫秒重复执行一次。

```js
// 每 1000 毫秒输出一次 "Hello"
const intervalId = setInterval(() => {
  console.log("Hello");
}, 1000);
```

`clearInterval` 用于取消定时器的调用。

```js
clearInterval(intervalId);
```



#### clearTimeout、setTimeout

`setTimeout()` 方法用于在指定的毫秒数后调用函数。`clearTimeout()` 方法用于取消由 `setTimeout()` 方法设置的定时器。

```js
setTimeout(callback, delay[, ...args])
```

`callback` 在 `delay` 毫秒后执行一次。

```js
// 3000 毫秒后输出 "Hello"
const timeoutId = setTimeout(() => {
  console.log("Hello");
}, 3000);
```

`clearTimeout` 用于取消延时器的调用。

```js
clearTimeout(timeoutId);
```



#### global

全局命名空间对象，前面提到的 `process`、`console`、`setTimeout` 等都是 `global` 对象的属性。

```js
console.log(process === global.process); // true
```





### 模块级别的全局变量

这些全局变量是模块中的变量，每个模块都有，看起来像全局变量

。但在命令交互中无法使用。

这些变量包括：

- __dirname
- __filename
- exports
- module
- require



#### __dirname

获取当前文件所在的路径，不包括后续的文件名。

```js
console.log(__dirname);
// 输出: /Users/mjr
```



#### __filename

获取当前文件的路径和文件名，包括后续的文件名。

```js
console.log(__filename);
// 输出: /Users/mjr/example.js
```



#### exports

`exports` 对象用于指定一个模块所导出的内容，即可以通过 `require()` 访问的内容。

```js
exports.name = "John Doe";
exports.age = 30;
exports.sayHello = function() {
  console.log("Hello");
};
```



#### module

`module` 是对当前模块的引用。通过 `module.exports` 用于指定一个模块所导出的内容，即可以通过 `require()` 访问的内容。



#### require

`require()` 函数用于引入模块、 `JSON`、或本地文件。可以使用相对路径引入本地模块或 `JSON` 文件，路径会根据 `__dirname` 定义的目录名或当前工作目录进行处理。

```js
const myModule = require("./myModule");
```



## 三、优缺点

优点：

- JSON 具有通用性，所以可以跨语言
- 组成简单，字节占用小，便于传输
- 服务端无需保存会话信息，很容易进行水平扩展

缺点：

- 没有内置支持广泛数据类型（如日期、正则表达式）
- 无法处理循环引用，会导致序列化失败
- JSON 不支持注释，可读性较差

补充代码示例：

```js
// 例1：演示模块级别的全局变量 __dirname 和 __filename
console.log(__dirname); // 输出当前文件所在的路径，如：/Users/mjr
console.log(__filename); // 输出当前文件的路径和文件名，如：/Users/mjr/example.js

// 例2：演示模块导出和引入
// myModule.js
exports.name = "John Doe";
exports.age = 30;
exports.sayHello = function() {
  console.log("Hello");
};

// app.js
const myModule = require("./myModule");
console.log(myModule.name); // 输出: John Doe
myModule.sayHello(); // 输出: Hello
```

## 参考文献

- [Node.js 官方文档](https://nodejs.org/api/globals.html)