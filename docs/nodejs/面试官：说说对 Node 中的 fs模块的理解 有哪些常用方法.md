# 面试官：说说对 Node 中的 fs模块的理解? 有哪些常用方法


## 一、什么是fs模块？

在Node.js中，fs（filesystem）模块提供了本地文件的读写能力，它基本上是对POSIX文件操作命令的简单包装。通过fs模块，我们可以对文件进行读取、写入、追加写入、拷贝等操作。

要使用fs模块，我们首先需要导入该模块，如下：

```js
const fs = require('fs');
```

该模块对所有文件系统操作提供了异步（不具有`sync`后缀）和同步（具有`sync`后缀）两种操作方式，供开发者根据需求进行选择。

## 二、文件相关知识

在使用fs模块前，有几个文件相关的概念需要了解：

1. **权限位 mode**

   权限位用于对文件的所有者、文件所属组和其他用户进行权限分配。其中，类型又分成读、写和执行，具备权限位4、2、1，不具备权限为0。

   如在Linux系统中，我们可以通过`ls -l`命令查看文件的权限位：

   ```js
   drwxr-xr-x 1 PandaShen 197121 0 Jun 28 14:41 core
   -rw-r--r-- 1 PandaShen 197121 293 Jun 23 17:44 index.md
   ```

   在开头的十位中，`d`表示文件夹，`-`表示文件，后九位表示当前用户、用户所属组和其他用户的权限位，按每三位划分，分别代表读（r）、写（w）和执行（x），`-`表示没有当前位对应的权限。

2. **标识位 flag**

   标识位代表对文件的操作方式，如可读、可写、即可读又可写等等，常用的标识位如下：

   | 符号 | 含义                                                     |
   | ---- | -------------------------------------------------------- |
   | r    | 读取文件，如果文件不存在则抛出异常。                     |
   | r+   | 读取并写入文件，如果文件不存在则抛出异常。               |
   | rs   | 读取并写入文件，指示操作系统绕开本地文件系统缓存。       |
   | w    | 写入文件，文件不存在会被创建，存在则清空后写入。         |
   | wx   | 写入文件，排它方式打开。                                 |
   | w+   | 读取并写入文件，文件不存在则创建文件，存在则清空后写入。 |
   | wx+  | 和w+类似，排他方式打开。                                 |
   | a    | 追加写入，文件不存在则创建文件。                         |
   | ax   | 与a类似，排他方式打开。                                  |
   | a+   | 读取并追加写入，不存在则创建。                           |
   | ax+  | 与a+类似，排他方式打开。                                 |

3. **文件描述为 fd**

   操作系统为每个打开的文件分配一个名为文件描述符的数值标识，文件操作使用这些文件描述符来识别和追踪每个特定的文件。在Node.js中，每操作一个文件，文件描述符是递增的，文件描述符一般从3开始，因为前面有0、1、2三个比较特殊的描述符，分别代表`process.stdin`（标准输入）、`process.stdout`（标准输出）和`process.stderr`（错误输出）。

## 三、常用方法

下面介绍fs模块的常用方法，并给出相应的代码示例。

### 文件读取

#### 1. fs.readFileSync

同步读取文件内容，返回文件内容的Buffer或指定编码的字符串。

```js
const fs = require('fs');

// 同步读取文件，返回 Buffer
const buf = fs.readFileSync('file.txt');

// 同步读取文件，返回指定编码的字符串
const data = fs.readFileSync('file.txt', 'utf8');
```

#### 2. fs.readFile

异步读取文件内容

，通过回调函数获取结果。

```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (!err) {
    console.log(data); // 打印文件内容
  }
});
```

### 文件写入

#### 1. fs.writeFileSync

同步写入文件内容。

```js
const fs = require('fs');

fs.writeFileSync('file.txt', 'Hello, world!');
```

#### 2. fs.writeFile

异步写入文件内容，通过回调函数处理写入结果。

```js
const fs = require('fs');

fs.writeFile('file.txt', 'Hello, world!', err => {
  if (!err) {
    console.log('写入成功');
  }
});
```

### 文件追加写入

#### 1. fs.appendFileSync

同步追加写入文件内容。

```js
const fs = require('fs');

fs.appendFileSync('file.txt', 'Hello, world!');
```

#### 2. fs.appendFile

异步追加写入文件内容，通过回调函数处理写入结果。

```js
const fs = require('fs');

fs.appendFile('file.txt', 'Hello, world!', err => {
  if (!err) {
    console.log('追加写入成功');
  }
});
```

### 文件拷贝

#### 1. fs.copyFileSync

同步拷贝文件。

```js
const fs = require('fs');

fs.copyFileSync('file.txt', 'file-copy.txt');
```

#### 2. fs.copyFile

异步拷贝文件，通过回调函数处理拷贝结果。

```js
const fs = require('fs');

fs.copyFile('file.txt', 'file-copy.txt', err => {
  if (!err) {
    console.log('拷贝成功');
  }
});
```

### 创建目录

#### 1. fs.mkdirSync

同步创建目录。

```js
const fs = require('fs');

fs.mkdirSync('new-folder');
```

#### 2. fs.mkdir

异步创建目录，通过回调函数处理创建结果。

```js
const fs = require('fs');

fs.mkdir('new-folder', err => {
  if (!err) {
    console.log('目录创建成功');
  }
});
```

## 参考文献

- [Node.js文档：fs模块](http://nodejs.cn/api/fs.html)
- [Node.js中文网：fs模块介绍](https://www.nodejs.cn/api/fs.html)