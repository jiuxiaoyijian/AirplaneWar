# ✈️ 飞机大战 - AirplaneWar

经典的飞机大战小游戏，基于 HTML5 Canvas 实现，支持手机触屏和电脑鼠标操作。

**在线体验：https://jiuxiaoyijian.github.io/AirplaneWar/**

## 玩法

- **手机**：触摸屏幕拖动飞机闪避敌机
- **电脑**：按住鼠标左键拖动飞机
- 飞机自动发射子弹，击中敌机得分
- 碰到敌机则游戏结束，点击「重新开始」再来一局

## 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 Canvas | 2D 渲染引擎 |
| ES Modules | 原生模块化，零构建依赖 |
| Web Audio | 背景音乐与音效 |
| GitHub Pages | 静态站点托管 |
| GitHub Actions | 自动部署 |

## 项目结构

```
AirplaneWar/
├── index.html              # 入口页面
├── game.js                 # 游戏启动入口
├── js/
│   ├── main.js             # 游戏主循环
│   ├── databus.js          # 全局状态管理
│   ├── base/
│   │   ├── sprite.js       # 精灵基类
│   │   ├── animation.js    # 帧动画
│   │   └── pool.js         # 对象池
│   ├── player/
│   │   ├── index.js        # 玩家飞机
│   │   └── bullet.js       # 子弹
│   ├── npc/
│   │   └── enemy.js        # 敌机
│   ├── runtime/
│   │   ├── background.js   # 滚动背景
│   │   ├── gameinfo.js     # 分数/结束界面
│   │   └── music.js        # 音效管理
│   └── libs/
│       ├── web-adapter.js  # 浏览器适配层
│       └── symbol.js       # Symbol polyfill
├── images/                 # 游戏图片资源
├── audio/                  # 音效文件
└── .github/workflows/      # CI/CD 部署配置
```

## 本地运行

由于使用了 ES Modules，需要通过 HTTP 服务器启动（不能直接打开 html 文件）：

```bash
# 方式一：使用 Node.js
npx serve .

# 方式二：使用 Python
python -m http.server 8080
```

然后访问 `http://localhost:3000`（serve）或 `http://localhost:8080`（Python）。

## 部署

项目已配置 GitHub Actions，推送到 `master` 分支即自动部署到 GitHub Pages。

## 致谢

原始项目基于微信小游戏官方示例，已改造为浏览器原生 Web 版本。
