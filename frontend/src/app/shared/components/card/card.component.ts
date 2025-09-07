import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Lang = 'zh' | 'en';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() lang: Lang = 'zh';
  @Input() title!: { zh: string; en: string } | string;
  @Input() summary?: { zh: string; en: string } | string;
  @Input() image?: string | { src: string; alt: { zh: string; en: string } };
  @Input() date?: string;               // YYYY-MM-DD
  @Input() tags?: string[];
  @Input() link?: string;               // routerLink 或外链

  private imageError = false;

  getTitle(): string {
    if (typeof this.title === 'string') {
      return this.title;
    }
    return this.lang === 'zh' ? this.title.zh : this.title.en;
  }

  getSummary(): string {
    if (!this.summary) {
      return '';
    }
    if (typeof this.summary === 'string') {
      return this.summary;
    }
    return this.lang === 'zh' ? this.summary.zh : this.summary.en;
  }

  getImageSrc(): string {
    if (this.imageError || !this.image) {
      return 'assets/images/placeholder.webp';
    }
    if (typeof this.image === 'string') {
      return this.image;
    }
    return this.image.src;
  }

  onImageError(event: any): void {
    this.imageError = true;
    event.target.src = 'assets/images/placeholder.webp';
  }

  getLinkText(): string {
    if (this.link?.includes('/blog/')) {
      return this.lang === 'zh' ? '阅读全文 →' : 'Read More →';
    } else if (this.link?.includes('/timeline')) {
      return this.lang === 'zh' ? '了解更多 →' : 'Learn More →';
    } else {
      return this.lang === 'zh' ? '了解更多 →' : 'Learn More →';
    }
  }
}
