import { Component, Input } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-skills',
  template: `
    <section style="display:flex;gap:8px;flex-wrap:wrap;">
      <span *ngFor="let t of tags"
            style="padding:4px 10px;border:1px solid #e5e7eb;border-radius:999px;">
        {{t}}
      </span>
    </section>
  `
})
export class SkillsSection {
  @Input() tags: string[] = [];
}

