# 面试官：介绍一下grid网格布局

![image](https://github.com/linwu-hi/code-interview/assets/137023716/977123a4-0aa8-4a15-9e7d-97817108302d)

在现代Web开发中，页面布局是一个重要的任务，它决定了网页的结构和外观。在CSS中，我们通常使用Flexbox（弹性盒布局）和Grid布局来实现不同的布局需求。本文将重点介绍Grid布局，它是一种二维布局方式，通过纵横相交的网格线来创建布局结构，能够同时处理行和列，使得布局更加灵活多样。

## 一、什么是Grid布局？

Grid布局，又称为网格布局，是一种强大而灵活的CSS布局模型。它通过在容器中创建一个二维网格，将页面划分为多个主要区域，并定义这些区域的大小、位置、层次等关系。与Flexbox的一维布局不同，Grid布局是一个二维布局，它在排列元素时不仅考虑主轴方向（水平或垂直），还考虑交叉轴方向，使得布局更加精确和直观。

要使用Grid布局，我们需要将元素的`display`属性设置为`grid`或`inline-grid`，这样浏览器渲染引擎会启动网格布局算法。

```css
.container {
  display: grid;
  /* 或者 display: inline-grid; */
}
```


## 二、Grid布局的属性

Grid布局的属性分为容器属性和项目属性两类，我们逐一介绍。

### 容器属性：

1. `grid-template-columns`和`grid-template-rows`: 用于设置网格的列宽和行高。可以指定固定的宽度和高度，也可以使用`repeat()`函数简化重复的值。

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

2. `grid-gap`：设置行间距和列间距的简写属性，相当于同时设置`grid-row-gap`和`grid-column-gap`。

```css
.container {
  display: grid;
  grid-gap: 10px 20px;
}
```

3. `grid-template-areas`：用于定义网格区域，将多个单元格组成一个命名区域，通过字符串来表示。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-template-areas: 
    'a b c'
    'd e f';
}
```

![Grid-template-areas示意图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fc9195b6577452aae00b4a062c4d40b~tplv-k3u1fbpfcp-zoom-1.image)

4. `grid-auto-flow`：用于指定项目的放置顺序，默认为`row`，即先行后列。可以设置为`column`，使项目先列后行排列。

```css
.container {
  display: grid;
  grid-auto-flow: column;
}
```

5. `justify-items`和`align-items`：分别用于设置单元格内容在水平和垂直方向上的对齐方式。

```css
.item {
  justify-items: center; /* left, right, stretch */
  align-items: center; /* start, end, stretch */
}
```

### 项目属性：

1. `grid-column-start`和`grid-column-end`：用于指定项目左边框和右边框所在的垂直网格线，定义项目在列方向的位置。

```css
.item {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

2. `grid-row-start`和`grid-row-end`：用于指定项目上边框和下边框所在的水平网格线，定义项目在行方向的位置。

```css
.item {
  grid-row-start: 1;
  grid-row-end: 3;
}
```

3. `grid-area`：用于指定项目放置在哪一个命名区域。

```css
.item {
  grid-area: e;
}
```

4. `justify-self`和`align-self`：分别用于设置单元格内容在水平和垂直方向上的对齐方式，只作用于单个项目。

```css
.item {
  justify-self: center; /* left, right, stretch */
  align-self: center; /* start, end, stretch */
}
```

## 三、Grid布局的应用场景

Grid布局在实际开发中有着广

泛的应用场景，以下是一些常见的应用示例：

1. 网格导航：通过网格布局可以轻松实现水平或垂直的网格导航菜单，使得导航链接整齐排列。

![网格导航示例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c61ce99442249b7bc7760b5ac365d54~tplv-k3u1fbpfcp-zoom-1.image)

2. 居中布局：通过设置容器的对齐方式和项目的自身对齐方式，可以实现内容在容器中的水平和垂直居中，使得布局更加美观。

![居中布局示例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd96d21fab1a4ec0941186f3c81e2942~tplv-k3u1fbpfcp-zoom-1.image)

3. 多栏布局：Grid布局可以轻松实现多栏布局，使得栏目的宽度相等或不等，适用于新闻列表、产品展示等场景。

![多栏布局示例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f65286498e840b38da247b836825e41~tplv-k3u1fbpfcp-zoom-1.image)

4. 自适应布局：通过设置项目的放大和缩小比例，可以实现根据容器大小自适应调整布局，使得页面在不同屏幕尺寸下都能良好展示。

5. 等高布局：通过设置项目的高度为`1fr`，可以使得多个项目拥有相同的高度，适用于类似产品卡片的布局。

6. 响应式布局：在移动设备和桌面端的响应式布局中，Grid布局表现优秀，可以在不同尺寸的屏幕上显示不同的布局，提升用户体验。

## 四、兼容性和使用建议

目前，Grid布局在现代主流浏览器中具有良好的兼容性，支持情况如下：

![Grid布局兼容性](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/651fbe7895a4498e952b2a38b6ae2a8f~tplv-k3u1fbpfcp-zoom-1.image)

综上所述，Grid布局是一种功能强大、灵活多样的布局方式，它在Web开发中有着广泛的应用场景。在实际开发中，我们可以灵活运用Grid布局来实现各种复杂的页面布局需求，提升网页的可读性和用户体验。然而，考虑到兼容性问题，建议在使用Grid布局时，及时做好兼容性处理，以确保网页在不同浏览器中都能正确显示和运行。希望本文能帮助读者深入理解Grid布局，并在实际项目中应用得心应手！