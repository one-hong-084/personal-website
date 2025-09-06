import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TimelineItem } from '../models/timeline.model';

interface TimelineContentItem {
  date: string;
  title: { zh: string; en: string };
  description?: { zh: string; en: string };
  category: string;
  link?: string;
  image?: { src: string; alt?: { zh: string; en: string } };
}

interface TimelineContent {
  items: TimelineContentItem[];
}

@Injectable({ providedIn: 'root' })
export class TimelineService {
  private readonly url = 'assets/content/timeline.json';

  constructor(private http: HttpClient) {}

  list(): Observable<TimelineItem[]> {
    return this.http.get<TimelineContent>(this.url).pipe(
      map(content => {
        const items: TimelineItem[] = content.items.map((item, index) => ({
          id: `timeline-${index + 1}`, // 生成ID
          date: item.date,
          title: item.title,
          summary: item.description || { zh: '', en: '' }, // description 映射到 summary
          image: item.image?.src, // 提取图片URL
          type: this.mapCategoryToType(item.category),
          tags: [item.category], // 使用category作为tag
          link: item.link
        }));
        
        return items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
    );
  }

  latest(n = 3): Observable<TimelineItem[]> {
    return this.list().pipe(map(items => items.slice(0, n)));
  }

  private mapCategoryToType(category: string): 'award'|'product'|'replica'|'skill'|'milestone' {
    switch (category.toLowerCase()) {
      case 'project': return 'product';
      case 'frontend': return 'skill';
      case 'design': return 'skill';
      case 'life': return 'milestone';
      default: return 'milestone';
    }
  }
}
