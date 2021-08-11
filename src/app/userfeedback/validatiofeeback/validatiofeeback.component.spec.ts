import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatiofeebackComponent } from './validatiofeeback.component';

describe('ValidatiofeebackComponent', () => {
  let component: ValidatiofeebackComponent;
  let fixture: ComponentFixture<ValidatiofeebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatiofeebackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatiofeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
