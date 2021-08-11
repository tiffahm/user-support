import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemfeedbackComponent } from './systemfeedback.component';

describe('SystemfeedbackComponent', () => {
  let component: SystemfeedbackComponent;
  let fixture: ComponentFixture<SystemfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
