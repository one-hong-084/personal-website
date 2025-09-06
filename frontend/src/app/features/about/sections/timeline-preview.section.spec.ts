import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePreviewSection } from './timeline-preview.section';

describe('TimelinePreviewSection', () => {
  let component: TimelinePreviewSection;
  let fixture: ComponentFixture<TimelinePreviewSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinePreviewSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelinePreviewSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
