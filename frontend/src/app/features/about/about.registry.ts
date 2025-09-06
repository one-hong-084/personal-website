import { Type } from '@angular/core';
import { HeroSectionComponent } from './sections/hero.section';
import { SkillsSectionComponent } from './sections/skills.section';
import { TimelinePreviewSectionComponent } from './sections/timeline-preview.section';

/** JSON 里的 type → 实际组件类 */
export const ABOUT_SECTION_REGISTRY: Record<string, Type<any>> = {
  hero: HeroSectionComponent,
  skills: SkillsSectionComponent,
  timeline: TimelinePreviewSectionComponent
};
