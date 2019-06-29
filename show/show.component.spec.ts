import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeShowComponent } from './show.component';

describe('ExchangeShowComponent', () => {
  let component: ExchangeShowComponent;
  let fixture: ComponentFixture<ExchangeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
