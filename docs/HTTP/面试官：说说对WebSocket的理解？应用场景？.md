# 面试官：说说对WebSocket的理解？应用场景？

## 一、WebSocket 是什么？

WebSocket 是一种网络传输协议，位于 OSI 模型的应用层。它允许在单个 TCP 连接上进行全双工通信，实现了客户端与服务器之间的双向数据传输，从而能更好地节省服务器资源和带宽，并达到实时通信的效果。

在传统的 HTTP 协议中，客户端需要不断发送请求以获取服务器的响应数据，这种轮询的方式对服务器和网络资源产生较大的负担。而 WebSocket 的出现改变了这种情况，通过一次握手连接，客户端和服务器之间可以创建持久性的连接，随时进行双向数据交换，大大降低了通信的延迟和资源消耗。

## 二、WebSocket 的特点

### 1. 全双工通信

WebSocket 支持全双工通信，允许数据在两个方向上同时传输，客户端和服务器可以实时地发送和接收数据，达到瞬时同步的效果。

### 2. 二进制帧结构

WebSocket 采用二进制帧结构，与 HTTP 完全不兼容。相比起 HTTP/2，WebSocket 更侧重于实时通信，不像 HTTP/2 那样定义流和多路复用等特性，因为 WebSocket 自身已经是全双工通信，不需要这些特性。

### 3. 协议名和握手

WebSocket 引入了 ws 和 wss 分别代表明文和密文的 WebSocket 协议，且默认端口使用 80 或 443，与 HTTP 的端口一致。在连接建立时，客户端需要发送协议升级请求并进行握手，服务端返回接受握手请求的响应，完成连接的建立。

### 4. 优点

- 较少的控制开销：相对于 HTTP 每次请求都需要携带完整的头部，WebSocket 的数据包头部较小，减少了控制开销。
- 更强的实时性：相对于 HTTP 请求需要等待客户端发起请求才能响应，WebSocket 实现了持久连接，实时性更好。
- 保持连接状态：WebSocket 连接建立后，客户端和服务器之间可以保持连接状态，省去了每次请求都要携带身份验证的过程。
- 更好的二进制支持：WebSocket 定义了二进制帧，更好地处理二进制内容。
- 支持扩展：用户可以扩展 WebSocket 协议，实现自定义的子协议，增加了灵活性。
- 更好的压缩效果：在适当的扩展支持下，WebSocket 可以沿用之前内容的上下文，在传递类似的数据时，可以显著提高压缩率。

## 三、应用场景

WebSocket 的实时通信特性使得它在许多场景下得到广泛应用：

- 弹幕：在直播或视频网站中，用户可以实时发送弹幕评论，通过 WebSocket 实时将弹幕内容显示在视频画面上。
- 媒体聊天：实现在线即时通信功能，例如在线聊天室、即时消息应用等。
- 协同编辑：多个用户可以同时编辑同一个文档，实现实时协作编辑。
- 基于位置的应用：例如地图应用中，实时显示用户的位置信息。
- 体育实况更新：在体育比赛进行时，实时更新比分和比赛进展。
- 股票基金报价实时更新：股票和基金价格实时更新，及时推送最新的行情信息。

总的来说，WebSocket 在需要实时通信和即时更新数据的场景下都能发挥出很大的作用，提升用户体验，减少服务器压力，逐渐成为现代 Web 应用中不可或缺的技术之一。

## 使用

当使用 WebSocket 进行通信时，通常需要在客户端和服务器端分别实现 WebSocket 的功能。下面我将给出一个简单的示例，展示如何使用 JavaScript 在客户端建立 WebSocket 连接并发送和接收消息，以及如何在 Python 中创建一个简单的 WebSocket 服务器。

### 在客户端使用 WebSocket

```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Client</title>
</head>
<body>
  <input type="text" id="messageInput" placeholder="Enter your message">
  <button onclick="sendMessage()">Send</button>
  <div id="messageArea"></div>

  <script>
    const socket = new WebSocket("ws://your_server_address");

    socket.onopen = function() {
      showMessage("WebSocket connection established.");
    };

    socket.onmessage = function(event) {
      showMessage("Received: " + event.data);
    };

    function sendMessage() {
      const messageInput = document.getElementById("messageInput");
      const message = messageInput.value;
      socket.send(message);
      showMessage("Sent: " + message);
      messageInput.value = "";
    }

    function showMessage(message) {
      const messageArea = document.getElementById("messageArea");
      messageArea.innerHTML += "<p>" + message + "</p>";
    }
  </script>
</body>
</html>
```

在上面的示例中，首先我们创建了一个 WebSocket 对象，传入服务器地址 `ws://your_server_address`。然后，我们监听 WebSocket 的 `onopen` 事件，当连接建立时会显示连接已经建立。监听 `onmessage` 事件，当接收到消息时会在页面上显示收到的消息。通过输入框和按钮可以向服务器发送消息，点击按钮时调用 `sendMessage()` 函数将输入框中的消息发送给服务器，并将消息显示在页面上。

### 在服务器端使用 WebSocket

在 Node.js 中，你可以使用 `ws` 模块来创建 WebSocket 服务器。这个模块提供了 WebSocket 的实现，使你能够轻松地创建一个 WebSocket 服务器，并与客户端进行实时通信。

下面是使用 Node.js 创建 WebSocket 服务器的代码示例：

首先，确保你已经安装了 `ws` 模块：

```bash
npm install ws
```

然后，创建一个 Node.js 文件 `websocket_server.js`，包含以下代码：

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received: ' + message);
    // 在这里你可以对接收到的消息进行处理
    // 例如，将消息广播给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send('Broadcast: ' + message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server started at ws://localhost:8080');
```

在上面的代码中，我们使用 `ws` 模块创建了一个 WebSocket 服务器，监听在本地地址 `ws://localhost:8080` 上。当有客户端连接到服务器时，`connection` 事件会被触发，并创建一个 WebSocket 实例 `ws`。然后，我们监听 `message` 事件，当客户端发送消息时会收到该事件，并在控制台上显示接收到的消息。在这个示例中，我们将收到的消息广播给所有连接的客户端，除了发送消息的客户端本身。

运行 WebSocket 服务器：

```bash
node websocket_server.js
```

现在，服务器已经在本地地址 `ws://localhost:8080` 上运行，客户端可以连接到该地址，并与服务器进行实时通信。


## 参考文献

- [WebSocket - Wikipedia](https://en.wikipedia.org/wiki/WebSocket)
- [9 Killer Uses for WebSockets - Open Source China](https://www.oschina.net/translate/9-killer-uses-for-websockets)