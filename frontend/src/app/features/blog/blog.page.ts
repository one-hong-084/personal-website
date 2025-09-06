import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ArticleService, Item } from '../../shared/services/article.service';
import { LanguageService } from '../../shared/services/language.service';
import { CardComponent } from '../../shared/components/card/card.component';

type YearGroup = { year: string; items: Item[] };

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPage {
  groups$!: Observable<YearGroup[]>;

  constructor(private svc: ArticleService, public lang: LanguageService) {
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
}
