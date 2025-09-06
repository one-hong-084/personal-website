import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListSection } from './card-list.section';

describe('CardListSection', () => {
  let component: CardListSection;
  let fixture: ComponentFixture<CardListSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
