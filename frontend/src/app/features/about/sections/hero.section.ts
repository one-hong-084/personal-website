import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hero',
  template: `
    <header class="container section">
      <span class="brand" style="font-weight:600;letter-spacing:.4px;">个人主页</span>
      <h1>{{ data?.title }}</h1>
      <p class="muted">{{ data?.subtitle }}</p>
    </header>
  `
})
export class HeroSectionComponent {
  @Input() data?: { title: string; subtitle?: string };
}


