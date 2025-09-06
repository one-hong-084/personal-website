import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

type ImageMeta = { src: string; alt?: string };
type Post = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  readingMinutes?: number;
  image?: ImageMeta;
};
interface BlogResp { items: Post[] }

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.css']
})
export class BlogPage {
  items: Post[] = [];
  constructor(private http: HttpClient) {
    this.http.get<BlogResp>('assets/content/blog.json')
      .subscribe(res => this.items = res?.items ?? []);
  }
}
