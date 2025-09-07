import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { TimelinePage } from './timeline.page';

describe('TimelinePage', () => {
  let component: TimelinePage;
  let fixture: ComponentFixture<TimelinePage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TimelinePage]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelinePage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create and render items', () => {
    // 触发 ngOnInit 内的请求
    fixture.detectChanges();

    // 拦截并返回假数据
    const req = httpMock.expectOne('assets/content/timeline.json');
    expect(req.request.method).toBe('GET');
    req.flush({
      items: [
        { 
          id: 'test-1',
          date: '2025-09-06', 
          title: { zh: 'Home 首页完成', en: 'Home Page Complete' }, 
          summary: { zh: 'Hero + 精选', en: 'Hero + Featured' },
          type: 'product',
          tags: ['Product']
        },
        { 
          id: 'test-2',
          date: '2025-09-05', 
          title: { zh: 'AI Gym Demo 改版', en: 'AI Gym Demo Redesign' },
          summary: { zh: '双杠评分优化', en: 'Parallel bars scoring optimization' },
          type: 'product',
          tags: ['Product']
        }
      ]
    });

    // 变更检测后应有两行
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.row'));
    expect(component).toBeTruthy();
    expect(rows.length).toBe(2);
  });
});

