import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritefeedbackComponent } from './writefeedback.component';

describe('WritefeedbackComponent', () => {
  let component: WritefeedbackComponent;
  let fixture: ComponentFixture<WritefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritefeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
