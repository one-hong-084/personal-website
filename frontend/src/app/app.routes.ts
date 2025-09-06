import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page'; // 首页直接用组件（非懒加载）

export const routes: Routes = [
  // 首页：Home
  { path: '', component: HomePage, pathMatch: 'full' },

  // 其余全部懒加载（features 下的 standalone 组件）
  { path: 'about',    loadComponent: () => import('./features/about/about.page').then(m => m.AboutPage) },
  { path: 'timeline', loadComponent: () => import('./features/timeline/timeline.page').then(m => m.TimelinePage) },
  { path: 'projects', loadComponent: () => import('./features/projects/projects.page').then(m => m.ProjectsPage) },
  { path: 'blog',     loadComponent: () => import('./features/blog/blog.page').then(m => m.BlogPage) },
  // 博客详情页（关键补充）
  { path: 'blog/:slug', loadComponent: () => import('./features/blog/blog-detail.page').then(m => m.BlogDetailPage) },
  { path: 'contact',  loadComponent: () => import('./features/contact/contact.page').then(m => m.ContactPage) },
  { path: 'gallery',  loadComponent: () => import('./features/gallery/gallery.page').then(m => m.GalleryPage) },
  { path: 'newshub',  loadComponent: () => import('./features/newshub/newshub.page').then(m => m.NewshubPage) },

  // 兜底：未匹配路由回首页
  { path: '**', redirectTo: '' }
];
