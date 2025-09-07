import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Item {
  id: string; 
  date?: string;
  title: { zh: string; en: string };
  summary?: { zh: string; en: string };
  excerpt?: { zh: string; en: string };
  image?: string | { src: string; alt: { zh: string; en: string } }; 
  tags?: string[]; 
  link?: string;
  updatedAt?: string;
  readingMinutes?: number;
  slug?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly url = 'assets/content/blog.json';
  constructor(private http: HttpClient) {}
  list(): Observable<Item[]> {
    return this.http.get<{items: Item[]}>(this.url).pipe(
      map(response => {
        const items = response.items || [];
        return [...items].sort((a,b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        });
      })
    );
  }
}
