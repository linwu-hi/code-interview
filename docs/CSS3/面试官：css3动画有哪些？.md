# 面试官：CSS3动画有哪些？


## 一、是什么？

CSS动画（CSS Animations）是一种使用CSS来实现动画效果的技术，它允许通过对元素样式的逐步变化，从而产生平滑过渡的动画效果。

常见的动画效果有很多，例如平移、旋转、缩放等等，复杂的动画可以由多个简单动画组合而成。

CSS提供了多种实现动画的方式，包括：

*   Transition（过渡）：用于设置元素的样式过渡效果。
*   Transform（变形）：用于对元素进行旋转、缩放、移动或倾斜等变形操作。
*   Animation（动画）：用于自定义复杂的动画效果。

## 二、实现方式

### Transition 实现渐变动画

`Transition`通过定义元素属性的变化过程来实现动画效果，常用的属性有：

*   property：填写需要变化的CSS属性。
*   duration：完成过渡效果需要的时间，单位为秒（s）或毫秒（ms）。
*   timing-function：完成效果的速度曲线，可选值有`linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out`等。
*   delay：动画效果的延迟触发时间，单位为秒（s）或毫秒（ms）。

举个例子，实现鼠标移动上去时发生变化的动画效果：

```html
<style>
    .base {
        width: 100px;
        height: 100px;
        display: inline-block;
        background-color: #0EA9FF;
        border-width: 5px;
        border-style: solid;
        border-color: #5daf34;
        transition-property: width, height, background-color, border-width;
        transition-duration: 2s;
        transition-timing-function: ease-in;
        transition-delay: 500ms;
    }

    /*简写*/
    /*transition: all 2s ease-in 500ms;*/
    .base:hover {
        width: 200px;
        height: 200px;
        background-color: #5daf34;
        border-width: 10px;
        border-color: #3a8ee6;
    }
</style>
<div class="base"></div>
```

### Transform 转变动画

`Transform`用于对元素进行位移、缩放、旋转和倾斜等变换操作，一般与`Transition`结合使用实现动画效果。

`Transform`包含四个常用的变换功能：

*   translate：位移
*   scale：缩放
*   rotate：旋转
*   skew：倾斜

注意的是，`Transform`不支持`inline`元素，需要先将其设置为`block`。

举个例子，实现元素在鼠标悬停时的动画效果：

```html
<style>
    .base {
        width: 100px;
        height: 100px;
        display: inline-block;
        background-color: #0EA9FF;
        border-width: 5px;
        border-style: solid;
        border-color: #5daf34;
        transition-property: width, height, background-color, border-width;
        transition-duration: 2s;
        transition-timing-function: ease-in;
        transition-delay: 500ms;
    }

    .base2 {
        transform: none;
        transition-property: transform;
        transition-delay: 5ms;
    }

    .base2:hover {
        transform: scale(0.8) rotate(35deg) skew(5deg) translate(15px, 25px);
    }
</style>
<div class="base base2"></div>
```

在这个例子中，盒子会发生旋转、倾斜、平移和缩小的效果。

### Animation 实现自定义动画

`Animation`是一种用于实现自定义动画效果的属性，它是由8个子属性组成：

*   animation-name：指定`@keyframes`动画的名称。
*   animation-duration：指定动画完成一个周期所需要的时间，单位为秒（s）或毫秒（ms）。
*   animation-timing-function：指定动画计时函数，即动画的速度曲线。
*   animation-delay：指定动画延迟时间，即动画何时开始。
*   animation-iteration-count：指定动画播放的次数。
*   animation-direction：指定动画播放的方向。
*   animation-fill-mode：指定动画填充模式。
*   animation-play-state：指定动画播放状态，正在运行或暂停。

`CSS`动画通过定义一些关键帧，浏览器会根据计时函数插值计算出中间帧，从而形成动画效果。关键帧使用`@keyframes`来定义，可以使用`from`和`to`关键字或百分比来刻画动画生命周期。

举个例子，实现一个元素旋转一圈的动画效果：

```css
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 或者使用百分比刻画生命周期 */
/*
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
*/

.element {
    animation: rotate 2s;
}
```

## 三、总结

在本文中，我们介绍了CSS3中三种实现动画的方式：

*   `Transition`（过渡）：用于设置元素的样式过渡效果。
*   `Transform`（变形）：用于对元素进行旋转、缩放、移动或倾斜等变形操作。
*   `Animation`（动画）：用于自定义复杂

的动画效果。

每种方式在实现动画效果时有各自的特点和用途，具体应用时根据需求选择合适的方式来实现动画效果。

## 参考文献

*   [CSS3 动画与过渡](https://segmentfault.com/a/1190000022540857)
*   [CSS 动画 - 维基百科](https://zh.m.wikipedia.org/wiki/CSS%E5%8A%A8%E7%94%BB)
