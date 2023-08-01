# 实现符合Promise/A+规范的Promise

## 介绍：

Promise是JavaScript中处理异步操作的重要工具之一。Promise/A+规范是一种关于Promise实现的标准，它定义了Promise的行为和方法。本文将详细介绍如何实现Promise/A+规范，让你了解Promise的工作原理并能够自己实现一个符合规范的Promise。

## Promise/A+规范简介

### 1. Promise的三种状态：
   - pending（进行中）：Promise的初始状态，表示异步操作正在执行。
   - fulfilled（已完成）：异步操作成功完成，并返回一个值，称为解决值（fulfillment value）。
   - rejected（已拒绝）：异步操作失败或被拒绝，并返回一个原因（reason），通常是一个错误对象。

###  2. 状态转换：
   - Promise的状态只能从pending转变为fulfilled或rejected，一旦转变就不可逆转。
   - 状态转换是由异步操作的结果决定的。如果异步操作成功完成，Promise的状态会转变为fulfilled；如果异步操作失败或被拒绝，Promise的状态会转变为rejected。

### 3. Promise的基本方法：
   - `then`方法：用于注册异步操作成功完成时的回调函数，并返回一个新的Promise对象。它接受两个参数：onFulfilled（可选，异步操作成功时的回调函数）和onRejected（可选，异步操作失败时的回调函数）。
   - `catch`方法：用于注册异步操作失败时的回调函数，并返回一个新的Promise对象。它是`then`方法的一个特殊形式，仅用于捕获异常。
   - `finally`方法：无论异步操作成功或失败，都会执行的回调函数，并返回一个新的Promise对象。它在Promise链中的最后执行，并且不接收任何参数。

### 4. 错误冒泡和异常传递：
   - Promise/A+规范要求Promise的错误能够被适当地捕获和处理。当一个Promise发生错误时，它会向下传播，直到找到最近的错误处理函数为止。
   - 在Promise链中的任何一个Promise发生错误，都会导致整个链上的错误处理函数被调用，以便进行错误处理和恢复。

遵循Promise/A+规范的实现应该具备上述特性，以确保一致的Promise行为和接口。这样，开发者可以编写通用的异步代码，而无需担心特定Promise实现的差异性。


## 实现Promise


当从零开始实现 Promise/A+ 规范的 Promise，我们需要逐步构建 Promise 的核心功能，包括状态管理、状态转换、回调处理和错误处理。

###  步骤 1: 创建 Promise 构造函数
首先，我们需要创建一个 Promise 构造函数，它接受一个执行器函数作为参数。执行器函数接受两个参数，即 resolve 和 reject 函数，用于控制 Promise 的状态转换。

```javascript
function MyPromise(executor) {
  // TODO: 实现构造函数
}
```

### 步骤 2: 初始化 Promise 状态和回调
在构造函数中，我们需要初始化 Promise 的状态和回调数组。状态可以使用一个变量来表示，初始值为 'pending'。回调数组用于存储注册的成功和失败回调函数。

```javascript
function MyPromise(executor) {
  var self = this;
  self.state = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  // TODO: 实现构造函数的其余部分
}
```

### 步骤 3: 实现 resolve 和 reject 函数
我们需要实现 resolve 和 reject 函数，用于将 Promise 的状态从 'pending' 转换为 'fulfilled' 或 'rejected'。resolve 函数将传递一个值来兑现 Promise，而 reject 函数将传递一个原因来拒绝 Promise。

```javascript
function MyPromise(executor) {
  var self = this;
  self.state = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.state === 'pending') {
      self.state = 'fulfilled';
      self.value = value;
      self.onFulfilledCallbacks.forEach(function(callback) {
        callback(self.value);
      });
    }
  }

  function reject(reason) {
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(function(callback) {
        callback(self.reason);
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
```

### 步骤 4: 实现 then 方法
接下来，我们需要实现 then 方法，用于注册成功和失败的回调函数，并返回一个新的 Promise。then 方法接受两个参数：成功回调函数和失败回调函数。

```javascript
function MyPromise(executor) {
  var self = this;
  self.state = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.state === 'pending') {
      self.state = 'fulfilled';
      self.value = value;
      self.onFulfilledCallbacks.forEach(function(callback) {
        callback(self.value);
      });
    }
  }

  function reject(reason) {
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(function(callback) {
        callback(self.reason);
      });
    }
  }

  try {
    executor

(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) { return value; };
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason; };

  var newPromise = new MyPromise(function(resolve, reject) {
    // TODO: 实现 then 方法的其余部分
  });

  return newPromise;
};
```

### 步骤 5: 处理 Promise 状态转换和回调执行

我们需要在 then 方法中处理 Promise 的状态转换和回调的执行。根据当前 Promise 的状态，我们可以立即执行回调函数或将回调函数添加到相应的回调数组中。

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) { return value; };
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { throw reason; };

  var newPromise = new MyPromise(function(resolve, reject) {
    function handleFulfilled(value) {
      try {
        var x = onFulfilled(value);
        resolvePromise(newPromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }

    function handleRejected(reason) {
      try {
        var x = onRejected(reason);
        resolvePromise(newPromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }

    if (self.state === 'fulfilled') {
      setTimeout(function() {
        handleFulfilled(self.value);
      }, 0);
    } else if (self.state === 'rejected') {
      setTimeout(function() {
        handleRejected(self.reason);
      }, 0);
    } else if (self.state === 'pending') {
      self.onFulfilledCallbacks.push(function(value) {
        setTimeout(function() {
          handleFulfilled(value);
        }, 0);
      });

      self.onRejectedCallbacks.push(function(reason) {
        setTimeout(function() {
          handleRejected(reason);
        }, 0);
      });
    }
  });

  return newPromise;
};
```

### 步骤 6: 解析 Promise

最后，我们需要实现 resolvePromise 函数，用于解析 Promise。它会处理 thenable 和非 thenable 值，并根据其状态执行相应的处理。

```javascript
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new TypeError('Circular reference detected.'));
  }

  if (x && typeof x === 'object' || typeof x === 'function') {
    var called = false;

    try {
      var then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          function(y) {
            if (!called) {
              called = true;
              resolvePromise(promise, y, resolve, reject);
            }
          },
          function(r) {
            if (!called) {
              called = true;
              reject(r);
            }
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (!called) {
        called = true;
        reject(e);
      }
    }
  } else {
    resolve(x);
  }
}
```


## Promise的测试与调试


### 1. 安装Jest：
   确保在项目中安装了Jest。可以使用npm或yarn进行安装。

```shell
npm install jest --save-dev
```

### 2. 编写单元测试：
   在项目中创建一个测试文件，以`.test.js`为后缀，编写单元测试用例来验证Promise的各个功能和方法的正确性。例如，可以编写测试用例来验证状态转换、回调函数的执行、链式调用等方面的行为是否符合预期。

```javascript
// promise.test.js

const { MyPromise } = require('./promise');

describe('MyPromise', () => {
  it('should fulfill with correct value', () => {
    const promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('success');
      }, 100);
    });

    return promise.then((value) => {
      expect(value).toBe('success');
    });
  });

  it('should reject with correct reason', () => {
    const promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('failure'));
      }, 100);
    });

    return promise.catch((reason) => {
      expect(reason).toBeInstanceOf(Error);
      expect(reason.message).toBe('failure');
    });
  });

  // 更多测试用例...
});
```

### 3. 运行测试：
   使用Jest运行编写的测试用例，执行Promise的测试。

```shell
npx jest
```

### 4. 模拟异步操作：
   使用`setTimeout`函数或`Promise.resolve`等方法来模拟异步操作，并确保Promise在正确的时机进行状态转换和回调函数的执行。例如，可以使用`setTimeout`来模拟异步操作的完成。

```javascript
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 100);
});

promise.then((value) => {
  console.log(value); // 输出: success
});
```

### 5. 调试Promise链：
   在开发过程中，可能会遇到Promise链上的问题，如回调函数不执行、结果不符合预期等。可以使用`console.log`或`debugger`语句来打印中间变量的值，或者使用Jest的调试功能来逐步跟踪Promise链的执行过程。

```javascript
const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 100);
});

const promise2 = promise1.then((value) => {
  console.log(value); // 输出: success
  return value.toUpperCase();
});

promise2.then((value) => {
  console.log(value); // 输出: SUCCESS
});
```

可以使用Jest的`--inspect`参数进行调试，或者在代码中添加`debugger`语句来触发断点。

```shell
npx jest --inspect
```

### 使用Promise/A+测试套件

使用Promise/A+测试套件是确保Promise实现符合规范的重要步骤。Promise/A+测试套件是一组针对Promise实现的测试用例，可用于验证Promise是否符合Promise/A+规范的要求。

以下是使用Promise/A+测试套件的步骤：

1. 下载Promise/A+测试套件：
   首先，从Promise/A+官方的GitHub仓库（https://github.com/promises-aplus/promises-tests）下载Promise/A+测试套件的代码。将其保存到项目的测试目录中。

2. 集成测试套件：
   将Promise/A+测试套件集成到项目的测试环境中，确保可以运行测试套件并获得结果。

3. 实现Promise接口：
   根据Promise/A+规范的要求，实现一个符合规范的Promise类。确保Promise类的行为和接口与规范一致。

4. 运行测试套件：
   使用测试框架（如Mocha、Jest等）运行Promise/A+测试套件。在测试套件的配置中，指定测试文件为Promise/A+测试套件的入口文件。

5. 验证结果：
   查看测试套件的运行结果。如果所有的测试用例都通过，表示Promise实现符合Promise/A+规范。如果有测试用例失败，根据测试结果来调试和修复Promise实现中的问题。

下面是一个示例，展示如何使用Promise/A+测试套件进行测试：

```javascript
// 安装Promise/A+测试套件
npm install promises-aplus-tests --save-dev

// 集成Promise/A+测试套件到测试环境中
const promisesAplusTests = require('promises-aplus-tests');
const { MyPromise } = require('./promise');

// 运行Promise/A+测试套件
promisesAplusTests(MyPromise, function (err) {
  // 测试完成后的回调函数
  if (err) {
    console.error('Promise/A+测试失败：', err);
  } else {
    console.log('Promise/A+测试通过！');
  }
});
```

在上述代码中，`MyPromise`是自己实现的Promise类。通过将`MyPromise`传递给`promisesAplusTests`函数，将Promise类集成到Promise/A+测试套件中。运行测试后，将会得到测试结果。

通过使用Promise/A+测试套件，可以验证自己实现的Promise是否符合Promise/A+规范的要求，确保Promise的行为和接口的一致性。


## Promise其它API

要实现`Promise.all`和`Promise.race`等其他API，可以根据Promise的规范和功能需求来编写相应的代码。以下是对这两个API的实现进行展开讲解的代码示例：

1. 实现`Promise.all`：
   `Promise.all`方法接收一个可迭代对象（如数组或类数组对象），并返回一个新的Promise，该Promise在所有输入的Promise都成功完成时才会成功，否则将会失败。返回的Promise的解决值是一个由所有输入Promise解决值组成的数组。

```javascript
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;

    const checkCompletion = () => {
      if (completedCount === promises.length) {
        resolve(results);
      }
    };

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((value) => {
          results[i] = value;
          completedCount++;
          checkCompletion();
        })
        .catch((reason) => {
          reject(reason);
        });
    }

    if (promises.length === 0) {
      resolve(results);
    }
  });
};
```

使用示例：

```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 1500));

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // 输出: [1, 2, 3]
  })
  .catch((reason) => {
    console.error(reason);
  });
```

2. 实现`Promise.race`：
   `Promise.race`方法接收一个可迭代对象（如数组或类数组对象），并返回一个新的Promise，该Promise将与最先解决或拒绝的输入Promise具有相同的状态。

```javascript
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          reject(reason);
        });
    }
  });
};
```

使用示例：

```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 1500));

Promise.race([promise1, promise2, promise3])
  .then((value) => {
    console.log(value); // 输出: 1
  })
  .catch((reason) => {
    console.error(reason);
  });
```

## 参考资料

- Promise/A+ 规范官方文档：https://promisesaplus.com/
