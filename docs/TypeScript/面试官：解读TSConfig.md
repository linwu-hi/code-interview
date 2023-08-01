# 解读TSConfig

TypeScript 配置文件（tsconfig.json）是用于配置 TypeScript 项目的重要文件。它允许开发者自定义 TypeScript 编译器的行为，指定编译选项、文件包含与排除规则、输出目录等。通过合理配置 tsconfig.json，我们可以根据项目需求进行灵活的 TypeScript 编译设置。

本文将全面解读 tsconfig.json 的各个配置选项，并提供一些常见的使用场景和示例代码，以及封装定制化自己`tsconfig.base`配置


## 创建和基本配置

要使用 TypeScript 配置文件，我们首先需要创建一个名为 `tsconfig.json` 的文件，并将其放置在项目的根目录下。

下面是一个基本的 tsconfig.json 配置示例：

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist"
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

在上述示例中，我们使用 `compilerOptions` 配置选项指定了 TypeScript 编译器的选项。其中：

- `"target": "es6"` 指定编译的目标 JavaScript 版本为 ES6。
- `"module": "commonjs"` 指定模块的生成方式为 CommonJS。
- `"outDir": "dist"` 指定输出目录为 "dist"。

同时，我们使用 `include` 和 `exclude` 配置选项分别指定了需要编译的源文件的包含规则和排除规则。

## compilerOptions

`compilerOptions` 是 tsconfig.json 中最重要的配置选项之一，它允许我们指定 TypeScript 编译器的各种行为和设置。以下是一些常用的 compilerOptions 配置选项：

### target

`target` 选项指定了编译后的 JavaScript 代码所要遵循的 ECMAScript 标准。常见的选项包括 `"es5"`、`"es6"`、`"es2015"`、`"es2016"` 等。

```json
"compilerOptions": {
  "target": "es6"
}
```

### module

`module` 选项用于指定生成的模块化代码的模块系统。常见的选项包括 `"commonjs"`、`"amd"`、`"es2015"`、`"system"` 等。

```json
"compilerOptions": {
  "module": "commonjs"
}
```

### outDir

`outDir` 选项指定了编译输出的目录路径。

```json
"compilerOptions": {
  "outDir": "dist"
}
```

### strict

`strict` 选项用于启用严格的类型检查和更严格的编码规范。

```json
"compilerOptions": {
  "strict": true
}
```

### lib

`lib` 选项用于指定 TypeScript 编译器可以使用的 JavaScript 标准库的列表。默认情况下，

TypeScript 编译器会根据目标版本自动选择合适的库。

```json
"compilerOptions": {
  "lib": ["es6", "dom"]
}
```

### sourceMap

`sourceMap` 选项用于生成与源代码对应的源映射文件（.map 文件），以便在调试过程中可以将编译后的 JavaScript 代码映射回原始 TypeScript 代码。

```json
"compilerOptions": {
  "sourceMap": true
}
```

### paths

`paths` 选项用于配置模块解析时的路径映射，可以帮助我们简化模块导入的路径。

```json
"compilerOptions": {
  "paths": {
    "@/*": ["src/*"]
  }
}
```

### allowJs

`allowJs` 选项允许在 TypeScript 项目中引入 JavaScript 文件，使得我们可以混合使用 TypeScript 和 JavaScript。

```json
"compilerOptions": {
  "allowJs": true
}
```


### esModuleInterop 和 allowSyntheticDefaultImports

`esModuleInterop` 属性用于提供对 ES 模块的兼容性支持。当我们在 TypeScript 项目中引入 CommonJS 模块时，可以通过设置 `esModuleInterop` 为 `true` 来避免引入时的错误。

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es6", "dom"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}

```

在上面的示例中，我们设置了 `esModuleInterop` 和 `allowSyntheticDefaultImports` 属性为 true，以支持对 ES 模块的兼容性导入。



更多的 `compilerOptions` 配置选项可以参考 TypeScript 官方文档：[Compiler Options](https://www.typescriptlang.org/tsconfig#compiler-options).

## include 和 exclude

`include` 和 `exclude` 配置选项用于指定哪些文件应该包含在编译过程中，以及哪些文件应该排除在编译过程之外。

`include` 是一个文件或者文件夹的数组，用于指定需要编译的文件或文件夹的路径模式。

```json
"include": [
  "src/**/*.ts",
  "test/**/*.ts"
]
```

`exclude` 是一个文件或者文件夹的数组，用于指定需要排除的文件或文件夹的路径模式。

```json
"exclude": [
  "node_modules",
  "dist"
]
```

在上述示例中，我们将 `src` 文件夹和 `test` 文件夹下的所有 TypeScript 文件包含在编译过程中，并排除了 `node_modules` 文件夹和 `dist` 文件夹。

## 文件引用和 composite

`files` 配置选项允许我们显式列出需要编译的文件路径。

```json
"files": [
  "src/main.ts",
  "src/utils.ts"
]
```

`composite` 配置选项用于启用 TypeScript 的项目引用功能，允许我们将一个 TypeScript 项目作为另一个项目的依赖。

```json
"composite": true
```

## declaration

`declaration` 配置选项用于生成声明文件（.d.ts 文件），它们包含了编译后 JavaScript 代码的类型信息。

```json
"declaration": true
```

## tsconfig.json 继承

TypeScript 支持通过 `extends` 配置选项从其他的 tsconfig.json 文件中继承配置。

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

在上述示例中，我们通过 `extends` 指定了一个基础配置文件 `tsconfig.base.json`，然后在当前的 `tsconfig.json` 中添加了额外的编译选项和文件包含规则。


## 定制化tsconfig.base



制化tsconfig.base可以让我们在多个项目中共享和复用配置，提高开发效率。下面是一些步骤来封装自己的 TSConfig 为一个库：


首先，我们需要创建一个新的 TypeScript 项目作为我们的库项目。可以使用以下命令初始化一个新的项目：

```bash
$ mkdir my-tsconfig-lib
$ cd my-tsconfig-lib
$ npm init -y
```

### 2. 创建 tsconfig.json 文件

在项目根目录下创建一个名为 `tsconfig.json` 的文件，并将 TSConfig 的配置内容添加到其中。

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

这是一个示例的 TSConfig 配置，你可以根据自己的需求进行相应的修改。

### 3. 创建包入口文件

为了能够在其他项目中使用我们的库，我们需要创建一个入口文件来导出我们的 TSConfig。

在项目根目录下创建一个名为 `index.ts` 的文件，并添加以下代码：

```typescript
import * as tsconfig from './tsconfig.json';

export default tsconfig;
```

在上述代码中，我们将 `tsconfig.json` 导入为一个模块，并使用 `export default` 将其导出。

### 4. 构建和发布

现在我们可以使用 TypeScript 编译器将我们的代码构建为 JavaScript，以便在其他项目中使用。

首先，确保你已经在项目中安装了 TypeScript：

```bash
$ npm install typescript --save-dev
```

然后，在 `package.json` 中添加构建脚本：

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

最后，运行构建命令进行构建：

```bash
$ npm run build
```

构建完成后，我们的库文件

将位于 `dist` 目录下。

### 5. 发布到 NPM

要将我们的 TSConfig 封装为一个库，并使其可供其他项目使用，我们可以将其发布到 NPM。

首先，创建一个 NPM 账号，并登录到 NPM：

```bash
$ npm login
```

然后，在项目根目录下运行以下命令发布库：

```bash
$ npm publish
```

发布成功后，我们的 TSConfig 库就可以在其他项目中使用了。

### 6. 在其他项目中使用

在其他项目中使用我们的 TSConfig 库非常简单。首先，在目标项目中安装我们的库：

```bash
$ npm install my-tsconfig-lib --save-dev
```

然后，在目标项目的 `tsconfig.json` 文件中使用我们的 TSConfig：

```json
{
  "extends": "my-tsconfig-lib"
}
```

通过 `extends` 配置选项，我们可以继承和使用我们的 TSConfig。


## 总结

通过 tsconfig.json 文件，我们可以配置 TypeScript 编译器的行为，包括编译选项、文件包含与排除规则、输出目录等。合理配置 tsconfig.json 可以帮助我们根据项目需求进行灵活的 TypeScript 编译设置。

详细的 TypeScript 配置文件的参考信息可以在 TypeScript 官方文档中找到：[tsconfig.json](https://www.typescriptlang.org/tsconfig)