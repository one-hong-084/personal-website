import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from './i18n.service';

interface HeroInputs {
  headline: { zh: string; en: string };
  subheadline: { zh: string; en: string };
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() inputs!: HeroInputs;

  constructor(private i18nService: I18nService) {}

  getLocalizedText(text: { zh: string; en: string }): string {
    return this.i18nService.getLocalizedContent(text);
  }
}
