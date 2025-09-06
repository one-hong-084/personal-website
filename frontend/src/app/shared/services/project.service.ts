import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Item } from './article.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly url = 'assets/data/projects.json';
  constructor(private http: HttpClient) {}
  list(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url).pipe(
      map(items => [...items].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    );
  }
}
