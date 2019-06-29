import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeIndexComponent } from './index.component';

describe('QuestionsIndexComponent', () => {
  let component: ExchangeIndexComponent;
  let fixture: ComponentFixture<ExchangeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
