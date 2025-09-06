import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-skills',
  imports: [NgFor],
  template: `
    <section class="container section">
      <h3>技能标签</h3>
      <div>
        <span class="tag" *ngFor="let t of tags">{{ t }}</span>
      </div>
    </section>
  `
})
export class SkillsSectionComponent {
  @Input() tags: string[] = [];
}


