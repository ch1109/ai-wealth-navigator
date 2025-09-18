# AI 财富领航员 - 部署指南

## 项目概述

这是一个基于 Next.js 的静态演示网站，展示 AI 财富领航员的核心功能和特性。网站采用 Apple 风格设计，支持中日双语，具有响应式布局和流畅的动画效果。

## 技术栈

- **框架**: Next.js 15.5.3 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **图标**: Lucide React
- **构建**: 静态导出 (Static Export)

## 本地开发

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 本地预览静态文件
```bash
npm run preview
# 或者
npx serve out -p 3001
```

## 部署选项

### 1. Vercel (推荐)
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 2. Netlify
1. 将项目推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 构建设置:
   - Build command: `npm run build`
   - Publish directory: `out`

### 3. GitHub Pages
1. 在 `next.config.ts` 中取消注释并设置 `basePath` 和 `assetPrefix`
2. 构建项目: `npm run build`
3. 将 `out` 目录内容推送到 `gh-pages` 分支

### 4. 自定义服务器
将 `out` 目录中的所有文件上传到任何静态文件服务器（如 Apache、Nginx）

## 项目结构

```
ai-wealth-navigator/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 组件
│   ├── data/               # 内容数据
│   ├── hooks/              # 自定义 Hooks
│   └── types/              # TypeScript 类型定义
├── public/                 # 静态资源
├── out/                    # 构建输出 (静态文件)
└── ...配置文件
```

## 核心功能

### 1. 多语言支持
- 中文/日文切换
- 本地存储语言偏好
- 平滑过渡动画

### 2. 响应式设计
- 移动端优先
- 断点: 768px (md), 1024px (lg)
- 触摸设备优化

### 3. 交互式演示
- 5步自动播放演示
- 手动控制和进度指示
- 动态图表和数据可视化

### 4. 性能优化
- 静态导出
- 代码分割
- 图片优化
- 懒加载

## 自定义配置

### 修改内容
编辑 `src/data/content.ts` 文件来更新网站内容。

### 修改样式
在 `src/app/globals.css` 中调整设计系统变量。

### 添加新组件
在 `src/components/` 目录中创建新组件，并在 `src/types/index.ts` 中定义相关类型。

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能指标

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## 故障排除

### 构建错误
1. 检查 Node.js 版本 (需要 18+)
2. 清除缓存: `rm -rf .next node_modules && npm install`
3. 检查 TypeScript 错误: `npm run type-check`

### 样式问题
1. 确保 Tailwind CSS 配置正确
2. 检查 CSS 变量定义
3. 验证响应式断点

### 动画问题
1. 检查 Framer Motion 版本兼容性
2. 验证动画配置
3. 测试不同设备性能

## 联系信息

如有问题或建议，请联系开发团队。
