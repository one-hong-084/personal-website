import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { TimelineService } from '../../shared/services/timeline.service';
import { TimelineItem } from '../../shared/models/timeline.model';

import { HeroComponent } from '../../shared/hero.component';
import { ProjectsPreviewComponent } from '../../shared/projects-preview.component';
import { BlogPreviewComponent } from '../../shared/blog-preview.component';
import { CardComponent } from '../../shared/components/card/card.component';

interface Project {
  title: string | { zh: string; en: string };
  summary: string | { zh: string; en: string };
  tags: string[];
  link?: string;
  image?: { src: string; alt?: string | { zh: string; en: string } };
  updatedAt: string;            // 用于首页精选排序（最新三条）
}

interface Blog {
  id: string;
  title: string | { zh: string; en: string };
  excerpt: string | { zh: string; en: string };
  slug: string;
  image?: { src: string; alt?: string | { zh: string; en: string } };
  updatedAt: string;            // 用于首页精选排序（最新三条）
}

interface TLItem {
  date: string;                 // ISO 时间，用于排序（最新三条）
  title: string | { zh: string; en: string };
  description?: string | { zh: string; en: string };
  link?: string;
  image?: { src: string; alt?: string | { zh: string; en: string } };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    ProjectsPreviewComponent,
    BlogPreviewComponent,
    CardComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  // 🔹 Hero 文案
  hero = {
    headline: {
      zh: '批判性的探索者，创造性的执行者',
      en: 'A Critical Explorer, A Creative Executor'
    },
    subheadline: {
      zh: '把想象力与逻辑结合，把创意转化为真实价值。',
      en: 'Merging imagination with logic to turn ideas into real impact.'
    }
  };

  projects: Project[] = [];
  blogs: Blog[] = [];
  timelineLatest$!: Observable<TimelineItem[]>;

  constructor(private http: HttpClient, public lang: LanguageService, private timeline: TimelineService) {
    // Projects：按 updatedAt 降序取前 3
    this.http.get<{ sections: [{ inputs: { items: Project[] } }] }>('assets/content/projects.json')
      .subscribe(res => {
        const items = res.sections?.[0]?.inputs?.items ?? [];
        this.projects = items
          .sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime())
          .slice(0, 3);
      });

    // Blog：按 updatedAt 降序取前 3
    this.http.get<{ sections: [{ inputs: { items: Blog[] } }] }>('assets/content/blog.json')
      .subscribe(res => {
        const items = res.sections?.[0]?.inputs?.items ?? [];
        this.blogs = items
          .sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime())
          .slice(0, 3);
      });

    // Timeline：使用新的TimelineService
    this.timelineLatest$ = this.timeline.latest(3);
  }


  trackById = (_: number, item: TimelineItem) => item.id;
}
