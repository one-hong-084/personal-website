import { Type } from '@angular/core';
import { CardListSectionComponent } from '../../shared/sections/card-list.section';

export const BLOG_SECTION_REGISTRY: Record<string, Type<any>> = {
  'card-list': CardListSectionComponent
};
