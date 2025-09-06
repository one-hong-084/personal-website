import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Lang = 'zh' | 'en';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() lang: Lang = 'zh';
  @Input() title!: { zh: string; en: string };
  @Input() summary!: { zh: string; en: string };
  @Input() image?: string;
  @Input() date?: string;               // YYYY-MM-DD
  @Input() tags?: string[];
  @Input() link?: string;               // routerLink 或外链
}
