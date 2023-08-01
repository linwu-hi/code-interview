# JavaScript中的编码

在编写JavaScript代码时，我们常常需要处理URLs，这时候理解JavaScript中的`escape`，`encodeURI`和`encodeURIComponent`函数就显得尤为重要。这些函数用于将特殊字符转化为能在URL中安全传输的形式。本文将详细介绍这三个函数的用法和区别，以帮助你更准确的处理URL编码问题。

## 1. escape函数

首先，我们来了解一下`escape`函数。这是一个老旧的函数，现在已经不再推荐使用，因为它不能处理所有的Unicode字符。`escape`函数会将传入的字符串转化为十六进制的escape序列，这样的序列以`%`开头。

然而，这个函数只能正确处理ASCII字符（字符代码小于等于255的字符）。对于ASCII字符代码大于255的字符，`escape`函数会先将其转化为Unicode转义序列（例如，`\u20AC`），然后再对这个转义序列进行编码。这种处理方式会导致一些问题。比如，对于欧元符号（`€`），它的Unicode代码是`20AC`，`escape`函数会将其转化为`%u20AC`，而不是正确的`%E2%82%AC`。

因此，我们不应该再使用`escape`函数来处理URL编码。

## 2. encodeURI函数

接下来，我们来看看`encodeURI`函数。这个函数用于编码完整的URL。它会将非法的URL字符转化为各自的十六进制表示，以`%`开头。

然而，`encodeURI`函数并不会对所有的字符进行编码。一些在URL中有特殊含义的字符，例如`/`，`:`，`#`等，以及ASCII字母，数字和一些符号（`- _ . ! ~ * ' ( )`），不会被`encodeURI`函数编码。这是因为这些字符在URL中是合法的，可以直接使用。

下面是一个`encodeURI`函数的例子：

```javascript
const url = 'https://example.com/Hello World!';
console.log(encodeURI(url)); // https://example.com/Hello%20World!
```

在这个例子中，`encodeURI`函数将空格字符编码为`%20`，因为空格在URL中是不合法的。而其他的字符，如`/`和`:`等，都没有被编码。

## 3. encodeURIComponent函数

最后，我们来看看`encodeURIComponent`函数。这个函数用于编码URL的组成部分，比如查询参数。它会将所有非法的URL字符以及一些有特殊含义的字符（如`/`，`:`，`#`等）转化为各自的十六进制表示。

这意味着`encodeURIComponent`函数会对更多的字符进行编码。在大多数情况下，我们都应该使用`encodeURIComponent

`函数来编码URL的组成部分。

下面是一个`encodeURIComponent`函数的例子：

```javascript
const query = '/Hello World!';
console.log(encodeURIComponent(query)); // %2FHello%20World%21
```

在这个例子中，`encodeURIComponent`函数将`/`和空格字符都编码了，因为这些字符在URL的查询参数中都是不合法的。

## 4. 总结

总的来说，当我们需要编码完整的URL时，应该使用`encodeURI`函数；而当我们需要编码URL的组成部分，比如查询参数，应该使用`encodeURIComponent`函数。不再推荐使用`escape`函数，因为它不能正确处理所有的字符。

理解和掌握这些函数的用法和区别对于正确处理URL编码问题来说是非常重要的。