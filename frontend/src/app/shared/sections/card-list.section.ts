import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { I18nService } from '../i18n.service';

export type CardItem = {
  title: string | { zh: string; en: string };
  summary?: string | { zh: string; en: string };
  tags?: string[];
  date?: string;         // ISO 字符串，如 2025-09-01
  link?: string;         // 可选：外链或详情路由
  image?: string | { src: string; alt: string | { zh: string; en: string } };        // 图片地址
};

@Component({
  standalone: true,
  selector: 'app-card-list',
  imports: [NgFor, NgIf],
  template: `
    <section class="container section">
      <h2 *ngIf="title">{{ getLocalizedText(title) }}</h2>
      <div *ngIf="items?.length; else empty">
        <div *ngFor="let it of visibleItems" class="card">
          <img *ngIf="getImageSrc(it.image)" 
               [src]="getImageSrc(it.image)" 
               [alt]="getImageAlt(it.image, it.title)" 
               class="card-img" />
          <div class="card-body">
            <div class="card-header">
              <h3>{{ getLocalizedText(it.title) }}</h3>
              <small class="muted" *ngIf="it.date">{{ it.date }}</small>
            </div>
            <p class="muted" *ngIf="it.summary">{{ getLocalizedText(it.summary) }}</p>
            <div *ngIf="it.tags?.length" class="tags">
              <span class="tag" *ngFor="let t of it.tags">{{ t }}</span>
            </div>
            <div *ngIf="it.link">
              <a [href]="it.link" target="_blank" rel="noopener">{{ getLocalizedText({ zh: '查看详情 →', en: 'View Details →' }) }}</a>
            </div>
          </div>
        </div>

        <button *ngIf="hasMore" (click)="loadMore()">{{ getLocalizedText({ zh: '加载更多', en: 'Load More' }) }}</button>
      </div>
      <ng-template #empty>
        <p class="muted">{{ getLocalizedText({ zh: '(暂无内容)', en: '(No content)' }) }}</p>
      </ng-template>
    </section>
  `,
  styles: [`
    .card {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      margin: 16px 0;
      background: var(--bg);
      transition: transform .2s, box-shadow .2s;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
    .card-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    .card-body {
      padding: 16px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 8px;
    }
    .tags { margin-top: 8px; }
    button {
      margin: 16px auto;
      display: block;
      background: var(--brand);
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      color: var(--fg);
      cursor: pointer;
    }
    button:hover {
      background: var(--brand-strong);
    }
  `]
})
export class CardListSectionComponent {
  @Input() title?: string | { zh: string; en: string };
  @Input() items: CardItem[] = [];

  visibleItems: CardItem[] = [];
  private pageSize = 3;
  private currentPage = 0;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.loadMore();
  }

  get hasMore() {
    return this.items.length > this.visibleItems.length;
  }

  getLocalizedText(text: string | { zh: string; en: string } | undefined): string {
    if (!text) return '';
    return this.i18nService.getLocalizedContent(text);
  }

  getImageSrc(image: string | { src: string; alt: string | { zh: string; en: string } } | undefined): string | null {
    if (!image) return null;
    if (typeof image === 'string') return image;
    return image.src;
  }

  getImageAlt(image: string | { src: string; alt: string | { zh: string; en: string } } | undefined, title: string | { zh: string; en: string }): string {
    if (!image) return this.getLocalizedText(title);
    if (typeof image === 'string') return this.getLocalizedText(title);
    return this.getLocalizedText(image.alt);
  }

  loadMore() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.visibleItems = [...this.visibleItems, ...this.items.slice(start, end)];
    this.currentPage++;
  }
}
