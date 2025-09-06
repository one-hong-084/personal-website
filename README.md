# 个人网站项目

这是一个基于 Angular 的个人网站项目，展示个人作品、博客文章和时间线。

## 项目结构

```
personal-website/
├── frontend/                 # Angular 前端应用
│   ├── src/                 # 源代码
│   │   ├── app/            # 应用主模块
│   │   │   ├── features/   # 功能模块
│   │   │   ├── pages/      # 页面组件
│   │   │   └── shared/     # 共享组件和服务
│   │   └── assets/         # 静态资源
│   ├── public/             # 公共资源
│   └── package.json        # 依赖配置
├── .gitignore              # Git 忽略文件
└── README.md              # 项目说明
```

## 技术栈

- **前端框架**: Angular 18+
- **样式**: CSS3
- **构建工具**: Angular CLI
- **包管理**: npm

## 功能特性

- 🏠 **首页**: Hero 区域和精选内容展示
- 👨‍💻 **关于我**: 个人介绍、技能展示和时间线预览
- 📝 **博客**: 文章列表和详情页面
- 🚀 **项目**: 项目作品展示
- 📅 **时间线**: 个人发展历程
- 🌐 **多语言**: 支持中英文切换

## 开发环境设置

### 前置要求

- Node.js 18+ 
- npm 9+

### 安装依赖

```bash
cd frontend
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 `http://localhost:4200` 启动

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist/` 目录

## 项目配置

### 内容管理

项目使用 JSON 文件进行内容管理：

- `src/assets/content/` - 页面内容配置
- `src/assets/data/` - 数据文件（文章、项目、时间线）

### 多语言支持

通过 `i18n.service.ts` 实现中英文切换，内容文件包含 `zh` 和 `en` 两个语言版本。

## 部署

项目支持多种部署方式：

1. **静态托管**: 构建后可直接部署到任何静态文件服务器
2. **GitHub Pages**: 使用 GitHub Actions 自动部署
3. **Vercel/Netlify**: 支持现代前端托管平台

## 开发指南

### 添加新页面

1. 在 `src/app/features/` 下创建新的功能模块
2. 在 `src/app/app.routes.ts` 中添加路由配置
3. 更新导航菜单

### 添加新内容

1. 在相应的 JSON 文件中添加内容
2. 确保包含中英文版本
3. 更新对应的服务文件

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub: [@one-hong-084](https://github.com/one-hong-084)
- 邮箱: [您的邮箱]

---

*最后更新: 2025年1月*
