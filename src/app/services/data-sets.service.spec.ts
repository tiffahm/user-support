import { TestBed } from '@angular/core/testing';

import { DataSetsService } from './data-sets.service';

describe('DataSetsService', () => {
  let service: DataSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
