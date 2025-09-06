import { Component, inject, Type } from '@angular/core';
import { NgFor, NgIf, NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ABOUT_SECTION_REGISTRY } from './about.registry';

/** 动态 Section 的配置类型 */
type SectionConfig = {
  component: Type<any>;
  inputs?: Record<string, unknown>;
};

/** about.json 的数据结构 */
type AboutJson = {
  sections: Array<{ type: string; inputs?: Record<string, unknown> }>;
};

@Component({
  standalone: true,
  selector: 'app-about-page',
  imports: [NgFor, NgIf, NgComponentOutlet],
  template: `
    <ng-container *ngFor="let s of sections">
      <ng-container *ngComponentOutlet="s.component; inputs: s.inputs"></ng-container>
    </ng-container>

    <p *ngIf="sections.length === 0" class="container section muted">
      （暂无可渲染的模块或仍在加载中）
    </p>
  `
})
export class AboutPage {
  private http = inject(HttpClient);
  sections: SectionConfig[] = [];

  constructor() {
    this.http.get<AboutJson>('assets/content/about.json').subscribe({
      next: (data) => {
        const source = data?.sections ?? [];
        this.sections = source.reduce((acc, { type, inputs }) => {
          const component = ABOUT_SECTION_REGISTRY[type];
          if (component) acc.push({ component, inputs });
          return acc;
        }, [] as SectionConfig[]);
      },
      error: () => {
        this.sections = [];
      }
    });
  }
}
