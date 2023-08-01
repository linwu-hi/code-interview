# 原型和原型链

JavaScript是一门支持面向对象编程的语言，它的函数是第一公民，同时也拥有类的概念。不同于传统的基于类的继承，JavaScript的类和继承是基于原型链模型的。在ES2015/ES6中引入了`class`关键字，但其本质仍然是基于原型链的语法糖。


![proto](/assets/proto.jpeg)

## 原型（Prototype）

原型（Prototype）是JavaScript中对象的一个特殊属性，它用于实现属性和方法的继承。在JavaScript中，每个对象都有一个原型属性，它指向另一个对象，这个对象被称为原型对象。通过原型链，对象可以从原型对象继承属性和方法。

原型的概念可以用以下方式解释：每个JavaScript对象都是基于一个构造函数创建的，构造函数是对象的模板或蓝图。在创建对象时，构造函数会创建一个关联的原型对象，对象通过原型链继承原型对象上的属性和方法。原型对象是一个普通的JavaScript对象，它具有自己的属性和方法。

让我们以一个示例来说明原型的概念和作用：

```javascript
// 构造函数
function Person(name) {
  this.name = name;
}

// 在原型对象上添加方法
Person.prototype.sayHello = function() {
  console.log("Hello, my name is " + this.name);
};

// 创建实例
var person1 = new Person("John");
var person2 = new Person("Alice");

// 调用原型对象上的方法
person1.sayHello(); // 输出: "Hello, my name is John"
person2.sayHello(); // 输出: "Hello, my name is Alice"
```

在这个示例中，我们定义了一个构造函数`Person`，它有一个`name`属性。然后，我们通过给原型对象`Person.prototype`添加一个`sayHello`方法，使得所有通过`Person`构造函数创建的实例都可以访问该方法。我们创建了两个实例`person1`和`person2`，并分别调用了`sayHello`方法。

原型的重要性体现在以下几个方面：

1. 继承：原型链允许对象继承其原型对象上的属性和方法。通过原型链，子对象可以访问和复用父对象的属性和方法，实现了继承的概念。

2. 代码复用和共享：通过将方法和属性定义在原型对象上，可以实现多个对象共享相同的方法和属性。这样可以节省内存空间，提高性能，同时也方便了代码的维护和扩展。

下面是一个简单的原型链示意图：

```
           +----------------------+
           |     Object.prototype |
           +----------------------+
                      ^
                      |
           +----------------------+
           |    Constructor.prototype |
           +----------------------+
                      ^
                      |
           +----------------------+
           |       Object instance |
           +----------------------+
```

在这个示意图中，`Object.prototype`是所有对象的原型，`Constructor.prototype`是构造函数的原型，`Object instance`是基于构造函数创建的对象实例。


## 构造函数和原型对象

构造函数是用于创建对象的特殊函数。它通常以大写字母开头，通过使用 `new` 关键字来调用构造函数，我们可以创建一个新的对象实例。构造函数在创建对象时可以执行一些初始化操作，并为对象添加属性和方法。

原型对象是构造函数的一个属性，它是一个普通的 JavaScript 对象。原型对象上的属性和方法可以被通过构造函数创建的对象实例所继承。通过将属性和方法定义在原型对象上，我们可以实现方法的共享和节省内存空间。

让我们通过一个示例来说明构造函数和原型对象的概念以及如何使用它们来创建对象和共享方法：

```javascript
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 在原型对象上添加方法
Person.prototype.sayHello = function() {
  console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
};

// 创建对象实例
var person1 = new Person("John", 25);
var person2 = new Person("Alice", 30);

// 调用共享的方法
person1.sayHello(); // 输出: "Hello, my name is John and I am 25 years old."
person2.sayHello(); // 输出: "Hello, my name is Alice and I am 30 years old."
```

在这个示例中，我们定义了一个构造函数 `Person`，它接受 `name` 和 `age` 参数，并将它们赋值给对象的属性。然后，我们通过在原型对象 `Person.prototype` 上添加一个方法 `sayHello`，使得通过 `Person` 构造函数创建的对象实例可以访问该方法。我们创建了两个对象实例 `person1` 和 `person2`，并分别调用了共享的方法 `sayHello`。

以下是一个简单的构造函数和原型对象的流程图示意图：

```
+----------------------------------+
|           Constructor            |
|                                  |
|  +--------------------------+    |
|  |   Prototype Properties   |    |
|  +--------------------------+    |
|                                  |
|  - Property: name               |
|  - Property: age                |
|  - Method: sayHello()           |
|                                  |
+----------------------------------+
        ^
        |
        |
+----------------------------------+
|          Object Instance         |
|                                  |
|  +--------------------------+    |
|  |     Instance Properties   |    |
|  +--------------------------+    |
|                                  |
|  - Property: name               |
|  - Property: age                |
|                                  |
+----------------------------------+
```

在这个示意图中，构造函数和原型对象之间存在关联，构造函数拥有原型对象的引用。通过构造函数，我们可以创建对象实例，并且这些实例可以通过原型对象继承原型上的属性和方法。

## 原型链

原型链是 JavaScript 中对象之间通过原型链接起来的机制，用于实现属性和方法的继承。它是由一系列的原型对象组成，每个对象都有一个指向其原型对象的连接，形成了一条链式结构。

原型链的概念可以通过以下方式解释：在 JavaScript 中，每个对象都有一个内部属性 `[[Prototype]](__proto__)`，它指向该对象的原型。当我们访问一个对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript 引擎会自动沿着原型链向上查找，直到找到匹配的属性或方法或者到达原型链的顶部（`Object.prototype`）。

让我们通过一个示例来说明原型链的概念和工作原理：

```javascript
// 父对象构造函数
function Parent() {
  this.name = "Parent";
}

// 在父对象原型上添加方法
Parent.prototype.sayHello = function() {
  console.log("Hello, I am " + this.name);
};

// 子对象构造函数
function Child() {
  this.name = "Child";
}

// 通过原型继承建立子对象和父对象的连接
Child.prototype = Object.create(Parent.prototype);

// 创建子对象实例
var child = new Child();

// 调用父对象原型上的方法
child.sayHello(); // 输出: "Hello, I am Child"
```

在这个示例中，我们定义了一个父对象构造函数 `Parent`，它有一个属性 `name` 和一个原型方法 `sayHello`。然后，我们定义了一个子对象构造函数 `Child`，它也有一个属性 `name`。通过 `Object.create()` 方法，我们将子对象的原型连接到父对象的原型上，建立了子对象和父对象之间的原型链关系。最后，我们创建了子对象实例 `child`，并调用了父对象原型上的方法 `sayHello`。

以下是一个简单的原型链示意图：

```
           +----------------------+
           |     Object.prototype |
           +----------------------+
                      ^
                      |
           +----------------------+
           |   Parent.prototype    |
           +----------------------+
                      ^
                      |
           +----------------------+
           |   Child.prototype     |
           +----------------------+
                      ^
                      |
           +----------------------+
           |     Child instance    |
           +----------------------+
```

<!-- ![原型链]('https://github.com/linnou/front_interview/raw/master/_images/原型链.jpeg') -->


在这个示意图中，`Object.prototype` 是所有对象的顶层原型，`Parent.prototype` 是父对象的原型，`Child.prototype` 是子对象的原型，`Child instance` 是基于子对象构造函数创建的对象实例。

原型链的重要性体现在以下几个方面：

1. 继承：原型链允许对象通过继承获取其他对象的属性和方法。子对象可以继承父对象的属性和方法，而父对象又可以继承更上层对象的属性和方法，以此类推。

2. 代码复用和共享：通过原型链，我们可以在原型对象

上定义方法和属性，从而实现多个对象之间的方法共享和代码复用。这样可以节省内存空间，提高性能，并减少代码的冗余。

3. 扩展和修改：通过在原型对象上添加新的方法和属性，我们可以在整个原型链中的所有对象实例上访问和使用这些扩展。这样可以方便地对现有对象进行功能扩展和修改。


## 原型继承

原型继承是一种通过继承原型对象来创建新对象的方式。在 JavaScript 中，我们可以使用多种方式实现原型继承。原型继承的概念是通过将一个对象作为另一个对象的原型来实现继承，从而使新对象可以共享原型对象的属性和方法。


### 1. 对象字面量和 `Object.create()`：可以使用字面量对象定义属性和方法，并使用 `Object.create()` 方法创建一个新对象，并将其原型设置为现有对象的原型。
```javascript
var parent = {
  name: "Parent",
  sayHello: function() {
    console.log("Hello, I am " + this.name);
  }
};

var child = Object.create(parent);
child.name = "Child";
```

### 2. 构造函数和 `Object.create()`：可以使用构造函数定义对象，并通过 `Object.create()` 方法将新对象的原型连接到现有对象的原型上。
```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function() {
  console.log("Hello, I am " + this.name);
};

function Child(name) {
  Parent.call(this, name);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var child = new Child("Child");
```

### 3. 构造函数和 `new` 关键字：可以使用构造函数创建对象实例，并使用 `new` 关键字进行实例化。

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function() {
  console.log("Hello, I am " + this.name);
};

function Child(name) {
  Parent.call(this, name);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child = new Child("Child");
```

### 4. 寄生组合继承

寄生组合继承是一种常用的原型继承方式，结合了构造函数继承和原型链继承的优点，避免了原型链中不必要的属性复制和方法重复定义的问题。这种方式先通过构造函数继承属性，然后通过设置原型链继承方法。


```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function() {
  console.log("Hello, I am " + this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var child = new Child("Child", 10);
```

以上是常用的原型继承实现方式，每种方式都有其特点和适用场景。根据具体的需求和代码结构，可以选择最适合的方式来实现原型继承。


## 参考资料

- [MDN Web Docs - Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [MDN Web Docs - Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript.info - Prototypal Inheritance](https://javascript.info/prototype-inheritance)
- [Eloquent JavaScript - Object-Oriented Programming](https://eloquentjavascript.net/06_object.html)