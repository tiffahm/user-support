import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatefeedbackComponent } from './privatefeedback.component';

describe('PrivatefeedbackComponent', () => {
  let component: PrivatefeedbackComponent;
  let fixture: ComponentFixture<PrivatefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatefeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
