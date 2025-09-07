import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from './services/language.service';
import { AsyncPipe } from '@angular/common';

interface HeroInputs {
  headline: { zh: string; en: string };
  subheadline: { zh: string; en: string };
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() inputs!: HeroInputs;

  constructor(public lang: LanguageService) {}

  getLocalizedText(text: { zh: string; en: string }): string {
    return this.lang.value === 'zh' ? text.zh : text.en;
  }
}
