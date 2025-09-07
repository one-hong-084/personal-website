import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { TimelineService } from '../../shared/services/timeline.service';
import { TimelineItem } from '../../shared/models/timeline.model';
import { ClickTrackingService } from '../../shared/services/click-tracking.service';
import { CardComponent } from '../../shared/components/card/card.component';

type YearGroup = { year: string; items: TimelineItem[] };

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelinePage {
  groups$!: Observable<YearGroup[]>;

  constructor(
    private timeline: TimelineService, 
    public lang: LanguageService,
    private clickTracker: ClickTrackingService
  ) {
    this.groups$ = this.timeline.list().pipe(
      map(items => {
        const mapByYear = new Map<string, TimelineItem[]>();
        items.forEach(it => {
          const y = (it.date || '').slice(0,4);
          if (!mapByYear.has(y)) mapByYear.set(y, []);
          mapByYear.get(y)!.push(it);
        });
        // 年份倒序 + 年内保持已排序（Service 已按日期新→旧）
        return Array.from(mapByYear.entries())
          .sort((a,b) => Number(b[0]) - Number(a[0]))
          .map(([year, arr]) => ({ year, items: arr }));
      })
    );
  }

  trackById = (_: number, item: TimelineItem) => item.id;

  /**
   * 处理时间线点击事件
   */
  onTimelineClick(timelineId: string): void {
    this.clickTracker.trackTimelineClick(timelineId);
  }
}
