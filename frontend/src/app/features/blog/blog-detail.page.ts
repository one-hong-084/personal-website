import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Blog {
  id?: string;
  title: string;
  excerpt: string;
  slug: string;
  content?: string; // 可选：若提供则展示正文
  image?: { src: string; alt?: string };
  updatedAt?: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wrap" *ngIf="post() as p; else loading">
      <h1 class="title">{{ p.title }}</h1>
      <p class="muted">{{ (p.updatedAt || '1970-01-01T00:00:00Z') | date:'yyyy-MM-dd' }}</p>
      <img *ngIf="p.image?.src" class="cover" [src]="p.image?.src" [alt]="p.image?.alt || p.title" loading="lazy" />
      <article class="content" [innerHTML]="p.content || '<p>' + p.excerpt + '</p>'"></article>
    </section>
    <ng-template #loading>
      <section class="wrap"><p class="muted">Loading…</p></section>
    </ng-template>
  `,
  styles: [`
    .wrap{ max-width:920px; margin:32px auto; padding:0 16px; }
    .title{ margin:0 0 8px; }
    .muted{ color:var(--muted); margin:0 0 12px; }
    .cover{ width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:8px; margin:8px 0 16px; }
    .content :where(p,h2,h3,ul,ol,pre,code,blockquote){ margin:12px 0; }
  `]
})
export class BlogDetailPage {
  post = signal<Blog | null>(null);

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.http.get<{items: Blog[]}>('assets/content/blog.json')
      .subscribe(res => {
        const found = (res.items || []).find(b => b.slug === slug) || null;
        this.post.set(found);
      });
  }
}
