import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, combineLatest } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { TimelineService } from '../../shared/services/timeline.service';
import { TimelineItem } from '../../shared/models/timeline.model';
import { ClickTrackingService } from '../../shared/services/click-tracking.service';

import { HeroComponent } from '../../shared/hero.component';
import { CardComponent } from '../../shared/components/card/card.component';

interface Project {
  id: string;
  title: string | { zh: string; en: string };
  summary: string | { zh: string; en: string };
  tags: string[];
  link?: string;
  image?: string;               // 项目数据使用字符串格式
  updatedAt: string;            // 用于首页精选排序（最新三条）
}

interface Blog {
  id: string;
  title: string | { zh: string; en: string };
  excerpt: string | { zh: string; en: string };
  slug: string;
  image?: { src: string; alt: { zh: string; en: string } };
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

  projects$: Observable<Project[]>;
  blogs$: Observable<Blog[]>;
  timelineLatest$: Observable<TimelineItem[]>;

  constructor(
    private http: HttpClient, 
    public lang: LanguageService, 
    private timeline: TimelineService,
    private clickTracker: ClickTrackingService
  ) {
    // Projects：优先显示点击次数前三，否则显示最新三个
    this.projects$ = combineLatest([
      this.http.get<{ items: Project[] }>('assets/content/projects.json'),
      this.clickTracker.clickStats$
    ]).pipe(
      map(([res, clickStats]) => {
        const allProjects = res.items ?? [];
        
        // 获取点击次数排名前三的项目ID
        const topClickedIds = this.clickTracker.getTopClickedProjects(
          allProjects.map(p => p.id)
        );
        
        // 如果有点击记录，优先显示点击次数前三的项目
        if (topClickedIds.some(id => clickStats[id] > 0)) {
          const topClickedProjects = topClickedIds
            .map(id => allProjects.find(p => p.id === id))
            .filter((project): project is Project => project !== undefined);
          
          // 如果点击前三不足3个，用最新的项目补充
          if (topClickedProjects.length < 3) {
            const remainingProjects = allProjects
              .filter(p => !topClickedIds.includes(p.id))
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            
            return [...topClickedProjects, ...remainingProjects].slice(0, 3);
          }
          
          return topClickedProjects;
        }
        
        // 没有点击记录时，显示最新的三个项目
        return allProjects
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 3);
      })
    );

    // Blog：优先显示点击次数前三，否则显示最新三个
    this.blogs$ = combineLatest([
      this.http.get<{ items: Blog[] }>('assets/content/blog.json'),
      this.clickTracker.clickStats$
    ]).pipe(
      map(([res, clickStats]) => {
        const allBlogs = res.items ?? [];
        
        // 获取点击次数排名前三的博客ID
        const topClickedIds = this.clickTracker.getTopClickedProjects(
          allBlogs.map(b => b.id)
        );
        
        // 如果有点击记录，优先显示点击次数前三的博客
        if (topClickedIds.some(id => clickStats[id] > 0)) {
          const topClickedBlogs = topClickedIds
            .map(id => allBlogs.find(b => b.id === id))
            .filter((blog): blog is Blog => blog !== undefined);
          
          // 如果点击前三不足3个，用最新的博客补充
          if (topClickedBlogs.length < 3) {
            const remainingBlogs = allBlogs
              .filter(b => !topClickedIds.includes(b.id))
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            
            return [...topClickedBlogs, ...remainingBlogs].slice(0, 3);
          }
          
          return topClickedBlogs;
        }
        
        // 没有点击记录时，显示最新的三个博客
        return allBlogs
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 3);
      })
    );

    // Timeline：优先显示点击次数前三，否则显示最新三个
    this.timelineLatest$ = combineLatest([
      this.timeline.list(),
      this.clickTracker.clickStats$
    ]).pipe(
      map(([timelineItems, clickStats]) => {
        const allTimelineItems = timelineItems ?? [];
        
        // 获取点击次数排名前三的时间线ID
        const topClickedIds = this.clickTracker.getTopClickedProjects(
          allTimelineItems.map(t => t.id)
        );
        
        // 如果有点击记录，优先显示点击次数前三的时间线
        if (topClickedIds.some(id => clickStats[id] > 0)) {
          const topClickedTimeline = topClickedIds
            .map(id => allTimelineItems.find(t => t.id === id))
            .filter((item): item is TimelineItem => item !== undefined);
          
          // 如果点击前三不足3个，用最新的时间线补充
          if (topClickedTimeline.length < 3) {
            const remainingTimeline = allTimelineItems
              .filter(t => !topClickedIds.includes(t.id))
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            return [...topClickedTimeline, ...remainingTimeline].slice(0, 3);
          }
          
          return topClickedTimeline;
        }
        
        // 没有点击记录时，显示最新的三个时间线
        return allTimelineItems
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
      })
    );
  }


  trackById = (_: number, item: any) => item.id || item.slug || item.title;

  /**
   * 处理项目点击事件
   */
  onProjectClick(projectId: string): void {
    this.clickTracker.trackProjectClick(projectId);
  }

  /**
   * 处理博客点击事件
   */
  onBlogClick(blogId: string): void {
    this.clickTracker.trackBlogClick(blogId);
  }

  /**
   * 处理时间线点击事件
   */
  onTimelineClick(timelineId: string): void {
    this.clickTracker.trackTimelineClick(timelineId);
  }
}
