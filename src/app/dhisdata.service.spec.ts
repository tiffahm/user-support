import { TestBed } from '@angular/core/testing';

import { DhisdataService } from './dhisdata.service';

describe('DhisdataService', () => {
  let service: DhisdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DhisdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
