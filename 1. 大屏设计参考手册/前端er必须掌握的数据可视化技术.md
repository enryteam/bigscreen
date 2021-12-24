- [前端er必须掌握的数据可视化技术](https://www.cnblogs.com/powertoolsteam/p/15718655.html)

作为一名合格的社会人，我们每天都在工作、生活、学习中和数字打交道。小到量化的工作内容，大到具体的工作指标，车间生产、批发零售各行各业都充斥着大量数据。在互联网诞生之后，网络把我们紧紧相连，也让数据更为密集地汇聚。
 扯远了……当前，正在写月报的葡萄面对的是，后端发来铺天盖地的两万条数据。

![image-20211224235436087](https://gitee.com/er-huomeng/img/raw/master/img/image-20211224235436087.png)

这个数据能用吗？
 能用，但不是完全能用。
 毕竟做报告的时候，我们不能把两万条数据直接甩到领导的脸上，让他自己想办法看看。
 这时万一领导说，看看哪个省销量最多，我们岂不是就当场就抓瞎了。
 但是如果变成这样一张图：

![image-20211224235447384](https://gitee.com/er-huomeng/img/raw/master/img/image-20211224235447384.png)

就可以清晰明了地看出各个省份之间的销量差距了。
 拿着这张图，我们就可以秒回领导：浙江省、天津市、江西省位居销量前三。
 而领导也可以满意地拿着这张图向他的领导汇报。
 这样一个数据处理的过程，就叫做“数据可视化”，使我们能够对数据进行加工和处理。
 而对于一个优秀的前端而言，我们更加关注如何实现数据可视化。这里面涉及的知识领域其实很多，包括数据源整合、数据抽取、数据清洗、数据建模、数据可视化展示等等内容。
 本篇文章主要为大家介绍下在前端领域，作为前端开发的我们需要掌握哪些可视化技术，来帮助我们更好地实现数据可视化展示。

## 一、基础开发技术

### 1、SVG

SVG是一种XML语言，类似XHTML，可以用来绘制矢量图形。SVG可以通过定义必要的线和形状来创建一个图形，也可以修改已有的位图，或者将这两种方式结合起来创建图形。

以下是MDN上的一个例子：

```
<svg version="1.1" baseProfile="full" width="300" height="200" xmlns="http://www.w3.org/2000/svg"> <rect width="100%" height="100%" fill="red" /> <circle cx="150" cy="100" r="80" fill="green" /> <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text> </svg> 
```

绘制了一个矩形（rect标签）、圆圈（circle标签）和文字（text标签）。一般如果画布比较大，有缩放、平移等高频的交互的场景，常见的饼图、柱状图、流程图之类的开发，可以考虑使用 SVG 。关于SVG的具体使用教程可以移步文档：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial

### 2、Canvas

Canvas API 提供了一个通过JavaScript 和 HTML的元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等领域。

Canvas绘制的图形不会出现在DOM结构中，一般小画布、大数据量的场景适合用Canvas，性能更好。
 以下是一个简单例子：
 HTML部分：

```
<canvas id="canvas"></canvas> 
```

JavaScript代码部分：

```
const canvas = document.getElementById('canvas'); const ctx = canvas.getContext('2d'); ctx.fillStyle = 'green'; ctx.fillRect(10, 10, 150, 100); 
```

关于Canvas的具体使用教程可以移步文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial

### 3、WebGL

WebGL 使得在支持HTML 的 canvas 标签的浏览器中，不需要安装任何插件，便可以使用基于 OpenGL ES 2.0 的  API 在 canvas  中进行2D和3D渲染。如果您有一些3D绘制的需求，可以采用webGL方案。尤其是3d地图、3d地球等绘制都需要用到webGL技术。
 webGL是基于Canvas的绘图技术。要使用webGL进行3D渲染，首先得在页面中创建一个canvas元素，通过这个canvas元素来初始化WebGL上下文。其中细节大家可以移步文档使用学习：https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial

## 二、可视化组件和工具

### 1、ZRender

ZRender是一个轻量级的Canvas类库，是一个二维绘图引擎，它提供 Canvas、SVG、VML 多种渲染方式，并提供类 Dom 事件模型。同时，ZRender 也是 ECharts 的渲染器。
 使用ZRender并不复杂，我们需要引入相应的JavaScript文件，利用其所提供的API初始化一个Dom容器，在这个容器里绘制您所需要的图形。以下是一个简单例子，创建了一个圆心在[150，50]，半径为40的圆：

```
var circle = new zrender.Circle({ shape: { cx: 150, cy: 50, r: 40 }, style: { fill: 'none', stroke: '#F00' } }); zr.add(circle); 
```

关于更多图形的画法可以参考ZRender的官方文档 https://ecomfe.github.io/zrender-doc/public/
 在此不再赘述。

### 2、Echarts

如果需要做可视化方面的工作，那么你对Echarts一定不陌生。Echarts是百度开源的一个javaScript可视化图库，可以流畅地在  PC 和移动设备上运行，兼容当前绝大部分浏览器，底层依赖矢量图形库  ZRender，提供直观、交互丰富、可高度个性化定制的数据可视化图表。同时，Echarts的学习和使用也相对容易，通过几个简单的option配置项就可以很快地绘制出一个图表出来。比如一个折线图，只需要十来行配置搞定：

```
option = { xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, yAxis: { type: 'value' }, series: [ { data: [150, 230, 224, 218, 135, 147, 260], type: 'line' } ] }; 
```

除了2D图表，echarts也提供了Echarts-gl，它能实现对三维图表和地球的展示，这点其他开源库基本没有。虽然2D图也可以实现仿三维效果，但只有 Echarts-gl 是基于 WebGL 做的真三维，可以配置光照、材质、阴影，还有独家的后期特效等功能。
 关于Echarts的更多配置使用可以移步Echarts文档：https://echarts.apache.org/zh/option.html#title

除了Echarts官方提供的资源外，Echarts的资源社区Gallery才是真正的主力军。这个社区上有非常丰富的图表资源，都是用户个人上传的，还可以进行筛选查询，这些图表基本上可以满足绝大多数应用场景。

![image-20211224235519662](https://gitee.com/er-huomeng/img/raw/master/img/image-20211224235519662.png)

### 3、AntV

AntV 是一个数据可视化项目，也是一个团队，即蚂蚁集团的数据可视化团队。AntV  目前覆盖了统计图表、移动端图表、图可视化、地理可视化、2D 绘图引擎和智能可视化等多个领域，主要包含  G2栈、F2栈、G6栈、X6栈、L7栈、AVA 以及一套完整的图表使用和设计规范。

![image-20211224235530693](https://gitee.com/er-huomeng/img/raw/master/img/image-20211224235530693.png)

其中G2主要致力于通用图表库，用更简化的语法构建出各种各样的可交互统计图表。F2是一个专注于移动、开箱即用的可视化解决方案，完美支持 H5 环境同时兼容多种环境（node, 小程序，weex等）。L7 是一个基于 WebGL  的开源大规模地理空间数据可视分析开发框架。关于AntV的各类图表使用，大家可以去官网自行查询：https://antv.vision/zh

### 4、Wyn Enterprise

Wyn Enterprise 是一款强大的嵌入式数据可视化工具，提供了灵活的数据交互和探索分析能力，以及 OEM  白标集成的方式，全面满足行业应用软件的数据分析需求。它具备多源数据整合、报表设计、数据可视化、自助式BI分析、以及数据填报等功能，帮助用户挖掘数据的潜在价值，为管理者制定决策提供数据支撑。

![image-20211224235541605](https://gitee.com/er-huomeng/img/raw/master/img/image-20211224235541605.png)

https://www.grapecity.com.cn/solutions/wyn

### 5、D3

D3.js库是一个开源项目，作者是纽约时报的工程师。准确来说，D3.js实际是一个JavaScript函数库，不是图表库，比较适合于做数据可视化。D3有丰富的数学函数处理数据转换和物理计算，可以把数据和 HTML 结构或者 SVG 文档对应起来，这种特性让我们可以更方便的操作DOM绘制图表。它可以说是  “可视化界的jQuery”，因为D3的api和jQuery非常类似，可以看以下的例子：

```
d3.select('#chart') .selectAll("div") .data([4, 16, 23, 42]) .enter() .append("div") .style("height", (d)=> d + "px") 
```

如果只是想绘制常见图表，倒是没必要直接用 D3，可以看看那些基于 D3 的图表库，比如Ploty.js、nivo等。这里贴出d3的GitHub项目地址：https://github.com/d3/d3

### 6、Vega

使用Vega不需要写前端代码，它做到了只需要 JSON  就能完成所有图表相关的开发，包括数据的加载、转换、交互等。由于Vega致力于通过一些JSON配置项实现图表的绘制，导致在生成一些基础简单的图表时，也需要很多行的配置。比如最简单的柱状图就需要95行配置，所以它提供了更简明的语法Vega-Lite，用于快速生成可视化以支持分析。以下是一个柱状图的示例：

![image-20211224235550623](https://gitee.com/er-huomeng/img/raw/master/img/image-20211224235550623.png)

这里给大家贴出vega-lite的官网供大家学习：https://vega.github.io/vega-lite/

## 三、结语

到这里给大家介绍了几种比较热门的可视化技术或图库，以上介绍的都是可以免费使用的，当然市面上也有一些商业图表库，比如HighCharts、AnyChart、Wyn Enterprise、FusionCharts 等，大家有兴趣可以自行了解下。