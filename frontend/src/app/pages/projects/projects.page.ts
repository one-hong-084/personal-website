import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../shared/i18n.service';

type ImageMeta = { src: string; alt?: string };
type Project = {
  id: string; title: string; summary: string; tags: string[];
  link?: string; image?: ImageMeta;
};
interface ProjectResp { items: Project[] }

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.css']
})
export class ProjectsPage {
  items: Project[] = [];
  constructor(private http: HttpClient, private i18nService: I18nService) {
    this.http.get<ProjectResp>('assets/content/projects.json')
      .subscribe(res => this.items = res?.items ?? []);
  }

  getLocalizedText(text: { zh: string; en: string }): string {
    return this.i18nService.getLocalizedContent(text);
  }
}
