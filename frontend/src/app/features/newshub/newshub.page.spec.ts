import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewshubPage } from './newshub.page';

describe('NewshubPage', () => {
  let component: NewshubPage;
  let fixture: ComponentFixture<NewshubPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewshubPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewshubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
