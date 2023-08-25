# 面试官：说说flexbox(弹性盒布局模型)

![image](https://github.com/linwu-hi/code-interview/assets/137023716/1896fd60-95c7-4de6-a800-24eba8a89df5)


Flex布局(Flexible Box Layout)是一种用于定义容器内部元素布局方式的CSS3布局模型。它可以使元素具有弹性,让元素在容器内自动排列,简化了元素的定位。

## Flex布局的基本概念

采用Flex布局的元素可分为容器(container)和项目(item)。

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div> 
  <div class="item">3</div>
</div>
```

容器通过设置`display: flex`生成,项目默认沿主轴排列。

## 容器属性

### flex-direction

决定主轴方向,即项目排列方向。

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

- row:主轴为水平,起点在左端 
- row-reverse:主轴为水平,起点在右端
- column:主轴为垂直,起点在上沿
- column-reverse:主轴为垂直,起点在下沿

![image](https://github.com/linwu-hi/code-interview/assets/137023716/4e8cd301-7079-4925-89f5-42c210bfe8a9)

### flex-wrap 

定义容器内项目是否可换行。

```css
.container{
  flex-wrap: nowrap | wrap | wrap-reverse; 
}
```

- nowrap:不换行
- wrap:换行,第一行在下方
- wrap-reverse:换行,第一行在上方

### justify-content

定义项目在主轴上的对齐方式。

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;  
}
```

- flex-start: 左对齐
- flex-end: 右对齐  
- center: 居中
- space-between: 两端对齐,项目之间间隔相等
- space-around: 每个项目两侧间隔相等

![image](https://github.com/linwu-hi/code-interview/assets/137023716/9a7e3845-5c63-44e2-a8bd-92a5e9353c2d)

### align-items 

定义项目在交叉轴上如何对齐。

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start:交叉轴起点对齐
- flex-end:交叉轴终点对齐  
- center:交叉轴中点对齐
- baseline:项目第一行文字基线对齐
- stretch:项目高度撑满容器

![image](https://github.com/linwu-hi/code-interview/assets/137023716/31af9a79-a39e-4642-9d60-476eb4affd8f)
## 项目属性 

### order

定义项目的排列顺序。

```css
.item {
  order: <integer>;
}
```

数值越小,排列越靠前。

### flex-grow

定义项目的放大比例。

```css 
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目都为1,则它们将等分剩余空间。

### flex-shrink

定义了项目的缩小比例。 

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果空间不足,该项目将按比例缩小。

### align-self

单个项目与其他项目对齐方式不同。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## 总结

Flex布局提供了强大的容器属性,可以方便地控制项目布局、对齐和顺序,是实现响应式布局的首选方式。