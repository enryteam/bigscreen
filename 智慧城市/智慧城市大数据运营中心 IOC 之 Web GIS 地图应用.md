- [智慧城市大数据运营中心 IOC 之 Web GIS 地图应用](https://zhuanlan.zhihu.com/p/363956860)



## **前言**

IOC（Intelligent Operations  Center）——智慧城市智能运营中心就是智慧城市的大脑，是建立在各个智慧应用系统之上的系统。通过对政府各职能部门的业务信息共享与整合，聚焦城市运行监测、分析决策、可视化指挥、应急管理等环节，对人口统计、民生服务、信访举报、产业经济、突发事件等一系列综合指标进行有效监控，并围绕网格化管理、综合执法、环境卫生、园林绿化等重点领域，提升城市运行管理水平和突发事件的处置效率。打造智慧市政、智慧城管、智慧社区等智慧型城市。

**HT for Web GIS** 产品的定位在于运用产品强大的可视化技术，将地理信息系统（Geographic Information  System，GIS）的数据进行丰富的可视化展示。以城市为基础，对城市各类基础设施数据以更加多样化形式进行可视化展示；将 GIS  数据和云计算、大数据、物联网等技术相结合，构建真正的数字经济，数字城市，数字中国；以时空为基础，通过可视化分析技术，对城市的规划、布局、分析和决策提供技术支撑，推进城市数字化转换和建设。

![img](https://pic3.zhimg.com/80/v2-8b91e3bc16355fef36d0be2f8a02f666_720w.jpg)


**图扑软件（Hightopo）**总部正位于美丽的鹭岛厦门，厦门是一个集文化、生态、旅游、高新技术于一身的美丽城市，并被誉为“国家生态园林城市”、“中国人的海上花园”。智慧城市智能运营中心（IOC）案例以厦门为基点，使用 Hightopo 的 2D、 3D 和 GIS 可视化技术进行搭建。市面上的 GIS 系统常见的是基于 ArcGIS API for  JavaScript、百度地图API、高德地图 API 、Cesium、Mapbox、Leaflet、Openlayers 等技术进行实现。HT for Web GIS 产品支持对不同地图瓦片服务或数据、航拍倾斜摄影实景的 3DTiles 格式数据以及城市建筑群等不同的 GIS  数据的加载，同时，结合 HT 矢量、BIM 数据轻量化、三维视频融合以及2D 和 3D 的无缝融合等技术优势，在 GIS 系统中对海量的 POI 数据、交通流量数据、规划数据，现状数据等进行多样化的可视化展示。HT for Web GIS 产品颠覆传统的 GIS 系统的开发，让 2D  GIS 系统和 3D GIS 系统的开发变得更加便捷，数据更加直观，展现更加多样化。

![img](https://pic1.zhimg.com/80/v2-b3e2af16d4e16e2c1d0a69908475f924_720w.jpg)



## **效果展示**

IOC 智慧城市智能运营中心大屏结合 GIS 地图，以城市地图为背景，辅以左右两侧 2D 面板进行展示。分别从城市综合、生态文明、社会治理、文化旅游四个方面对整座城市进行运营整合，全方位掌控城市运行状况，及时做出运营策略调整。

其中对于城市建筑模型，如果直接采用地图供应商提供的白模，展示效果相对普通，因此还需要通过烘焙 AO  贴图来增加模型之间的阴影关系。其次建筑群作为一个模型不可逐一进行处理，制作过程中难免容易崩溃，因此需要将模型一分为多来分开处理。最终将分出来的每个区块都会附带一个较大的 AO 贴图，再对 AO 贴图进行烘焙，就需要对模型进行展UV，最终完成城市级建筑群建模工作。

<video class="ztext-gif GifPlayer-gif2mp4" src="https://vdn1.vzuu.com/SD/d729166e-9a98-11eb-a2d6-da476058c233.mp4?disable_local_cache=1&amp;auth_key=1620890122-0-0-58fa7e942eca49c342001a2c2c25ba94&amp;f=mp4&amp;bu=pico&amp;expiration=1620890122&amp;v=hw" data-thumbnail="https://pic1.zhimg.com/v2-820ea75af63c53dfd669aa3ba9d05234_b.jpg" poster="https://pic1.zhimg.com/v2-820ea75af63c53dfd669aa3ba9d05234_b.jpg" data-size="normal" preload="metadata" loop="" playsinline=""></video>

![img](https://pic1.zhimg.com/v2-820ea75af63c53dfd669aa3ba9d05234_b.jpg)



##    **系统分析**

**城市综合管理可视化**
通过对接城市行政系统数据库，来实现以下数据展示：
**人口统计与增长趋势**
对接统计局系统，通过三年人口数量与增长趋势可以清晰的展示城市人口数量与构成。通过折线图可以对比不同年份的人口增长趋势，结合地图上的人口密度散点图，可以分析未来人口发展及分布趋势。

![img](https://pic3.zhimg.com/v2-22f0b7543a5aed0f82d79cfb11c33482_b.jpg)




**民生服务**
对接信访系统和效能系统，关注城市内民生服务及信访举报两个领域，通过事件数量和处理率来体现政府部门的办事效率，对于提升城市管理效能、提升监管力度和行政效率有明显的促进作用。

![img](https://pic2.zhimg.com/80/v2-fdfe7f92abe09b3ac7485245759e673d_720w.jpg)


**生态环境监测**
对接气象系统，通过对气象环境、污染指数等数据，结合生态文明可视化界面，可保持对生态环境的监测并在必要的时刻及时采取生态反应措施。

![img](https://pic3.zhimg.com/v2-a3bac11981bce2b059df2b10184de30e_b.jpg)




**产业经济分析**
对接税务系统，将城市主要经济产值、产业结构等数据进行多维度监测分析，全方位体现城市产业经济运行态势，为未来城市经济规划、产业结构调整等提供决策方向。

![img](https://pic3.zhimg.com/v2-de51d675eec0893e626dd9fd6132bbfe_b.jpg)




**紧急事件处理趋势**
可以随时调取对应突发事件的视频监控，并能实时显示在城市地图上。为城市应急管理的预防、准备、响应、恢复等阶段工作提供高效的数据支持，提升决策人员对事故、自然灾害的处置效率。

![img](https://pic3.zhimg.com/v2-ce14901a18207e0d8ab3190fe53faece_b.jpg)




 
**生态管理可视化**
通过与气象局、水务局、矿产局进行数据联动，实现以下功能：
**生态信息展示**
监控近期天气情况，AQI指标，水资源及其他可开采资源，整合气象、空气质量、地质灾害、水源安全、降水面积、矿产资源等信息资源，对城市生态环境进行实时监测与可视分析。相对于传统管理上信息庞杂且无法融合交流，导致数据毫无规律可循的痛点，我们可以从根本上打破信息壁垒，为管理者解决突出环境问题提供科学的决策依据，增强生态保护力度。

![img](https://pic4.zhimg.com/80/v2-9ba3afd2fb68c4416fc5bdbfc014bdd7_720w.jpg)


**生态预警**
界面还展示了台风路径图的实时动画并且提供了实时信息交互功能，HT 的 3D 引擎支持画面的动态矢量数据，客户只需要轻轻点击路径图，便可以获取实时台风动态信息。在此基础上还可以调取应急指挥知识库，选择合适的方案进行部署。

![img](https://pic3.zhimg.com/v2-7a1128712cdbb1d27845b912b89052c2_b.jpg)



![img](https://pic4.zhimg.com/80/v2-22c8cfe189f5b228de22412cdd658aab_720w.jpg)


 
**安防可视化**
对接公安系统、消防系统、医疗系统，全方面支持对城市公共安全各领域运行态势进行实时监测与可视分析。为雪亮工程、天网工程、公安数字运维、社区安全管理等行业提供可视化管理工具。

**出警情况**
直观展示包括案件数量、案件种类、完成数量、出警类型在内的实时数据，同时能够查看各区域不同出警力量执行的任务，可以大幅度提高指挥调度效率、增强处置突发事件的能力和水平。

![img](https://pic3.zhimg.com/80/v2-f206bcaae8bc59cc5d8b4edafa7157f6_720w.jpg)


**综合执法**
横向打通公安，消防数据的同时，把执法综合情况反映在数据面板里，并对案件数量进行趋势分析。帮助管理者更好的对接共享数据，维护社会稳定。

![img](https://pic3.zhimg.com/v2-223395075dca14c2d087080a70ddb6f2_b.jpg)




**交通状况**
通过交通系统，可实时展示高峰车速情况，同步预测未来时间内的交通拥堵情况。在违章事故方面，加入了多画面视频监控系统以及实时调取事件周边监控视频功能，帮助管理者对重点人员、车辆、告警事件等治安要素进行可视化监测。

<video class="ztext-gif GifPlayer-gif2mp4" src="https://vdn1.vzuu.com/SD/f9d641dc-9b6a-11eb-ba99-160bd3dbd470.mp4?disable_local_cache=1&amp;auth_key=1620890143-0-0-b19423d8b01fe197778c68d79d044ec8&amp;f=mp4&amp;bu=pico&amp;expiration=1620890143&amp;v=hw" data-thumbnail="https://pic3.zhimg.com/v2-7975da50ffc3fd431b7352ff900b38a2_b.jpg" poster="https://pic3.zhimg.com/v2-7975da50ffc3fd431b7352ff900b38a2_b.jpg" data-size="normal" preload="metadata" loop="" playsinline=""></video>

![img](https://pic3.zhimg.com/v2-7975da50ffc3fd431b7352ff900b38a2_b.jpg)




 
**文旅可视化**
厦门作为一座旅游城市，在397.84平方千米的岛面积上拥有着丰富的旅游资源，需要不断调整服务策略和引导游客。通过对接旅游部门系统数据，可以实现以下功能：
**旅游资源分布**
通过对不同景点、不同种类的旅游资源统计，可以帮助城市运营中心更好的合理优化资源分布，缓解旅游服务压力，提供更好的旅游服务质量。

![img](https://pic4.zhimg.com/80/v2-cf7e372723591ee5b3da35ea174b1357_720w.jpg)


**旅游经济分析**
实时展示景点消费情况及消费倾向分析，可以更好的优化当前的旅游商业结构，并提供用于预测未来旅游发展趋势的基础数据。

![img](https://pic3.zhimg.com/80/v2-62fc82c8ea8665d7aeff6d809b18083a_720w.jpg)


**游客统计**
通过年、月、周客流量的统计以及日客流量的实时统计，全方面展示城市各区域景点客流量发展态势，并与历年及全国发展趋势对比，找出可以发展和优化的措施，成为城市旅游文化发展的决策依据。

![img](https://pic2.zhimg.com/80/v2-84995bef2299fdf8a541307136ec7d15_720w.jpg)

<video class="ztext-gif GifPlayer-gif2mp4" src="https://vdn1.vzuu.com/SD/d7b075dc-9a98-11eb-95a9-ae2b259d78a4.mp4?disable_local_cache=1&amp;auth_key=1620890144-0-0-9cb7e5eb34c37796aa5c44d71974d7d9&amp;f=mp4&amp;bu=pico&amp;expiration=1620890144&amp;v=hw" data-thumbnail="https://pic1.zhimg.com/v2-9d4fe9e5dfbf379b10df52b1ddf467f8_b.jpg" poster="https://pic1.zhimg.com/v2-9d4fe9e5dfbf379b10df52b1ddf467f8_b.jpg" data-size="normal" preload="metadata" loop="" playsinline=""></video>

![img](https://pic1.zhimg.com/v2-9d4fe9e5dfbf379b10df52b1ddf467f8_b.jpg)




**游客人脸搜索**
提供了人脸搜索功能，在此之上对游客数量按男女老少进行监测与可视分析。有效保证游客安全的同时，也为城市治安管理提供了坚实基础。

![img](https://pic1.zhimg.com/v2-8303b297adca7af04824fbe697974f24_b.jpg)




**实现价值**
IOC 智慧城市智能运行中心以城市数字基础设施、通过数据汇聚和分析，结合 GIS  地图的可视化展现形式，以生态化的服务为运营模式，利用“实时、全样、精准”的城市数据建立全程在线、全域覆盖、实时反馈的“城市运行态势地图”，从而快速有效的感知、预警、调度、处置全市网络安全风险，提高管理决策的科学性和精准性，提升管理效率和应急响应能力，助力城市的数字化转型和数字经济发展。

HT for Web GIS 产品意在于解决用户 GIS 类项目的实现，减少用户对 GIS 的学习和投入成本。结合 HT for Web  强大的可视化引擎技术，实现不同的地图瓦片数据、倾斜摄影实景、三维精细化人工建模模型、POI 等数据的叠加展示；结合 HT for Web BIM 产品，实现 BIM 模型和 GIS 结合的可视化展现；结合 HT for Web 三维视频融合产品，实现 GIS  场景中的实时视频融合展示。HT for Web GIS 产品让 GIS  数据的可视化展示形式更加丰富，更加清晰直观，让即使不清楚具体业务的人也能一眼看懂数据意义。