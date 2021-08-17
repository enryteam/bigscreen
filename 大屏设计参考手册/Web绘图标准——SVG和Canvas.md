- [Web绘图标准—SVG和Canvas](https://blog.csdn.net/Ocean111best/article/details/105007650)

# Web 绘图标准

在前端绘图中，我们常见的有位图和矢量图这两种，其实有点类似我们 GIS 中的栅格图和矢量图

**位图：**通常我们谈论的图片(如 png、jpg 等格式)绝大多数都是位图。位图又叫栅格图像，无论位图采用何种压缩算法，它本质就是点阵，它对于图像本身更具普适性，无论图像的形状如何，都可以很容易分解为一个二维的点阵，更大的图，或者更高的分辨率，只是需要更密集的点阵而已。位图放大会失真，变模糊。位图一般占存储空间较小。可以认为位图是一个一个格子组成。

**矢量图：**矢量图是使用点、线段或者多边形等基于数学方程的几何形状来表示的图像。将一个复杂图像使用矢量的方式来表达，显然要比位图要困难得多，但是矢量图可以无损放大，即放大不会失真或扭曲，因为它的本质是一组基于数学方程的几何形状的集合。并且图像越大，就越能比相应的位图节约空间，因为矢量图的大小和实际图像大小无关。倘若再采用独立的压缩算法进行压缩，矢量图可以基于文本压缩，从而获得很大的压缩比。

在目前项目中，后端通过读取数据库中的数据同步或异步生成不同维度的数据，前端则通过统一的 API 根据用户需求获取相应的数据，并在浏览器中绘制图像。

我们较常听到的 Web 绘图标准包括 VML、SVG 和 Canvas，其中 VML 是微软最初参与制定的标准，一直以来只有 IE 等少数浏览器支持，从 2012 年的 IE 10 开始它逐渐被废弃了。剩下的 SVG 和 Canvas 有一定的互补性，且如今都非常流行。

# 一、SVG

SVG 即 Scalable Vector Graphics，可缩放矢量图形。它是基于可扩展标记语言(XML)，用于描述二维矢量图形的一种图形格式。SVG 是由 W3C 制定，是一个开放标准。

SVG 格式和前面提到的 VML 一样，支持脚本，容易被搜索引擎索引。SVG 可以嵌入外部对象，比如文字、PNG、JPG，也可以嵌入外部的 SVG。它在移动设备上存在两个子版本，分别叫做 SVG Basic 和 SVG Tiny。

SVG 支持三种格式的图形：矢量图形、栅格图像和文本。所以说 SVG 并不是一个矢量图的简单表示规范，而是尝试把矢量图、位图和文字统一起来的标准。如建立下面一个 SVG 小例子，可以命名为 example.svg，可以用文本编辑器打开，输入如下内容：


```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300">
  <rect x="60" y="60" width="200" height="200" fill="red" stroke="black" stroke-width="2px" />
</svg>
```

上述代码中：第一行指明 XML 的版本和编码；第二行是一个 svg 的根节点，指明了协议和版本号，图像画布的大小（300×300），其中只包含一个矩形（rect），这个矩形的起始位置是（x,y），宽和高都为 200，填充为红色，描边线宽 2px、黑色。用 Chrome 打开这个文件，得到的结果如下：

![img](https://img-blog.csdnimg.cn/20200321120640800.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09jZWFuMTExYmVzdA==,size_16,color_FFFFFF,t_70)

也可以建立一个 HTML 文件，如 svg.html，加上 html 标签，并拷贝上述 example.svg 中的 svg 标签到这个 HTML 文件中，如下所示：

```html
<!DOCTYPE html>
<html>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300">
    <rect x="60" y="60" width="200" height="200" fill="red" stroke="black" stroke-width="2px" />
  </svg>
</body>
</html>
```

用 Chrome 打开这个文件可以查看到这个红色方块，且放到图像也没有模糊和失真，说明了它确实是矢量图。

打开 Chrome 的开发者工具，在 Console 中输入：

$("svg>rect").setAttribute("fill", "green");

则矢量图从红色变绿色了。这充分说明，svg就是普普通通的 HTML 标签，它可以响应 JavaScript 的控制。如下图所示：

![img](https://img-blog.csdnimg.cn/20200321121306416.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09jZWFuMTExYmVzdA==,size_16,color_FFFFFF,t_70)

# 二、Canvas

Canvas 标签是 HTML5 的标签之一，标签可以定义一片区域，允许 JavaScript 动态渲染图像。它绘制的是位图，即放大会失真。新建一个 canvas.html 文件，输入如下内容：

```html
<!DOCTYPE html>
<html>
<body>
  <canvas width="300" height="300"></canvas>
  <script type="text/javascript">
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    ctx.rect(60,60,200,200);
    
    ctx.fillStyle = 'RED';
    ctx.fill();
 
    ctx.strokeStyle = 'BLACK';
    ctx.stroke();
  </script>
</body>
</html>
```

上述代码是获取到 canvas 节点以后，获取一个 2D 上下文，接着设置好矩形的位置和大小，分别进行填充和描线的操作。接着使用 Chrome 打开，结果和上面 SVG 的例子是一样的。且不断进行放大，图像会失真模糊，如下图所示：

![img](https://img-blog.csdnimg.cn/20200321122238811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09jZWFuMTExYmVzdA==,size_16,color_FFFFFF,t_70)

对比上面的 SVG，我们发现 SVG 和 Canvas 有很多不同。canvas 没有任何 DOM 结构，只有一个单独的 <canvas>，而 SVG 里面有 <rect> DOM结构。

# 三、总结

总的来说，SVG 是 HTML 标签原生支持的，因此就可以使用这种声明式的语言来描述图片，它更加直观、形象、具体，每一个图形组成的 DOM 都可以很方便地绑定和用户交互的事件。这种在渲染技术通过提供一套完整的图像绘制模型来实现的方式叫做 Retained Mode。

Canvas 则是由 JavaScript 的命令式的语言对既定 API 的调用来完成图像的绘制。canvas 标签的内部，并没有任何 DOM 结构，这让它无法使用传统的 DOM 对象绑定的方式来和图像内部的元素进行互动，但它更直接、可编程性强，在浏览器内存中不需要为了图形维护一棵巨大的 DOM 树，这也让它在遇到大量的密集对象时，拥有更高的渲染性能。这种在渲染技术上通过直接调用图形对象的绘制命令接口来实现的方式叫做 Immediate Mode。



- SVG 和 Canvas 的对比可以参加：SVG vs canvas: how to choose：https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/gg193983%28v=vs.85%29
- [点击前往 SVG vs canvas: how to choose](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/gg193983%28v=vs.85%29)