import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container">
      <div class="loading-content">
        <div class="logo-container">
          <img src="assets/logo.png" alt="XX Lab Logo" class="logo" />
        </div>
        <div class="loading-text">加载中...</div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
    }

    .logo-container {
      width: 120px;
      height: 120px;
      margin: 0 auto 20px;
    }

    .logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
      animation: logoExpand 2s ease-out forwards;
    }

    .loading-text {
      color: var(--muted);
      font-size: 14px;
      font-weight: 500;
    }

    @keyframes logoExpand {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `]
})
export class LoadingComponent {
  constructor() {}
}
