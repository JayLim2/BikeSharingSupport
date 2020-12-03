import { TestBed } from '@angular/core/testing';

import { HealthCheckerService } from './health-checker.service';

describe('HealthCheckerService', () => {
  let service: HealthCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
