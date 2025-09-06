import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from './services/language.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <nav class="nav">
      <div class="container nav-inner">
        <!-- ✅ 品牌 Logo：科技感文字 Logo，点击即可回首页 -->
        <a routerLink="/"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{ exact: true }"
           class="brand-logo">
          <span class="logo-text">XXlab</span>
        </a>


        <!-- 右侧导航链接 -->
        <a routerLink="/about" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '关于' : 'About' }}</a>
        <a routerLink="/timeline" routerLinkActive="active" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '时间线' : 'Timeline' }}</a>
        <a routerLink="/projects" routerLinkActive="active" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '项目' : 'Projects' }}</a>
        <a routerLink="/blog" routerLinkActive="active" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '博客' : 'Blog' }}</a>
        <a routerLink="/contact" routerLinkActive="active" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '联系' : 'Contact' }}</a>
        <a routerLink="/gallery" routerLinkActive="active" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '相册' : 'Gallery' }}</a>
        <a routerLink="/newshub" routerLinkActive="active" class="nav-link">{{ (lang.current$ | async) === 'zh' ? '新闻中心' : 'NewsHub' }}</a>

        <!-- 语言切换按钮 -->
        <button (click)="toggleLanguage()" class="language-btn" aria-label="切换语言">
          {{ (lang.current$ | async) === 'zh' ? 'English' : '中文' }}
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .nav {
      position: sticky; top: 0; z-index: 100;
      background: var(--nav-bg);
      border-bottom: 1px solid var(--border);
      backdrop-filter: saturate(150%) blur(10px);
      -webkit-backdrop-filter: saturate(150%) blur(10px);
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .nav-inner { display: flex; gap: 14px; align-items: center; }

    /* ✅ 品牌 Logo：科技感文字样式 */
    .brand-logo {
      display: flex;
      align-items: center;
      margin-right: 24px;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .logo-text {
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', monospace;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 2px;
      background: linear-gradient(135deg, #00d4ff 0%, #0099cc 25%, #0066ff 50%, #8b5cf6 75%, #ff6b6b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      transition: all 0.3s ease;
      text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
    }
    
    .logo-text::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #00d4ff 0%, #0099cc 25%, #0066ff 50%, #8b5cf6 75%, #ff6b6b 100%);
      opacity: 0;
      filter: blur(12px);
      transition: opacity 0.3s ease;
      z-index: -1;
    }
    
    .brand-logo:hover .logo-text::before {
      opacity: 0.6;
    }
    
    .brand-logo:hover .logo-text {
      transform: scale(1.08);
      text-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
    }


    .nav-link {
      padding: 12px 6px;
      color: var(--link-muted);
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: color .15s, border-color .15s;
      text-decoration: none;
    }
    .nav-link:hover { color: var(--brand); }
    .active {
      color: var(--brand) !important;
      border-bottom-color: var(--brand);
      font-weight: 600;
    }

    .language-btn {
      margin-left: auto;
      background: none; border: none; cursor: pointer;
      font-size: 14px; font-weight: 500;
      padding: 8px 12px; border-radius: 6px;
      color: var(--link-muted);
      transition: all .2s;
      border: 1px solid var(--border);
    }
    .language-btn:hover { 
      color: var(--brand); 
      border-color: var(--brand);
      background: rgba(14,165,233,0.05);
    }
  `]
})
export class NavbarComponent {
  constructor(public lang: LanguageService) {}

  toggleLanguage(): void {
    this.lang.toggle();
  }
}
