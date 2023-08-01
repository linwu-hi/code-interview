# 面试官：Node文件查找的优先级与Require方法的文件查找策略

在Node.js中，模块化是一个重要的特性，它允许我们将代码组织成独立的、可重用的模块。模块之间的导入和导出通过`exports`、`module.exports`和`require`来实现。让我们来深入了解Node文件查找的优先级和`require`方法的文件查找策略。

## 1. 模块查找规则

在理解模块查找优先级之前，我们先来了解Node.js是如何查找模块的。当使用`require`方法导入一个模块时，Node.js将按照以下顺序查找模块：

1. **核心模块（Built-in Modules）**：首先，Node.js会尝试查找是否为内置模块，这些模块是Node.js自带的，无需安装即可使用，例如`http`、`fs`和`path`等。

2. **文件模块（File Modules）**：如果模块不是核心模块，Node.js将尝试查找文件模块。文件模块可以是相对路径的文件模块（以`./`或`../`开头）、绝对路径的文件模块（以`/`开头）或者目录作为模块（以`./dirname`形式）。

3. **目录作为模块**：如果使用了目录作为模块名，并且目录中包含一个`package.json`文件，则Node.js会查找该文件中指定的`main`入口文件。如果`package.json`不存在或者未指定`main`，则Node.js会尝试加载目录下的`index.js`或`index.node`文件作为入口。

4. **非原生模块**：如果以上查找都没有找到模块，Node.js会将模块名解析为绝对路径，并按照一定的路径顺序在文件系统中查找`node_modules`目录。Node.js会从当前模块的目录开始查找，然后逐级向上查找父目录的`node_modules`，直到根目录。如果找到了`node_modules`目录，则进入其中查找对应模块。

## 2. 模块查找优先级

模块查找的优先级如下图所示：

![image](https://github.com/linwu-hi/code-interview/assets/137023716/0c290dd4-ecf9-4ceb-b9d8-c64de390a7c9)

在进行模块查找时，Node.js会将已经加载的模块缓存起来，以避免重复加载相同的模块，这也是优化加载速度的一种策略。

## 3. 示例代码

为了更好地理解模块查找的过程，让我们通过一些示例代码来演示：

**示例 1：导入核心模块**

```javascript
const http = require('http');
// Node.js会直接从核心模块中加载http模块，无需进一步查找
```

**示例 2：导入文件模块**

假设我们有一个文件模块`myModule.js`，它的内容如下：

```javascript
// myModule.js
exports.message = "Hello, I am a file module.";
```

现在我们在另一个文件中导入这个模块：

```javascript
// app.js
const myModule = require('./myModule');
console.log(myModule.message);
```

在这个示例中，Node.js会从当前文件所在目录查找`myModule.js`文件并加载它。

**示例 3：导入目录作为模块**

假设我们有一个目录`myPackage`，它的结构如下：

```
myPackage
  ├── package.json
  └── index.js
```

`package.json`的内容如下：

```json
{
  "name": "my-package",
  "main": "index.js"
}
```

`index.js`的内容如下：

```javascript
// index.js
exports.greet = "Hello, I am a package module.";
```

现在我们在另一个文件中导入这个目录作为模块：

```javascript
// app.js
const myPackage = require('./myPackage');
console.log(myPackage.greet);
```

在这个示例中，Node.js会先查找`myPackage`目录下的`package.json`，然后根据其中指定的`main`入口文件`index.js`来加载模块。

**示例 4：导入非原生模块**

假设我们在项目中安装了一个第三方模块`lodash`，现在我们在文件中导入它：

```javascript
const _ = require('lodash');
// Node.js会按照查找规则，从当前目录开始向上级目录查找node_modules，直到找到lodash模块
```

## 4. 总结

Node.js的模块查找规则和优先级确保了模块可以按照一定的路径顺序被找到并加载。核心模块和已加载的模块会被缓存，避免了重复加载，提高了应用程序的性能。在编写Node.js应用程序时，我们可以根据这些规则来组织和导入模块，实现代码的模块化和复用。

##参考文献

- [Node.js Documentation: Modules](http://nodejs.cn/api/modules.html#modules_file_modules)
- [Node.js 模块加载机制详解](https://blog.csdn.net/qq_36801250/article/details/106352686)
- [Node.js模块机制及require源码解析](https://www.cnblogs.com/samve/p/10805908.html)