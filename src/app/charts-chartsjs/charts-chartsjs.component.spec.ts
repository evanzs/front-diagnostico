import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsChartsjsComponent } from './charts-chartsjs.component';

describe('ChartsChartsjsComponent', () => {
  let component: ChartsChartsjsComponent;
  let fixture: ComponentFixture<ChartsChartsjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsChartsjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsChartsjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
