import { Type } from '@angular/core';
import { HeroSectionComponent } from './sections/hero.section';
import { SkillsSectionComponent } from './sections/skills.section';
import { TimelinePreviewSectionComponent } from './sections/timeline-preview.section';

/** 一个 section = 组件 + 该组件的输入 */
export type SectionConfig = {
  component: Type<any>;
  inputs?: Record<string, unknown>;
};

/** 你只要改这个数组，就能控制 About 页的模块顺序与内容 */
export const ABOUT_SECTIONS: SectionConfig[] = [
  {
    component: HeroSectionComponent,
    inputs: { data: { title: '你好，我是洪显学', subtitle: 'AI 产品经理｜学习与分享' } }
  },
  {
    component: SkillsSectionComponent,
    inputs: { tags: ['Angular','Node.js','MongoDB','Ghost CMS','TypeScript'] }
  },
  {
    component: TimelinePreviewSectionComponent,
    inputs: { items: ['2025-09 站点启动','2025-09 完成前端骨架','2025-09 规划模块化结构'] }
  }
];
