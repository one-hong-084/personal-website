import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Item {
  id: string; 
  date: string;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  image?: string; 
  tags?: string[]; 
  link?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly url = 'assets/data/articles.json';
  constructor(private http: HttpClient) {}
  list(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url).pipe(
      map(items => [...items].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    );
  }
}
