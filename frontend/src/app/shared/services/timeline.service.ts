import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TimelineItem } from '../models/timeline.model';

@Injectable({ providedIn: 'root' })
export class TimelineService {
  private readonly url = 'assets/content/timeline.json';

  constructor(private http: HttpClient) {}

  list(): Observable<TimelineItem[]> {
    return this.http.get<{items: TimelineItem[]}>(this.url).pipe(
      map(response => {
        return response.items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
    );
  }

  latest(n = 3): Observable<TimelineItem[]> {
    return this.list().pipe(map(items => items.slice(0, n)));
  }
}
