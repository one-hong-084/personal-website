import { Type } from '@angular/core';
import { CardListSectionComponent } from '../../shared/sections/card-list.section';

export const PROJECTS_SECTION_REGISTRY: Record<string, Type<any>> = {
  'card-list': CardListSectionComponent
};
