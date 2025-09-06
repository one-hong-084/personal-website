import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { I18nService } from './i18n.service';

interface TLItem {
  date: string; // ISO
  title: string | { zh: string; en: string };
  description?: string | { zh: string; en: string };
  category?: 'project' | 'design' | 'frontend' | 'life' | string;
  link?: string;
  image?: { src: string; alt?: string | { zh: string; en: string } };
}

interface TLInputs {
  title: string | { zh: string; en: string };
  items: TLItem[];
}

@Component({
  selector: 'app-timeline-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wrap">
      <h2>{{ getLocalizedText(inputs.title) }}</h2>
      <div class="grid" *ngIf="inputs.items?.length; else empty">
        <article class="card" *ngFor="let it of inputs.items">
          <img *ngIf="it.image?.src" 
               [src]="it.image?.src" 
               [alt]="getImageAlt(it.image, it.title)" 
               class="cover" 
               loading="lazy" />
          <time class="date">{{ it.date | date:'yyyy-MM-dd' }}</time>
          <h3 class="title">
            <a *ngIf="it.link; else plain" [href]="it.link" rel="noreferrer" target="_blank">{{ getLocalizedText(it.title) }}</a>
            <ng-template #plain>{{ getLocalizedText(it.title) }}</ng-template>
          </h3>
          <p class="desc" *ngIf="it.description">{{ getLocalizedText(it.description) }}</p>
        </article>
      </div>
      <ng-template #empty>
        <p class="muted">{{ getLocalizedText({ zh: '暂无动态', en: 'No updates yet' }) }}</p>
      </ng-template>
    </section>
  `,
  styles: [`
    .wrap{ max-width:920px; margin:32px auto; padding:0 16px; }
    h2{ margin:0 0 12px; }
    .grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
    .card{ border:1px solid var(--border); border-radius:12px; background:var(--bg); padding:12px; transition:transform .15s ease, box-shadow .15s ease; }
    .card:hover{ transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.06); }
    .cover{ width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin-bottom:8px; }
    .date{ font-size:12px; color:var(--muted); margin:0 0 6px; }
    .title{ margin:0 0 6px; font-size:16px; line-height:1.4; }
    .title a{ color:inherit; text-decoration:none; border-bottom:1px dashed transparent; }
    .title a:hover{ border-bottom-color:var(--brand); }
    .desc{ margin:0; color:var(--fg); }
  `]
})
export class TimelinePreviewComponent {
  @Input() inputs!: TLInputs;

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
