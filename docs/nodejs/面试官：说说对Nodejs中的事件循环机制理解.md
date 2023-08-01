# 面试官：说说对Nodejs中的事件循环机制理解?

![image](https://github.com/linwu-hi/code-interview/assets/137023716/8937eac0-fd77-4974-b916-f76bd0ecd0ef)

## 一、什么是事件循环？

![image](https://github.com/linwu-hi/code-interview/assets/137023716/7aaa125a-6e50-45b5-8937-831b462373f3)

在Node.js中，事件循环是基于libuv实现的。libuv是一个多平台的专注于异步IO的库，负责处理底层的事件循环和IO操作，使得Node.js能够实现非阻塞的IO。

事件循环主要是为了处理异步操作。在Node.js中，几乎所有的IO操作都是异步的，包括文件读写、网络请求等。为了能够在异步操作完成后及时执行相应的回调函数，Node.js引入了事件循环机制。

## 二、事件循环的流程

Node.js的事件循环是基于事件触发器的概念。事件触发器可以添加监听器，当特定事件发生时，触发相应的回调函数。事件循环不断地检查事件触发器是否有待处理的事件，如果有，则执行相应的回调函数。

事件循环的流程可以简化为以下几个步骤：

1. 执行当前的同步代码。
2. 检查是否有待处理的微任务（即process.nextTick和Promise的then回调），如果有，则依次执行微任务。
3. 检查是否有待处理的宏任务（即定时器、IO事件和setImmediate回调），如果有，则执行宏任务队列中最早的一个任务。
4. 重复上述步骤，直到所有的任务队列为空。

## 三、事件循环的阶段

Node.js的事件循环分为6个阶段，每个阶段都有对应的任务队列。事件循环每次遍历一个阶段，都会依次执行该阶段的任务队列中的任务。下面是Node.js事件循环的6个阶段：

1. timers阶段：执行定时器回调。
2. I/O事件回调阶段：执行I/O相关的回调，例如网络请求、文件读写等。
3. idle, prepare阶段：内部使用，不常用。
4. poll阶段：检索新的I/O事件并执行相关回调。
5. check阶段：执行setImmediate回调。
6. close阶段：执行关闭事件的回调。

## 四、题目分析

题目代码如下：

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout0')
}, 0)

setTimeout(function () {
    console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));

async1();

process.nextTick(() => console.log('nextTick2'));

new Promise(function (resolve) {
    console.log('promise1')
    resolve();
    console.log('promise2')
}).then(function () {
    console.log('promise3')
})

console.log('script end')
```

分析过程如下：

1. 执行同步代码，输出`script start`。
2. 遇到第一个`setTimeout`，将其回调函数放入`timer`阶段。
3. 遇到第二个`setTimeout`，设置了300ms后放入`timer`阶段。
4. 遇到`setImmediate`，放入`check`阶段。
5. 遇到第一个`process.nextTick`，放入微任务队列。
6. 执行`async1()`，输出`async1 start`，然后执行`async2()`，输出`async2`，`async2`后面的代码进入微任务队列，等待下一轮事件循环。
7. 遇到第二个`process.nextTick`，放入微任务队列。
8. 遇到`new Promise`，输出`promise1`，然后执行立即执行函数，输出`promise2`，接着`then`的回调进入微任务队列。
9. 执行`console.log('script end')`，输出`script end`。
10. 执行微任务队列中的回调，依次输出`nextTick1`、`nextTick2`、`async1 end`、`promise3`。
11. 执行`timer`阶段，输出`setTimeout0`。
12. 执行`check`阶段，输出`setImmediate`。
13. 300ms后，`timer`阶段有任务，输出`setTimeout2`。

最终输出结果为：

```
script start
async1 start
async2
promise1
promise2
script end
nextTick1
nextTick2
async1 end
promise3
setTimeout0
setImmediate
setTimeout2
```

## 五、setTimeout与setImmediate的输出顺序

最后还有一个关于`setTimeout`与`setImmediate`的输出顺序的问题。

```js
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

可能输出情况有两种：

情况一

：

```
setTimeout
setImmediate
```

情况二：

```
setImmediate
setTimeout
```

这是因为`setTimeout`的回调函数虽然设置了0毫秒的延迟，但是实际上会被强制改成1ms，而`setImmediate`会在检查阶段（`check`阶段）立即执行。因此，如果同步代码执行时间较长，可能会导致`setTimeout`的回调在`setImmediate`之后执行。

