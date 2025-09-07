import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProjectService } from '../../shared/services/project.service';
import { LanguageService } from '../../shared/services/language.service';
import { ClickTrackingService } from '../../shared/services/click-tracking.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { Item } from '../../shared/services/article.service';

type YearGroup = { year: string; items: Item[] };

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPage {
  groups$!: Observable<YearGroup[]>;

  constructor(
    private svc: ProjectService, 
    public lang: LanguageService,
    private clickTracker: ClickTrackingService
  ) {
    this.groups$ = this.svc.list().pipe(
      map(items => {
        const mapByYear = new Map<string, Item[]>();
        items.forEach(it => {
          const y = (it.date || '').slice(0,4);
          if (!mapByYear.has(y)) mapByYear.set(y, []);
          mapByYear.get(y)!.push(it);
        });
        return Array.from(mapByYear.entries())
          .sort((a,b) => Number(b[0]) - Number(a[0]))
          .map(([year, arr]) => ({ year, items: arr }));
      })
    );
  }

  trackById = (_: number, item: Item) => item.id;

  /**
   * 处理项目点击事件
   */
  onProjectClick(projectId: string): void {
    this.clickTracker.trackClick(projectId);
  }
}
