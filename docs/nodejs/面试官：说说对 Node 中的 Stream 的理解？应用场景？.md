# 面试官：说说对 Node 中的 Stream 的理解？应用场景？

![image](https://github.com/linwu-hi/code-interview/assets/137023716/3b1db377-321f-43f0-8cc1-68131d9409d6)


## 一、什么是流？

在Node.js中，流(Stream)是一种数据传输的手段，用于端到端的信息交换，数据是按照顺序逐块读取和处理的。相比于传统的一次性将整个文件读入内存的方式，流是逐块处理数据，不将全部数据保存在内存中。

流可以分为四种种类：

1. 可读流（Readable Stream）：用于读取数据的流，例如`fs.createReadStream()`可以从文件读取内容。

2. 可写流（Writable Stream）：用于写入数据的流，例如`fs.createWriteStream()`可以将数据写入文件。

3. 双工流（Duplex Stream）：可读又可写的流，例如`net.Socket`。

4. 转换流（Transform Stream）：可以在数据写入和读取时修改或转换数据的流，例如文件压缩操作中的压缩和解压缩过程。

这些流都是单向的，流的操作通常通过pipe（管道）来连接。`source`流通过pipe将数据流向`dest`流，实现数据传输。

## 二、应用场景

流(Stream)在Node.js中应用广泛，特别适用于处理I/O操作。以下是一些常见的应用场景：

### 1. HTTP请求和响应

在Node.js的HTTP服务器模块中，`request`是可读流，`response`是可写流。可以通过流的方式来处理HTTP请求和响应，特别适用于大文件的传输。

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream('largeFile.txt');
  readStream.pipe(res);
});

server.listen(3000);
```

### 2. 文件操作

在处理文件读写时，流可以将数据分段处理，适用于大文件的读写操作，避免一次性将整个文件读入内存。

```js
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

readStream.pipe(writeStream);
```

### 3. 数据转换

转换流（Transform Stream）是一种特殊的流，可以在数据写入和读取时对数据进行修改或转换。常见的应用包括数据压缩、加密解密等操作。

```js
const { Transform } = require('stream');

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    // 对数据进行转换处理
    const transformedData = doSomething(chunk);
    // 将转换后的数据传给下一个流程
    callback(null, transformedData);
  }
});
```

### 4. 打包工具构建过程

一些前端打包构建工具（如Gulp）通常会频繁地进行文件操作，使用流可以提高效率和降低内存占用。

以上只是流的一些应用场景，实际上流在Node.js中几乎无处不在，通过流的处理，可以更好地控制和处理数据，提高性能和效率。

## 五、参考文献

- [https://xie.infoq.cn/article/1a9695020828460eb3c4ff1fa](https://xie.infoq.cn/article/1a9695020828460eb3c4ff1fa)
- [https://juejin.cn/post/6844903891083984910](https://juejin.cn/post/6844903891083984910)