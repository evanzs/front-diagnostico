import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultApexComponent } from './result-apex.component';

describe('ResultApexComponent', () => {
  let component: ResultApexComponent;
  let fixture: ComponentFixture<ResultApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultApexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
