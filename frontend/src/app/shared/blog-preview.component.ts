import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 关键：提供 routerLink 等指令
import { I18nService } from './i18n.service';

interface Blog {
  id: string;
  title: string | { zh: string; en: string };
  excerpt: string | { zh: string; en: string };
  slug: string;
  image?: { src: string; alt?: string | { zh: string; en: string } };
}

interface BlogPreviewInputs {
  title: string | { zh: string; en: string };
  items: Blog[];
}

@Component({
  selector: 'app-blog-preview',
  standalone: true,
  imports: [CommonModule, RouterModule], // 关键：兼容不同版本的 Angular
  template: `
    <section class="wrap">
      <h2>{{ getLocalizedText(inputs.title) }}</h2>
      <div class="grid">
        <article class="card" *ngFor="let b of inputs.items">
          <img *ngIf="b.image?.src"
               [src]="b.image?.src"
               [alt]="getImageAlt(b.image, b.title)"
               class="cover"
               loading="lazy" />
          <h3 class="title">{{ getLocalizedText(b.title) }}</h3>
          <p class="muted">{{ getLocalizedText(b.excerpt) }}</p>
          <a class="link" [routerLink]="['/blog', b.slug]">{{ getLocalizedText({ zh: '阅读全文 →', en: 'Read More →' }) }}</a>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .wrap{ max-width:1000px; margin:0 auto; padding:0 16px; }
    h2{ margin:0 0 12px; }
    .grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
    .card{ border:1px solid var(--border); border-radius:12px; background:var(--bg); padding:12px; transition:transform .15s ease, box-shadow .15s ease; }
    .card:hover{ transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.06); }
    .cover{ width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin-bottom:8px; }
    .title{ margin:0 0 6px; font-size:16px; line-height:1.4; }
    .muted{ color:var(--muted); margin:0 0 8px; }
    .link{ font-weight:600; text-decoration:none; border-bottom:1px dashed transparent; }
    .link:hover{ border-bottom-color:var(--brand); }
  `]
})
export class BlogPreviewComponent {
  @Input() inputs!: BlogPreviewInputs;

  constructor(private i18nService: I18nService) {}

  getLocalizedText(text: string | { zh: string; en: string } | undefined): string {
    if (!text) return '';
    return this.i18nService.getLocalizedContent(text);
  }

  getImageAlt(image: { src: string; alt?: string | { zh: string; en: string } } | undefined, title: string | { zh: string; en: string }): string {
    if (!image || !image.alt) return this.getLocalizedText(title);
    return this.getLocalizedText(image.alt);
  }
}
