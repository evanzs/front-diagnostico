import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicResponseComponent } from './dynamic-response.component';

describe('DynamicResponseComponent', () => {
  let component: DynamicResponseComponent;
  let fixture: ComponentFixture<DynamicResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
