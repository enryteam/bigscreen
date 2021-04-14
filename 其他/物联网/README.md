## 静态资源目录

### 目录结构
```
public
├── data                          // 服务器接口配置和模拟数据
│   ├── api-config.js             // 接口配置
│   ├── customer-count.json       // 模拟数据
│   ├── …
│   └── 目录说明.md
├── images                        // 静态图像资源，放置通过 video、img 等进行展示的资源
│   └── icons
│       ├── customer.svg
│       ├── meter.svg
│       └── …
├── js                            // 静态依赖资源
│   ├── echarts.min.js            // 百度 echarts 包
│   ├── …
│   └── 目录说明.md
├── favicon.ico
└── index.html                    // 浏览入口
```