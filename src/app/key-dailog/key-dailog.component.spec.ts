import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyDailogComponent } from './key-dailog.component';

describe('KeyDailogComponent', () => {
  let component: KeyDailogComponent;
  let fixture: ComponentFixture<KeyDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
