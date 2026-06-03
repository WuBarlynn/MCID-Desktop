# MCID-Desktop (MCID 工具箱)

本项目是一个 Minecraft 游戏数据工具箱桌面客户端，由 **暮风径羽** 授权进行二次开发。

本项目的所有信息数据（包括方块物品 ID、实体数据、群系、结构、图片素材等）均来源于：
[https://mcid.lingningyu.cn/](https://mcid.lingningyu.cn/)

## ✨ 功能特点

- **全离线可用**：所有图片素材及数据资源均已下载到本地。
- **浅色与暗色模式**：内置舒适的深色护眼模式，以及高对比度的浅色极简模式。
- **原生像素级渲染**：所有游戏内的物品和实体图片强制使用硬边缘像素渲染，无论多大都绝对清晰。
- **全动态生物图**：实体与生物的图片全面采用原版的 GIF 动画显示。
- **一键复制指令**：不同版本的 ID 和实体、粒子、附魔等均提供一键生成与复制对应指令（支持 `/give`, `/summon` 等）的功能。
- **轻量级便携版**：无需安装，直接运行打包好的单体 `.exe` 文件即可。



## 💻 下载和使用

前往release界面下载编译好的版本。



## 🚀 编译与开发

该项目使用 [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) 构建前端页面，使用 [Tauri](https://tauri.app/) 构建跨平台桌面应用核心。

### 1. 准备环境
- 安装 [Node.js](https://nodejs.org/)
- 安装 [Rust](https://www.rust-lang.org/) 以及 Tauri 所需的相关环境（C++ Build Tools）。

### 2. 安装依赖
```bash
cd client
npm install
```

### 3. 本地开发预览
```bash
cd client
npm run tauri dev
```

### 4. 编译打包便携版 EXE
```bash
cd client
npm run tauri build
```
编译完成后的可执行文件将位于：`client/src-tauri/target/release/mcid.exe`。

## 📜 开源协议

本项目采用 **MIT License**。

---
*Minecraft is a trademark of Mojang Synergies AB. This project is not affiliated with or endorsed by Mojang.*
