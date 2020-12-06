import { TestBed } from '@angular/core/testing';

import { TimeUnitsService } from './time-units.service';

describe('TimeUnitsService', () => {
  let service: TimeUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
