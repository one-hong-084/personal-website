import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Item } from './article.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly url = 'assets/content/projects.json';
  constructor(private http: HttpClient) {}
  list(): Observable<Item[]> {
    return this.http.get<{items: Item[]}>(this.url).pipe(
      map(response => {
        const items = response.items || [];
        return [...items].sort((a,b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
      })
    );
  }
}
