import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-timeline-preview',
  imports: [NgFor],
  template: `
    <section class="container section">
      <h3>最近动态</h3>
      <ul style="margin:0;padding-left:18px;">
        <li *ngFor="let item of items">{{ item }}</li>
      </ul>
    </section>
  `
})
export class TimelinePreviewSectionComponent {
  @Input() items: string[] = [];
}


