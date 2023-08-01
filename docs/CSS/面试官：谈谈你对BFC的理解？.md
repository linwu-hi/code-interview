# 面试官：谈谈你对BFC的理解？

![image](https://github.com/linwu-hi/code-interview/assets/137023716/692504e8-6a26-4e82-9884-e41f9f170c33)

## 一、是什么

在页面布局的过程中，我们经常会遇到一些奇怪的情况，比如元素的高度消失了、两栏布局无法自适应、元素间距出现异常等等。这些问题往往是由于元素之间相互影响而导致的。在这里，就涉及到了BFC（Block Formatting Context）的概念。

BFC（块级格式化上下文）是页面中一块独立的渲染区域，具有一套独立的渲染规则：

- 内部的盒子会在垂直方向上一个接一个地放置。
- 同一个BFC的相邻盒子的margin会发生重叠，与方向无关。
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此。
- BFC的区域不会与float的元素区域重叠。
- 计算BFC的高度时，浮动子元素也参与计算。
- BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。

BFC的目的是形成一个相对于外界完全独立的空间，使内部的子元素不会影响到外部的元素。

## 二、触发条件

触发BFC的条件包含但不限于：

- 根元素，即HTML元素
- 浮动元素：float值为left、right
- overflow值不为visible，为auto、scroll、hidden
- display的值为inline-block、inline-table、table-cell、table-caption、flex、inline-flex、grid、inline-grid
- position的值为absolute或fixed

## 三、应用场景

利用BFC的特性，我们可以在以下场景中应用BFC：

### 1. 防止margin重叠（塌陷）

```html
<style>
    .container {
        overflow: hidden; /* 触发BFC */
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align: center;
        margin: 100px;
    }
</style>
<body>
    <div class="container">
        <p>Haha</p>
    </div>
    <p>Hehe</p>
</body>
```

在没有触发BFC的情况下，两个p元素之间的距离为100px，发生了margin重叠（塌陷）。通过给包含p元素的容器触发BFC，两个p元素不再属于同一个BFC，从而避免了margin重叠。

### 2. 清除内部浮动

```html
<style>
    .parent {
        border: 5px solid #fcc;
        width: 300px;
    }
 
    .child {
        border: 5px solid #f66;
        width: 100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="parent">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

通过触发parent元素生成BFC，可以清除内部浮动的影响，从而使parent元素具有高度。

```css
.parent {
    overflow: hidden; /* 触发BFC */
}
```

### 3. 自适应多栏布局

```html
<style>
    .wrapper {
        width: 300px;
    }
 
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;
    }
</style>
<body>
    <div class="wrapper">
        <div class="aside"></div>
        <div class="main"></div>
    </div>
</body>
```

在不触发BFC的情况下，.main元素的左边会与.wrapper元素的左边界相接触，从而无法实现两栏布局。

通过触发.main元素生成BFC，.main元素的左边不再与.wrapper元素的左边界相接触，从而实现自适应多栏布局。

```css
.main {
    overflow: hidden; /* 触发BFC */
}
```

### 小结

通过上面的例子，我们可以看到BFC的实际效果就是形成一个页面中的独立容器，里面的子元素不影响外部的元素，反之亦然。BFC为我们解决了很多布局上的问题，提供了更灵活和可靠的布局手段。

## 参考文献

- [MDN Web Docs - Block Formatting Context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
- [BFC原理剖析 - Github笔记](https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md)