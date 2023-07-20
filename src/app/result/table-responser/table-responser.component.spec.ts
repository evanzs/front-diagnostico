import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResponserComponent } from './table-responser.component';

describe('TableResponserComponent', () => {
  let component: TableResponserComponent;
  let fixture: ComponentFixture<TableResponserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableResponserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableResponserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
