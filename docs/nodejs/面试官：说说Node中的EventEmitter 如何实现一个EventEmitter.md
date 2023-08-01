# 面试官：说说Node中的EventEmitter? 如何实现一个EventEmitter?


## 一、什么是EventEmitter？

在Node.js中，`EventEmitter`是事件驱动的基础，几乎所有模块都继承自它。它实现了观察者模式，其中被观察者维护一组观察者，并在更新时通知观察者。

`EventEmitter`允许对象绑定和触发事件监听器，实现异步操作。在Node.js中，许多对象都会分发事件，例如`fs.readStream`对象会在文件被打开时触发一个事件。

## 二、使用EventEmitter

Node.js的`events`模块提供了一个`EventEmitter`类，可以通过继承它创建自定义事件对象。

基本使用方法如下：

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

function callback() {
    console.log('触发了event事件！');
}

myEmitter.on('event', callback);
myEmitter.emit('event');
myEmitter.removeListener('event', callback);
```

`EventEmitter`的常用方法有：

- `on(eventName, listener)`: 添加类型为`eventName`的事件监听器。
- `once(eventName, listener)`: 添加类型为`eventName`的事件监听器，但只能执行一次，执行后将被删除。
- `prependListener(eventName, listener)`: 添加类型为`eventName`的事件监听器到事件数组头部。
- `emit(eventName, ...args)`: 触发类型为`eventName`的事件监听器。
- `removeListener(eventName, listener)`: 移除类型为`eventName`的事件监听器。

## 三、实现自定义EventEmitter

我们可以简单实现一个`EventEmitter`类，了解其基本原理。在实现过程中，需要维护一个包含所有事件的对象`events`。

```js
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(type, handler) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(handler);
    }

    emit(type, ...args) {
        if (!this.events[type]) {
            return;
        }
        this.events[type].forEach((handler) => {
            handler.apply(this, args);
        });
    }

    removeListener(type, handler) {
        if (!this.events[type]) {
            return;
        }
        this.events[type] = this.events[type].filter((item) => item !== handler);
    }
}
```

以上代码实现了`on`、`emit`、`removeListener`方法，分别用于添加事件监听器、触发事件和移除事件监听器。

## 四、测试自定义EventEmitter

```js
const bus = new EventEmitter();

bus.on('event', () => {
    console.log('Event 1');
});

function event2() {
    console.log('Event 2');
}

bus.on('event', event2);

bus.emit('event');
// Output:
// Event 1
// Event 2

bus.removeListener('event', event2);
bus.emit('event');
// Output:
// Event 1
```

## 五、总结

`EventEmitter`是Node.js中非常重要的一个模块，它实现了事件驱动的基本模式，让Node.js具备了处理异步操作的能力。我们也可以通过简单实现一个自定义的`EventEmitter`来更好地理解其原理和用法。

## 参考文献

- [Node.js官方文档 - events模块](http://nodejs.cn/api/events.html#events_class_eventemitter)
- [Node.js EventEmitter源码解析](https://segmentfault.com/a/1190000015762318)
- [Node.js事件模块EventEmitter的简单实现](https://juejin.cn/post/6844903781230968845)