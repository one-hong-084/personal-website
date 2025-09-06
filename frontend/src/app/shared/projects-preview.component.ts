import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from './i18n.service';

interface Project {
  title: string | { zh: string; en: string };
  summary: string | { zh: string; en: string };
  tags: string[];
  link?: string;
  image?: { src: string; alt?: string | { zh: string; en: string } };
}

interface ProjectsPreviewInputs {
  title: string | { zh: string; en: string };
  items: Project[];
}

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wrap">
      <h2>{{ getLocalizedText(inputs.title) }}</h2>
      <div class="grid">
        <article class="card" *ngFor="let p of inputs.items">
          <img *ngIf="p.image?.src"
               [src]="p.image?.src"
               [alt]="getImageAlt(p.image, p.title)"
               class="cover"
               loading="lazy" />
          <h3>{{ getLocalizedText(p.title) }}</h3>
          <p class="muted">{{ getLocalizedText(p.summary) }}</p>
          <div class="tags">
            <span class="tag" *ngFor="let t of p.tags">{{ t }}</span>
          </div>
          <a *ngIf="p.link" [href]="p.link" target="_blank" rel="noreferrer">{{ getLocalizedText({ zh: '了解更多 →', en: 'Learn More →' }) }}</a>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .wrap{ max-width:920px; margin:32px auto; padding:0 16px; }
    h2{ margin:0 0 12px; }
    .grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
    .card{ border:1px solid var(--border); border-radius:12px; background:var(--bg); padding:12px; transition:transform .15s ease, box-shadow .15s ease; }
    .card:hover{ transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.06); }
    .cover{ width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin-bottom:8px; }
    .muted{ color:var(--muted); }
    .tags{ display:flex; gap:8px; flex-wrap:wrap; margin:8px 0 4px; }
    .tag{ font-size:12px; padding:4px 8px; border:1px solid var(--border); border-radius:999px; }
  `]
})
export class ProjectsPreviewComponent {
  @Input() inputs!: ProjectsPreviewInputs;

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
